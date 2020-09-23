import CommonFunctionsUtil from "../../CommonFunctionsUtil";
import AbstractTab from "./AbstractTab";
import DesignerErrorManager from "../DesignerErrorManager";

import {
    DEFAULT_SCALE_TYPE,
    CUSTOM_SCALE_TYPE,
    MIN_MAX_TYPE,
    EQUAL_TYPE,
    MIN_VALUE_FOR_MINMAX, ERROR_TYPES, ELEMENTS
} from "../../Constants";

export default class AnswerOptionsTab extends AbstractTab {
    constructor({elements, questionTypeHandler, saveChanges}) {
        super({elements});
        this.questionTypeHandler = questionTypeHandler;
        this.saveChanges = saveChanges;

        this.state = {
            hasErrors: false
        };

        this.render();
    }

    setValues = ({values}) => {
        const {elements, questionTypeHandler} = this;
        const {answerOptionsTabWrapper, haveScalesInput} = elements;
        const {haveScales, scaleType, customScales, answersCount} = values;

        this.state.hasErrors = false;

        if (questionTypeHandler.shouldAnswerOptionsTabBeOpened({values})) {
            CommonFunctionsUtil.toggleTab({elements: [answerOptionsTabWrapper]});
        }

        haveScalesInput.checked = haveScales;
        questionTypeHandler.customizeAnswerOptionsTabToTypeOnSettingsReceived({haveScales});

        this.setValuesFromSettingsForDefaultScales({scaleType});
        this.setValuesFromSettingsForCustomScales({haveScales, scaleType, customScales});
        this.setValuesFromSettingsForAnswerCount({answersCount});
    };

    setValuesFromSettingsForDefaultScales = ({scaleType}) => {
        const {activateDefaultScalesInput, defaultScalesInfo} = this.elements;
        activateDefaultScalesInput.checked = scaleType === DEFAULT_SCALE_TYPE;
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [defaultScalesInfo],
            shouldBeShown: scaleType === DEFAULT_SCALE_TYPE
        });
    };

    setValuesFromSettingsForCustomScales = ({haveScales, scaleType, customScales}) => {
        const {activateCustomScalesInput, scalesNumberInput, customScalesWrapper, customScaleListWrapper, customScaleList} = this.elements;
        activateCustomScalesInput.checked = scaleType === CUSTOM_SCALE_TYPE;

        if (haveScales && scaleType === CUSTOM_SCALE_TYPE) {
            scalesNumberInput.value = customScales.length ? customScales.length : undefined;
            CommonFunctionsUtil.createListOfItems({
                defaultValues: customScales,
                listWrapper: customScaleList,
                itemClassName: "custom-scale-item",
                itemClass: ELEMENTS.CUSTOM.CUSTOM_SCALE_ITEM
            });
        }

        const elementsToChangeVisibility = [
            {
                elements: [customScalesWrapper],
                shouldBeShown: haveScales && scaleType === CUSTOM_SCALE_TYPE
            },
            {
                elements: [customScaleListWrapper],
                shouldBeShown: haveScales && scaleType === CUSTOM_SCALE_TYPE && customScales.length > 0
            }
        ];
        elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));
    };

    setValuesFromSettingsForAnswerCount = ({answersCount}) => {
        const {typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput} = this.elements;
        const equalNumberOfAnswersOption = typeForNumberOfAnswersSelector[0];
        const minMaxNumberOfAnswersOption = typeForNumberOfAnswersSelector[1];

        equalNumberOfAnswersOption.selected = answersCount.type === EQUAL_TYPE;
        minMaxNumberOfAnswersOption.selected = answersCount.type !== EQUAL_TYPE;

        const elementsToChangeVisibility = [
            {
                shouldBeShown: answersCount.type === EQUAL_TYPE,
                elements: [CommonFunctionsUtil.getInputWrapper({input: equalToNumberOfAnswersInput})]
            },
            {
                shouldBeShown: answersCount.type === MIN_MAX_TYPE,
                elements: [CommonFunctionsUtil.getInputWrapper({input: minNumberOfAnswersInput}), CommonFunctionsUtil.getInputWrapper({input: maxNumberOfAnswersInput})]
            }
        ];
        elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));

        equalToNumberOfAnswersInput.value = answersCount.equal ? answersCount.equal : undefined;

        maxNumberOfAnswersInput.value = CommonFunctionsUtil.correctValueToMinMaxInInput({
            input: maxNumberOfAnswersInput,
            value: answersCount.max
        });
        minNumberOfAnswersInput.value = CommonFunctionsUtil.correctValueToMinMaxInInput({
            input: minNumberOfAnswersInput,
            value: answersCount.min
        });

        maxNumberOfAnswersInput.min = minNumberOfAnswersInput.value;
        minNumberOfAnswersInput.max = maxNumberOfAnswersInput.value;
    };

    get values() {
        const {equalToNumberOfAnswersInput, maxNumberOfAnswersInput, minNumberOfAnswersInput, haveScalesInput} = this.elements;
        const typeForNumberOfAnswers = this.getTypeForNumberOfAnswers();

        let scaleType;
        let customScales;
        if (haveScalesInput.checked) {
            scaleType = this.getScaleType();
            if (scaleType === CUSTOM_SCALE_TYPE) {
                customScales = [];
                const customScaleItems = document.querySelectorAll(".custom-scale-item");
                customScaleItems.forEach((item, index) => {
                    const color = item.querySelector(".custom-scale-item__color").value;
                    const codeInput = item.querySelector(".custom-scale-item__code");
                    const code = codeInput.value;
                    const label = item.querySelector(".custom-scale-item__label").value;
                    customScales.push({
                        color,
                        code: code ? code : (index + 1),
                        label: label ? label : ""
                    });
                });
            }
        }

        return {
            answersCount: {
                type: typeForNumberOfAnswers,
                equal: typeForNumberOfAnswers === EQUAL_TYPE && equalToNumberOfAnswersInput.value ? equalToNumberOfAnswersInput.value : undefined,
                max: typeForNumberOfAnswers === MIN_MAX_TYPE && maxNumberOfAnswersInput.value ? maxNumberOfAnswersInput.value : undefined,
                min: typeForNumberOfAnswers === MIN_MAX_TYPE && minNumberOfAnswersInput.value ? minNumberOfAnswersInput.value : undefined
            },
            scales: haveScalesInput.checked
                ? {
                    scaleType,
                    customScales
                }
                : undefined
        };
    };

    getTypeForNumberOfAnswers = () => {
        const {typeForNumberOfAnswersSelector} = this.elements;
        return typeForNumberOfAnswersSelector[0].selected ? EQUAL_TYPE : MIN_MAX_TYPE
    };

    getScaleType = () => {
        const {activateCustomScalesInput} = this.elements;
        return activateCustomScalesInput.checked ? CUSTOM_SCALE_TYPE : DEFAULT_SCALE_TYPE;
    };

    raiseErrors = ({areas}) => {
        const {activateCustomScalesInput, equalToNumberOfAnswersInput, maxNumberOfAnswersInput, minNumberOfAnswersInput, scalesNumberInput} = this.elements;
        const typeForNumberOfAnswers = this.getTypeForNumberOfAnswers();

        if (!activateCustomScalesInput.checked) {
            this.state.hasErrors = false;
            return false;
        }

        const customScaleItems = document.querySelectorAll(".custom-scale-item");
        customScaleItems.forEach((item) => {
            const codeInput = item.querySelector(".custom-scale-item__code");
            const code = codeInput.value;
            this.state.hasErrors = DesignerErrorManager.handleInputError({
                element: codeInput,
                errorCondition: !code
            });
        });

        const hasInputErrors = DesignerErrorManager.handleSeveralErrors({
            errors: [
                {
                    type: ERROR_TYPES.INPUT,
                    element: equalToNumberOfAnswersInput,
                    errorCondition: typeForNumberOfAnswers === EQUAL_TYPE && equalToNumberOfAnswersInput.value && equalToNumberOfAnswersInput.value > areas.length
                },
                {
                    type: ERROR_TYPES.INPUT,
                    element: minNumberOfAnswersInput,
                    errorCondition: typeForNumberOfAnswers === MIN_MAX_TYPE && minNumberOfAnswersInput.value && minNumberOfAnswersInput.value > areas.length
                },
                {
                    type: ERROR_TYPES.INPUT,
                    element: maxNumberOfAnswersInput,
                    errorCondition: typeForNumberOfAnswers === MIN_MAX_TYPE && maxNumberOfAnswersInput.value && maxNumberOfAnswersInput.value > areas.length
                },
                {
                    type: ERROR_TYPES.INPUT,
                    element: scalesNumberInput,
                    errorCondition: !scalesNumberInput.value || customScaleItems.length <= 0
                }
            ]
        });
        this.state.hasErrors = this.state.hasErrors || hasInputErrors;

        return this.state.hasErrors;
    };

    render = () => {
        const {
            scaleSettingsWrapper, customScalesWrapper, customScaleListWrapper,
            equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput
        } = this.elements;

        this.setDefaultAttributes({
            elementsToChangeVisibility: [{
                elements: [scaleSettingsWrapper, customScalesWrapper, customScaleListWrapper, CommonFunctionsUtil.getInputWrapper({input: equalToNumberOfAnswersInput})]
            }],
            elementsToSetAttribute: [
                {element: minNumberOfAnswersInput, attribute: {name: "min", MIN_VALUE_FOR_MINMAX}},
                {element: maxNumberOfAnswersInput, attribute: {name: "min", MIN_VALUE_FOR_MINMAX}}
            ]
        });

        this.questionTypeHandler.customizeAnswerOptionsTabToType();

        this.setupScaleElements();
        this.setupMinMaxEqualInputs();
    };

    setupScaleElements = () => {
        const {haveScalesInput, activateDefaultScalesInput, activateCustomScalesInput, scalesNumberInput} = this.elements;

        haveScalesInput.addEventListener("input", this.handleHaveScalesInputCallback);
        activateDefaultScalesInput.addEventListener("input", this.handleActivateDefaultScalesInputCallback);
        activateCustomScalesInput.addEventListener("input", this.handleActivateCustomScalesInputCallback);
        scalesNumberInput.addEventListener("input", this.handleScalesNumberInputCallback);
    };

    handleHaveScalesInputCallback = () => {
        const {haveScalesInput, scaleSettingsWrapper, activateDefaultScalesInput, defaultScalesInfo, activateCustomScalesInput} = this.elements;

        const elementsToChangeVisibility = [
            {elements: [scaleSettingsWrapper], shouldBeShown: haveScalesInput.checked},
            {elements: [defaultScalesInfo], shouldBeShown: activateDefaultScalesInput.checked}
        ];
        elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));

        activateDefaultScalesInput.checked = !activateDefaultScalesInput.checked && !activateCustomScalesInput.checked && haveScalesInput.checked;
    };

    handleActivateDefaultScalesInputCallback = () => {
        const {activateDefaultScalesInput, defaultScalesInfo, activateCustomScalesInput, customScalesWrapper} = this.elements;

        const elementsToChangeVisibility = [
            {elements: [customScalesWrapper]},
            {elements: [defaultScalesInfo], shouldBeShown: true}
        ];
        elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));

        activateDefaultScalesInput.checked = true;
        activateCustomScalesInput.checked = false;
    };

    handleActivateCustomScalesInputCallback = () => {
        const {activateDefaultScalesInput, defaultScalesInfo, activateCustomScalesInput, customScalesWrapper} = this.elements;

        const elementsToChangeVisibility = [
            {elements: [defaultScalesInfo]},
            {elements: [customScalesWrapper], shouldBeShown: true}
        ];
        elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));

        activateDefaultScalesInput.checked = false;
        activateCustomScalesInput.checked = true;
    };

    handleScalesNumberInputCallback = () => {
        const {customScaleListWrapper, customScaleList, scalesNumberInput} = this.elements;
        const scalesNumberInputValue = parseInt(scalesNumberInput.value);

        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [customScaleListWrapper],
            shouldBeShown: scalesNumberInputValue
        });

        CommonFunctionsUtil.createListOfItems({
            itemsExpectedCount: scalesNumberInputValue,
            listWrapper: customScaleList,
            itemClassName: "custom-scale-item",
            itemClass: ELEMENTS.CUSTOM.CUSTOM_SCALE_ITEM
        });
    };

    setupMinMaxEqualInputs = () => {
        const {typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput} = this.elements;
        typeForNumberOfAnswersSelector.addEventListener("change", (e) => {
            const selector = e.target;
            const elementsToChangeVisibility = [
                {
                    elements: [CommonFunctionsUtil.getInputWrapper({input: equalToNumberOfAnswersInput})],
                    shouldBeShown: selector[0].selected
                },
                {
                    elements: [CommonFunctionsUtil.getInputWrapper({input: minNumberOfAnswersInput}), CommonFunctionsUtil.getInputWrapper({input: maxNumberOfAnswersInput})],
                    shouldBeShown: selector[1].selected
                }
            ];
            elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));

            this.saveChanges();
        });

        minNumberOfAnswersInput.addEventListener("input", (e) => {
            const minValue = CommonFunctionsUtil.removeMathSignsFromPositiveIntCallback(e);
            maxNumberOfAnswersInput.setAttribute("min", minValue);
        });
        maxNumberOfAnswersInput.addEventListener("input", (e) => {
            const maxValue = CommonFunctionsUtil.removeMathSignsFromPositiveIntCallback(e);
            minNumberOfAnswersInput.setAttribute("max", maxValue);
        });
        equalToNumberOfAnswersInput.addEventListener("input", CommonFunctionsUtil.removeMathSignsFromPositiveIntCallback);
    };
}
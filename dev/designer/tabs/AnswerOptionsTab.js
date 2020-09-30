import CommonFunctionsUtil from "../../CommonFunctionsUtil";
import AbstractTab from "./AbstractTab";
import DesignerErrorManager from "../DesignerErrorManager";

import {
    DEFAULT_SCALE_TYPE,
    CUSTOM_SCALE_TYPE,
    MIN_MAX_TYPE,
    EQUAL_TYPE,
    MIN_VALUE_FOR_MINMAX,
    ERROR_TYPES,
    ELEMENTS,
    DEFAULT_SCALES
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
        const {elements, questionTypeHandler, questionScales} = this;
        const {answerOptionsTabWrapper, haveScalesInput} = elements;
        const {haveScales, scaleType, scales, answersCount} = values;

        this.state.hasErrors = false;

        if (questionTypeHandler.shouldAnswerOptionsTabBeOpened({values, questionScales})) {
            CommonFunctionsUtil.toggleTab({elements: [answerOptionsTabWrapper]});
        }

        haveScalesInput.checked = haveScales;
        questionTypeHandler.customizeAnswerOptionsTabToTypeOnSettingsReceived({haveScales});

        this.setValuesFromSettingsForDefaultScales({scaleType});
        this.setValuesFromSettingsForCustomScales({haveScales, scaleType, scales});
        this.setValuesFromSettingsForNumberOfAnswers({answersCount});
    };

    setValuesFromSettingsForDefaultScales = ({scaleType}) => {
        const {activateDefaultScalesInput, defaultScalesInfo} = this.elements;
        activateDefaultScalesInput.checked = scaleType === DEFAULT_SCALE_TYPE;
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [defaultScalesInfo],
            shouldBeShown: scaleType === DEFAULT_SCALE_TYPE
        });
    };

    setValuesFromSettingsForCustomScales = ({haveScales, scaleType, scales}) => {
        const {activateDefaultScalesInput, activateCustomScalesInput, customScalesWrapper, customScaleListWrapper, customScaleList} = this.elements;
        activateCustomScalesInput.checked = scaleType === CUSTOM_SCALE_TYPE;

        if (haveScales && scaleType === CUSTOM_SCALE_TYPE) {
            const newScales = CommonFunctionsUtil.updateScales({newScales: this.questionScales, oldScales: scales, isDefault: activateDefaultScalesInput.checked})
            this.questionScales = newScales;

            CommonFunctionsUtil.createListOfItems({
                defaultValues: newScales,
                listWrapper: customScaleList,
                itemClassName: "custom-scale-item",
                itemClass: ELEMENTS.CUSTOM.CUSTOM_SCALE_ITEM
            });

            // check for translation's change
            const customScaleItems = Array.prototype.slice.call(customScaleListWrapper.querySelectorAll(".custom-scale-item"));
            customScaleItems.forEach((item) => {
                const code = item.querySelector(".custom-scale-item__code").innerText;
                const textItem = item.querySelector(".custom-scale-item__label");
                const scale = newScales.find((scale) => scale.code.toString() === code.toString());
                textItem.innerText = scale.text;
            });
        }

        const elementsToChangeVisibility = [
            {
                elements: [customScalesWrapper],
                shouldBeShown: haveScales && scaleType === CUSTOM_SCALE_TYPE
            },
            {
                elements: [customScaleListWrapper],
                shouldBeShown: haveScales && scaleType === CUSTOM_SCALE_TYPE && scales.length > 0
            }
        ];
        elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));
    };

    setValuesFromSettingsForNumberOfAnswers = ({answersCount}) => {
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

        equalToNumberOfAnswersInput.value = answersCount.equal ? answersCount.equal : "";

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
        let scales;
        if (haveScalesInput.checked) {
            scaleType = this.getScaleType();
            if (scaleType === CUSTOM_SCALE_TYPE) {
                scales = [];
                const customScaleItems = Array.prototype.slice.call(document.querySelectorAll(".custom-scale-item"));
                customScaleItems.forEach((item, index) => {
                    const color = item.querySelector(".custom-scale-item__color").value;
                    const codeInput = item.querySelector(".custom-scale-item__code");
                    const code = codeInput.value;
                    const text = item.querySelector(".custom-scale-item__label").value;
                    scales.push({
                        color,
                        code: code ? code : (index + 1),
                        text: text ? text : ""
                    });
                });
            } else {
                scales = DEFAULT_SCALES.map((scale, index) => ({...scale, code: this.questionScales[index] ? this.questionScales[index].code : scale.code}));
            }
        }

        return {
            answersCount: {
                type: typeForNumberOfAnswers,
                equal: typeForNumberOfAnswers === EQUAL_TYPE && !!equalToNumberOfAnswersInput.value ? equalToNumberOfAnswersInput.value : "",
                max: typeForNumberOfAnswers === MIN_MAX_TYPE && !!maxNumberOfAnswersInput.value ? maxNumberOfAnswersInput.value : "",
                min: typeForNumberOfAnswers === MIN_MAX_TYPE && !!minNumberOfAnswersInput.value ? minNumberOfAnswersInput.value : ""
            },
            scaleOptions: haveScalesInput.checked
                ? {
                    scaleType,
                    scales
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
        this.state.hasErrors = this.state.hasErrors || this.raiseErrorsForScales({scaleType: DEFAULT_SCALE_TYPE});
        this.state.hasErrors = this.state.hasErrors || this.raiseErrorsForNumberOfAnswers({areas});

        return this.state.hasErrors;
    };

    raiseErrorsForScales = ({scaleType}) => {
        const {activateDefaultScalesInput, activateCustomScalesInput} = this.elements;
        const customScaleItems = Array.prototype.slice.call(document.querySelectorAll(".custom-scale-item"));

        const input = scaleType === DEFAULT_SCALE_TYPE ? activateDefaultScalesInput : activateCustomScalesInput;
        const expectedScalesCount = scaleType === DEFAULT_SCALE_TYPE ? DEFAULT_SCALES.length : customScaleItems.length;

        return DesignerErrorManager.handleInputError({
            element: input,
            errorCondition: input.checked && (!this.questionScales || this.questionScales.length !== expectedScalesCount)
        });
    };

    raiseErrorsForNumberOfAnswers = ({areas}) => {
        const {equalToNumberOfAnswersInput, maxNumberOfAnswersInput, minNumberOfAnswersInput} = this.elements;
        const typeForNumberOfAnswers = this.getTypeForNumberOfAnswers();

        return DesignerErrorManager.handleSeveralErrors({
            errors: [
                {
                    type: ERROR_TYPES.INPUT,
                    element: equalToNumberOfAnswersInput,
                    errorCondition: typeForNumberOfAnswers === EQUAL_TYPE && !!equalToNumberOfAnswersInput.value && areas && areas.length > 0 && equalToNumberOfAnswersInput.value > areas.length
                },
                {
                    type: ERROR_TYPES.INPUT,
                    element: minNumberOfAnswersInput,
                    errorCondition: typeForNumberOfAnswers === MIN_MAX_TYPE && !!minNumberOfAnswersInput.value && areas && areas.length > 0 && minNumberOfAnswersInput.value > areas.length
                },
                {
                    type: ERROR_TYPES.INPUT,
                    element: maxNumberOfAnswersInput,
                    errorCondition: typeForNumberOfAnswers === MIN_MAX_TYPE && !!maxNumberOfAnswersInput.value && areas && areas.length > 0 && maxNumberOfAnswersInput.value > areas.length
                }
            ]
        });
    };

    render = () => {
        const {
            scaleSettingsWrapper, customScalesWrapper, equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput
        } = this.elements;

        this.setDefaultAttributes({
            elementsToChangeVisibility: [{
                elements: [scaleSettingsWrapper, customScalesWrapper, CommonFunctionsUtil.getInputWrapper({input: equalToNumberOfAnswersInput})]
            }],
            elementsToSetAttribute: [
                {element: minNumberOfAnswersInput, attribute: {name: "min", value: MIN_VALUE_FOR_MINMAX}},
                {element: maxNumberOfAnswersInput, attribute: {name: "min", value: MIN_VALUE_FOR_MINMAX}}
            ]
        });

        this.questionTypeHandler.customizeAnswerOptionsTabToType();

        this.setupScaleElements();
        this.setupMinMaxEqualInputs();
    };

    setupScaleElements = () => {
        const {haveScalesInput, activateDefaultScalesInput, activateCustomScalesInput} = this.elements;

        haveScalesInput.addEventListener("input", this.handleHaveScalesInputCallback);
        activateDefaultScalesInput.addEventListener("change", this.handleActivateDefaultScalesInputCallback);
        activateCustomScalesInput.addEventListener("change", this.handleActivateCustomScalesInputCallback);
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

        this.saveChanges();
    };

    handleActivateCustomScalesInputCallback = () => {
        const {activateDefaultScalesInput, defaultScalesInfo, activateCustomScalesInput, customScalesWrapper, customScaleList} = this.elements;

        const elementsToChangeVisibility = [
            {elements: [defaultScalesInfo]},
            {elements: [customScalesWrapper], shouldBeShown: true}
        ];
        elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));

        activateDefaultScalesInput.checked = false;
        activateCustomScalesInput.checked = true;

        CommonFunctionsUtil.createListOfItems({
            defaultValues: this.questionScales,
            listWrapper: customScaleList,
            itemClassName: "custom-scale-item",
            itemClass: ELEMENTS.CUSTOM.CUSTOM_SCALE_ITEM
        });

        this.saveChanges();
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
            e.target.value = minValue;
            maxNumberOfAnswersInput.setAttribute("min", minValue);
        });
        maxNumberOfAnswersInput.addEventListener("input", (e) => {
            const maxValue = CommonFunctionsUtil.removeMathSignsFromPositiveIntCallback(e);
            e.target.value = maxValue;
            minNumberOfAnswersInput.setAttribute("max", maxValue);
        });
        equalToNumberOfAnswersInput.addEventListener("input", (e) => e.target.value = CommonFunctionsUtil.removeMathSignsFromPositiveIntCallback(e));
    };
}
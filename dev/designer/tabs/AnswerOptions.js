import CommonFunctionsUtil from "../../CommonFunctionsUtil";
import CustomScaleItem from "../../components/CustomScaleItem";
import {DEFAULT_SCALE_TYPE, CUSTOM_SCALE_TYPE, MIN_MAX_TYPE, EQUAL_TYPE} from "../../Constants";

export default class AnswerOptions {
    constructor({elements, type, saveChanges}) {
        this.elements = elements;
        this.type = type;
        this.saveChanges = saveChanges;

        this.render();
    }

    render = () => {
        this.setDefaultAttributes();
        this.setupScaleElements();
        this.setupMinMaxEqualInputs();
        // this.setupSavingElements();
    };

    setDefaultAttributes = () => {
        const {
            activateScalesWrapper, customScalesWrapper, customScaleListWrapper,
            equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput
        } = this.elements;

        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [activateScalesWrapper, customScalesWrapper, customScaleListWrapper,
                CommonFunctionsUtil.getInputWrapper({input: equalToNumberOfAnswersInput})]
        });

        minNumberOfAnswersInput.setAttribute("min", 1);
        maxNumberOfAnswersInput.setAttribute("min", 1);

        this.customizeToType();
    };

    customizeToType = () => {
        const {type} = this;
        const {minMaxInfo, answerOptionsWrapper, haveScalesWrapper, haveScalesInput, activateScalesWrapper, activateDefaultScalesInput, numberOfAnswersWrapper} = this.elements;

        switch (type) {
            case "multi":
                // CommonFunctionsUtil.toggleElementsVisibility({elements: [numberOfAnswersWrapper]});
                CommonFunctionsUtil.toggleElementsVisibility({elements: [answerOptionsWrapper, haveScalesWrapper]});
                break;

            case "grid":
                haveScalesInput.checked = true;
                CommonFunctionsUtil.toggleElementsVisibility({elements: [activateScalesWrapper], shouldBeShown: true});
                CommonFunctionsUtil.toggleElementsVisibility({elements: [minMaxInfo, haveScalesWrapper]});
                activateDefaultScalesInput.checked = true;
                break;

            default:
                CommonFunctionsUtil.toggleElementsVisibility({elements: [minMaxInfo]});
        }
    };

    setupScaleElements = () => {
        const {haveScalesInput, activateScalesWrapper, activateDefaultScalesInput, defaultScalesInfo,
            activateCustomScalesInput, customScalesWrapper, customScaleListWrapper, customScaleList, scalesNumberInput} = this.elements;

        haveScalesInput.addEventListener("input", () => {
            CommonFunctionsUtil.toggleElementsVisibility({
                elements: [activateScalesWrapper],
                shouldBeShown: haveScalesInput.checked
            });
            activateDefaultScalesInput.checked = !activateDefaultScalesInput.checked && !activateCustomScalesInput.checked && haveScalesInput.checked;
            CommonFunctionsUtil.toggleElementsVisibility({
                elements: [defaultScalesInfo],
                shouldBeShown: activateDefaultScalesInput.checked
            });
        });

        activateDefaultScalesInput.addEventListener("input", () => {
            activateDefaultScalesInput.checked = true;
            activateCustomScalesInput.checked = false;
            CommonFunctionsUtil.toggleElementsVisibility({elements: [customScalesWrapper]});
            CommonFunctionsUtil.toggleElementsVisibility({elements: [defaultScalesInfo], shouldBeShown: true});
        });

        activateCustomScalesInput.addEventListener("input", () => {
            activateDefaultScalesInput.checked = false;
            activateCustomScalesInput.checked = true;
            CommonFunctionsUtil.toggleElementsVisibility({elements: [defaultScalesInfo]});
            CommonFunctionsUtil.toggleElementsVisibility({elements: [customScalesWrapper], shouldBeShown: true});
        });

        scalesNumberInput.addEventListener("input", () => {
            const scalesNumberInputValue = parseInt(scalesNumberInput.value);
            CommonFunctionsUtil.toggleElementsVisibility({
                elements: [customScaleListWrapper],
                shouldBeShown: scalesNumberInputValue
            });
            CommonFunctionsUtil.createListOfItems({
                itemsExpectedCount: scalesNumberInputValue,
                listWrapper: customScaleList,
                itemClassName: "custom-scale-item",
                itemClass: CustomScaleItem,
                onInputChange: undefined //this.saveChanges
            });
        });
    };

    setupMinMaxEqualInputs = () => {
        const {typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput} = this.elements;
        typeForNumberOfAnswersSelector.addEventListener("input", (e) => {
            const selector = e.target;
            CommonFunctionsUtil.toggleElementsVisibility({
                elements: [CommonFunctionsUtil.getInputWrapper({input: equalToNumberOfAnswersInput})],
                shouldBeShown: selector[0].selected
            });
            CommonFunctionsUtil.toggleElementsVisibility({
                elements: [CommonFunctionsUtil.getInputWrapper({input: minNumberOfAnswersInput}), CommonFunctionsUtil.getInputWrapper({input: maxNumberOfAnswersInput})],
                shouldBeShown: selector[1].selected
            });
        });

        minNumberOfAnswersInput.addEventListener("input", (e) => {
            const minValue = e.target.value.replace(/\D+/g, '');
            minNumberOfAnswersInput.value = minValue;
            maxNumberOfAnswersInput.setAttribute("min", minValue);
        });
        maxNumberOfAnswersInput.addEventListener("input", (e) => {
            const maxValue = e.target.value.replace(/\D+/g, '');
            maxNumberOfAnswersInput.value = maxValue;
            minNumberOfAnswersInput.setAttribute("max", maxValue);
        });
        equalToNumberOfAnswersInput.addEventListener("input", (e) => {
            equalToNumberOfAnswersInput.value = e.target.value.replace(/\D+/g, '');
        });
    };

    setupSavingElements = () => {
        const {
            haveScalesInput, activateDefaultScalesInput, activateCustomScalesInput, scalesNumberInput,
            typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput
        } = this.elements;

        haveScalesInput.addEventListener("change", this.saveChanges);
        activateDefaultScalesInput.addEventListener("change", this.saveChanges);
        activateCustomScalesInput.addEventListener("change", this.saveChanges);
        scalesNumberInput.addEventListener("change", this.saveChanges);

        typeForNumberOfAnswersSelector.addEventListener("change", this.saveChanges);
        equalToNumberOfAnswersInput.addEventListener("change", this.saveChanges);
        minNumberOfAnswersInput.addEventListener("change", this.saveChanges);
        maxNumberOfAnswersInput.addEventListener("change", this.saveChanges);
    };

    setValuesFromSettings = (settings) => {
        const {type, elements} = this;
        const {answerOptionsWrapper, haveScalesInput, activateScalesWrapper} = elements;
        const {haveScales, scaleType, customScales, answersCount} = settings;

        const equalHasValue = answersCount.type === EQUAL_TYPE && answersCount.equal > 0;
        const minMaxHasValue = answersCount.type === MIN_MAX_TYPE && (answersCount.min > 0 || answersCount.max > 0);
        const customScalesHaveValues = scaleType === CUSTOM_SCALE_TYPE && customScales.length > 0;
        const shouldBeOpenedForNonTyped = type !== "grid" && type !== "multi" && haveScales;
        const shouldBeOpenedForMulti = type === "multi" && (equalHasValue || minMaxHasValue);
        const shouldBeOpenedForGrid = type === "grid" && (equalHasValue || minMaxHasValue || customScalesHaveValues);

        if (shouldBeOpenedForNonTyped || shouldBeOpenedForMulti || shouldBeOpenedForGrid) {
            CommonFunctionsUtil.toggleTab({elements: [answerOptionsWrapper]});
        }

        haveScalesInput.checked = haveScales;
        if (type !== "multi") {
            CommonFunctionsUtil.toggleElementsVisibility({elements: [activateScalesWrapper], shouldBeShown: haveScales});
        }

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
                itemClass: CustomScaleItem,
                onInputChange: undefined //this.saveChanges
            });
        }

        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [customScalesWrapper],
            shouldBeShown: haveScales && scaleType === CUSTOM_SCALE_TYPE
        });
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [customScaleListWrapper],
            shouldBeShown: haveScales && scaleType === CUSTOM_SCALE_TYPE && customScales.length > 0
        });
    };

    setValuesFromSettingsForAnswerCount = ({answersCount}) => {
        const {typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput} = this.elements;

        if (answersCount.type === EQUAL_TYPE) {
            typeForNumberOfAnswersSelector[0].selected = true;
        } else {
            typeForNumberOfAnswersSelector[1].selected = true;
        }

        // const elementsToChangeVisibility = [
        //     {
        //         shouldBeShown: answersCount.type === EQUAL_TYPE,
        //         elements: [CommonFunctionsUtil.getInputWrapper({input: equalToNumberOfAnswersInput})]
        //     },
        //     {
        //         shouldBeShown: answersCount.type === MIN_MAX_TYPE,
        //         elements: [CommonFunctionsUtil.getInputWrapper({input: minNumberOfAnswersInput}), CommonFunctionsUtil.getInputWrapper({input: maxNumberOfAnswersInput})]
        //     }
        // ];
        // elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [CommonFunctionsUtil.getInputWrapper({input: equalToNumberOfAnswersInput})],
            shouldBeShown: answersCount.type === EQUAL_TYPE
        });
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [CommonFunctionsUtil.getInputWrapper({input: minNumberOfAnswersInput}), CommonFunctionsUtil.getInputWrapper({input: maxNumberOfAnswersInput})],
            shouldBeShown: answersCount.type === MIN_MAX_TYPE
        });

        if (answersCount.equal) {
            equalToNumberOfAnswersInput.value = answersCount.equal;
        }

        if (answersCount.max) {
            maxNumberOfAnswersInput.value = CommonFunctionsUtil.correctValueToMinMaxInInput({input: maxNumberOfAnswersInput, value: answersCount.max});
        }
        if (answersCount.min) {
            minNumberOfAnswersInput.value = CommonFunctionsUtil.correctValueToMinMaxInInput({input: minNumberOfAnswersInput, value: answersCount.min});
        }
        maxNumberOfAnswersInput.min = minNumberOfAnswersInput.value;
        minNumberOfAnswersInput.max = maxNumberOfAnswersInput.value;
    };
}
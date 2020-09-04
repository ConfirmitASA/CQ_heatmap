import CommonFunctionsUtil from "../CommonFunctionsUtil";
import {CustomScaleItem} from "../../components/CustomScaleItem";

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
        this.connectMinMaxInputs();
        this.setupSavingElements();
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
        const {haveScalesWrapper, haveScalesInput, activateScalesWrapper, activateDefaultScalesInput, numberOfAnswersWrapper} = this.elements;

        if (type === "multi" || type === "grid") {
            CommonFunctionsUtil.toggleElementsVisibility({elements: [haveScalesWrapper]});
        }

        switch (type) {
            case "multi":
                // CommonFunctionsUtil.toggleElementsVisibility({elements: [numberOfAnswersWrapper]});
                break;

            case "grid":
                haveScalesInput.checked = true;
                CommonFunctionsUtil.toggleElementsVisibility({elements: [activateScalesWrapper], shouldBeShown: true});
                activateDefaultScalesInput.checked = true;
        }
    };

    setupScaleElements = () => {
        const {haveScalesInput, activateScalesWrapper, activateDefaultScalesInput, defaultScalesInfo,
            activateCustomScalesInput, customScalesWrapper, customScaleListWrapper, customScaleList, scalesNumberInput} = this.elements;

        haveScalesInput.addEventListener("change", () => {
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

        activateDefaultScalesInput.addEventListener("change", () => {
            activateDefaultScalesInput.checked = true;
            activateCustomScalesInput.checked = false;
            CommonFunctionsUtil.toggleElementsVisibility({elements: [customScalesWrapper]});
            CommonFunctionsUtil.toggleElementsVisibility({elements: [defaultScalesInfo], shouldBeShown: true});
        });

        activateCustomScalesInput.addEventListener("change", () => {
            activateDefaultScalesInput.checked = false;
            activateCustomScalesInput.checked = true;
            CommonFunctionsUtil.toggleElementsVisibility({elements: [defaultScalesInfo]});
            CommonFunctionsUtil.toggleElementsVisibility({elements: [customScalesWrapper], shouldBeShown: true});
        });

        scalesNumberInput.addEventListener("change", () => {
            const scalesNumberInputValue = scalesNumberInput.value;
            CommonFunctionsUtil.toggleElementsVisibility({
                elements: [customScaleListWrapper],
                shouldBeShown: scalesNumberInputValue
            });
        });

        scalesNumberInput.addEventListener("change", () => {
            CommonFunctionsUtil.createListOfItems({
                itemsExpectedCount: parseInt(scalesNumberInput.value),
                listWrapper: customScaleList,
                itemClassName: "custom-scale-item",
                itemClass: CustomScaleItem,
                onInputChange: this.saveChanges
            });
        });
    };

    setupMinMaxEqualInputs = () => {
        const {typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput} = this.elements;

        typeForNumberOfAnswersSelector.addEventListener("change", (e) => {
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
    };

    connectMinMaxInputs = () => {
        const {minNumberOfAnswersInput, maxNumberOfAnswersInput} = this.elements;

        minNumberOfAnswersInput.addEventListener("change", function () {
            const minValue = minNumberOfAnswersInput.value;
            maxNumberOfAnswersInput.setAttribute("min", minValue);
        });
        maxNumberOfAnswersInput.addEventListener("change", function () {
            const maxValue = maxNumberOfAnswersInput.value;
            minNumberOfAnswersInput.setAttribute("max", maxValue);
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
        const {haveScalesInput, activateScalesWrapper} = elements;
        const {areas, haveScales, scaleType, customScales, answersCount} = settings;

        if (haveScales || answersCount.type === "equal" && answersCount.equal || answersCount.type === "min-max" && (answersCount.min || answersCount.max)) {
            this.toggleAnswerOptionsTab();
        }

        haveScalesInput.checked = haveScales;
        if (type !== "multi") {
            CommonFunctionsUtil.toggleElementsVisibility({elements: [activateScalesWrapper], shouldBeShown: haveScales});
        }

        this.setValuesFromSettingsForDefaultScales({scaleType});
        this.setValuesFromSettingsForCustomScales({haveScales, scaleType, customScales});
        this.setValuesFromSettingsForAnswerCount({answersCount, areasCount: areas.length});
    };

    toggleAnswerOptionsTab = () => {
        const {answerOptionsWrapper} = this.elements;
        const answerOptionsHeader = answerOptionsWrapper.querySelector("header");
        answerOptionsHeader.classList.add("comd-panel--collapsed");
    };

    setValuesFromSettingsForDefaultScales = ({scaleType}) => {
        const {activateDefaultScalesInput, defaultScalesInfo} = this.elements;
        activateDefaultScalesInput.checked = scaleType === "default";
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [defaultScalesInfo],
            shouldBeShown: scaleType === "default"
        });
    };

    setValuesFromSettingsForCustomScales = ({haveScales, scaleType, customScales}) => {
        const {activateCustomScalesInput, scalesNumberInput, customScalesWrapper, customScaleListWrapper, customScaleList} = this.elements;
        activateCustomScalesInput.checked = scaleType === "custom";

        if (haveScales && scaleType === "custom") {
            scalesNumberInput.value = customScales.length;
            CommonFunctionsUtil.createListOfItems({
                defaultValues: customScales,
                listWrapper: customScaleList,
                itemClassName: "custom-scale-item",
                itemClass: CustomScaleItem,
                onInputChange: this.saveChanges
            });
        }

        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [customScalesWrapper],
            shouldBeShown: haveScales && scaleType === "custom"
        });
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [customScaleListWrapper],
            shouldBeShown: haveScales && scaleType === "custom" && customScales.length > 0
        });
    };

    setValuesFromSettingsForAnswerCount = ({answersCount, areasCount}) => {
        const {typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput} = this.elements;

        if (answersCount.type === "equal") {
            typeForNumberOfAnswersSelector[0].selected = true;
        } else {
            typeForNumberOfAnswersSelector[1].selected = true;
        }
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [CommonFunctionsUtil.getInputWrapper({input: equalToNumberOfAnswersInput})],
            shouldBeShown: answersCount.type === "equal"
        });
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [CommonFunctionsUtil.getInputWrapper({input: minNumberOfAnswersInput}), CommonFunctionsUtil.getInputWrapper({input: maxNumberOfAnswersInput})],
            shouldBeShown: answersCount.type === "min-max"
        });

        if (answersCount.equal) {
            equalToNumberOfAnswersInput.value = answersCount.equal;
        }
        if (answersCount.max) {
            maxNumberOfAnswersInput.value = answersCount.max;
        }
        if (answersCount.min) {
            minNumberOfAnswersInput.value = answersCount.min;
        }

        maxNumberOfAnswersInput.setAttribute("max", areasCount);
    };
}
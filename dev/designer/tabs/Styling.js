import CommonFunctionsUtil from "../CommonFunctionsUtil";

export default class Styling {
    constructor({elements, type, saveChanges}) {
        this.elements = elements;
        this.type = type;
        this.saveChanges = saveChanges;

        this.defaultValueForAreaHover = "#ffffff";
        this.defaultValueForAreaBorder = "#000000";
        this.defaultValueForAreaChosen = "#008000";

        this.render();
    }

    render = () => {
        this.setDefaultAttributes();
        this.setupAdditionalStyles();
        this.setupSavingElements();
    };

    setDefaultAttributes = () => {
        const {elements, defaultValueForAreaHover, defaultValueForAreaBorder, defaultValueForAreaChosen} = this;
        const {areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput, areaChosenColorInput} = elements;

        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [CommonFunctionsUtil.getInputWrapper({input: areaBorderWidthInput}), CommonFunctionsUtil.getInputWrapper({input: areaBorderColorInput})]
        });

        areaHoverColorInput.value = defaultValueForAreaHover;
        areaBorderColorInput.value = defaultValueForAreaBorder;
        areaChosenColorInput.value = defaultValueForAreaChosen;

        this.customizeToType();
    };

    customizeToType = () => {
        const {type} = this;
        const {areaChosenColorInput} = this.elements;

        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [CommonFunctionsUtil.getInputWrapper({
                input: areaChosenColorInput,
                level: 3
            })], shouldBeShown: type !== "grid"
        });
    };

    setupAdditionalStyles = () => {
        const {areaHighlighterSelector, areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput} = this.elements;

        areaHighlighterSelector.addEventListener("change", (e) => {
            const selector = e.target;
            CommonFunctionsUtil.toggleElementsVisibility({
                elements: [CommonFunctionsUtil.getInputWrapper({input: areaHoverColorInput})],
                shouldBeShown: selector[0].selected
            });
            CommonFunctionsUtil.toggleElementsVisibility({
                elements: [CommonFunctionsUtil.getInputWrapper({input: areaBorderWidthInput}), CommonFunctionsUtil.getInputWrapper({input: areaBorderColorInput})],
                shouldBeShown: selector[1].selected
            });
        });
    };

    setupSavingElements = () => {
        const {areaHighlighterSelector, areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput, areaChosenColorInput} = this.elements;

        areaHighlighterSelector.addEventListener("change", this.saveChanges);
        areaHoverColorInput.addEventListener("change", this.saveChanges);
        areaBorderWidthInput.addEventListener("change", this.saveChanges);
        areaBorderColorInput.addEventListener("change", this.saveChanges);
        areaChosenColorInput.addEventListener("change", this.saveChanges);
    };

    setValuesFromSettings = (settings) => {
        const {elements, defaultValueForAreaHover, defaultValueForAreaBorder, defaultValueForAreaChosen} = this;
        const {stylingWrapper, areaHoverColorInput, areaBorderColorInput, areaBorderWidthInput, areaChosenColorInput} = elements;
        const {styles} = settings;

        if (styles && (
            styles.areaHighlight && (styles.areaHighlight.type === "color" && styles.areaHighlight.color !== defaultValueForAreaHover ||
            styles.areaHighlight.type === "border" && (styles.areaHighlight.border.color !== defaultValueForAreaBorder || styles.areaHighlight.border.width > 0))
            || styles.areaChoose && styles.areaChoose.color !== defaultValueForAreaChosen)
        ) {
            CommonFunctionsUtil.toggleTab({elements: [stylingWrapper]});
        }

        if (styles) {
            if (styles.areaHighlight) {
                this.setValuesFromSettingsForAreaHighlight({styles});
            }

            if (styles.areaChoose && styles.areaChoose.color) {
                areaChosenColorInput.value = styles.areaChoose.color;
            }
        }

        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [CommonFunctionsUtil.getInputWrapper({input: areaHoverColorInput})],
            shouldBeShown: !styles || !styles.areaHighlight || styles.areaHighlight.type === "color"
        });
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [CommonFunctionsUtil.getInputWrapper({input: areaBorderWidthInput}), CommonFunctionsUtil.getInputWrapper({input: areaBorderColorInput})],
            shouldBeShown: styles && styles.areaHighlight && styles.areaHighlight.type === "border"
        });
    };

    setValuesFromSettingsForAreaHighlight = ({styles}) => {
        const {areaHighlighterSelector, areaHoverColorInput, areaBorderColorInput, areaBorderWidthInput} = this.elements;

        if (styles.areaHighlight.type === "border") {
            areaHighlighterSelector[1].selected = true;
        } else {
            areaHighlighterSelector[0].selected = true;
        }

        if (styles.areaHighlight.color) {
            areaHoverColorInput.value = styles.areaHighlight.color;
        }

        if (styles.areaHighlight.border) {
            if (styles.areaHighlight.border.width) {
                areaBorderWidthInput.value = styles.areaHighlight.border.width;
            }
            if (styles.areaHighlight.border.color) {
                areaBorderColorInput.value = styles.areaHighlight.border.color;
            }
        }
    };
}
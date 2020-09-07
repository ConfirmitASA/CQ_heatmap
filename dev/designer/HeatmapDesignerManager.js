import ImageOptions from "./tabs/ImageOptions";
import AnswerOptions from "./tabs/AnswerOptions";
import Styling from "./tabs/Styling";
import Elements from "./Elements";
import CommonFunctionsUtil from "./CommonFunctionsUtil";

export default class HeatmapDesignerManager {
    constructor({question}) {
        this.question = question;

        this.elements = new Elements();
        this.type = this.elements.questionType;

        this.hasErrors = false;

        this.render();
    }

    render = () => {
        const {elements, type, saveChanges} = this;

        this.ImageOptions = new ImageOptions({elements, saveChanges});
        this.AnswerOptions = new AnswerOptions({elements, type, saveChanges});
        this.Styling = new Styling({elements, type, saveChanges});

        this.question.onSettingsReceived = this.setValuesFromSettings;

        this.customizeToType();
    };

    customizeToType = () => {
        const {type, elements} = this;
        const {requiredInfo} = elements;

        if (type !== "multi") {
            CommonFunctionsUtil.toggleElementsVisibility({elements: [requiredInfo], shouldBeShown: true})
        }
    };

    setValuesFromSettings = (settings) => {
        this.ImageOptions.setValuesFromSettings(settings);
        this.AnswerOptions.setValuesFromSettings(settings);
        this.Styling.setValuesFromSettings(settings);
    };

    saveChanges = () => {
        const {question, elements} = this;
        const {haveScalesInput} = elements;

        this.hasErrors = false;

        const settings = {
            imageOptions: this.getImageOptions(),
            areas: this.addAreaTexts({areas: this.getAreas()}),
            answersCount: this.getAnswersCount(),
            haveScales: haveScalesInput.checked,
            ...this.getScales(),
            styles: this.getStyles()
        };

        question.saveChanges(settings, this.hasErrors);
    };

    getImageOptions = () => {
        const {imageSrcInput, imageWidthInput} = this.elements;

        if (!imageSrcInput.value || !imageWidthInput.value) {
            this.hasErrors = true;
        }

        if (!imageSrcInput.value) {
            imageSrcInput.classList.add("form-input--error");
        } else {
            imageSrcInput.classList.remove("form-input--error");
        }
        if (!imageWidthInput.value) {
            imageWidthInput.classList.add("form-input--error");
        } else {
            imageWidthInput.classList.remove("form-input--error");
        }

        return {
            src: imageSrcInput.value,
            width: imageWidthInput.value
        };
    };

    getAreas = () => {
        const {heatmapWrapperId} = this.elements;
        const heatmapImageJQ = $(`#${heatmapWrapperId} img`);

        if ($(`#${heatmapWrapperId} .select-areas-overlay`).length > 0) {
            const areas = heatmapImageJQ.selectAreas("areas");
            if (areas.length > 0) {
                return areas;
            }
        }

        this.hasErrors = true;
        return [];
    };

    addAreaTexts = ({areas}) => {
        const {areaTextListWrapper} = this.elements;
        const resultAreas = areas;

        const areaTextItems = areaTextListWrapper.querySelectorAll(".area-text-item__text");
        resultAreas.forEach((area, index) => {
            const textIndex = areaTextItems.length - index - 1;
            if (areaTextItems[textIndex]) {
                area.title = areaTextItems[textIndex].value;
            }
        });

        if (resultAreas.length <= 0) {
            this.hasErrors = true;
        }

        return resultAreas;
    };

    getAnswersCount = () => {
        const {typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput, maxNumberOfAnswersInput, minNumberOfAnswersInput, heatmapWrapperId} = this.elements;
        const typeForNumberOfAnswers = typeForNumberOfAnswersSelector[0].selected ? "equal" : "min-max";

        const areas = $(`#${heatmapWrapperId} .select-areas-overlay`).length > 0 ? $(`#${heatmapWrapperId} img`).selectAreas("areas") : [];

        if (typeForNumberOfAnswers === "equal" && equalToNumberOfAnswersInput.value && equalToNumberOfAnswersInput.value > areas.length) {
            this.hasErrors = true;
        }
        equalToNumberOfAnswersInput.classList.toggle("form-input--error", typeForNumberOfAnswers === "equal" && equalToNumberOfAnswersInput.value && equalToNumberOfAnswersInput.value > areas.length);

        return {
            type: typeForNumberOfAnswers,
            equal: typeForNumberOfAnswers === "equal" && equalToNumberOfAnswersInput.value ? equalToNumberOfAnswersInput.value : undefined,
            max: typeForNumberOfAnswers === "min-max" && maxNumberOfAnswersInput.value ? maxNumberOfAnswersInput.value : undefined,
            min: typeForNumberOfAnswers === "min-max" && minNumberOfAnswersInput.value ? minNumberOfAnswersInput.value : undefined
        };
    };

    getScales = () => {
        const {haveScalesInput, activateCustomScalesInput, scalesNumberInput} = this.elements;

        if (haveScalesInput.checked) {
            const scaleType = activateCustomScalesInput.checked ? "custom" : "default";
            let customScales = undefined;

            if (scaleType === "custom") {
                customScales = [];
                const customScaleItems = document.querySelectorAll(".custom-scale-item");
                customScaleItems.forEach((item, index) => {
                    const color = item.querySelector(".custom-scale-item__color").value;
                    const codeInput = item.querySelector(".custom-scale-item__code");
                    const code = codeInput.value;
                    const type = codeInput.value;
                    const label = item.querySelector(".custom-scale-item__label").value;
                    customScales.push({color,
                        code: code ? code : index,
                        type: type ? type : index,
                        label: label ? label : index
                    });

                    if (!code) {
                        this.hasErrors = true;
                    }
                    codeInput.classList.toggle("form-input--error", !code);
                });

                if (customScales.length <= 0) {
                    this.hasErrors = true;
                }
                scalesNumberInput.classList.toggle("form-input--error", customScales.length <= 0);
            }

            return {scaleType, customScales}
        }
    };

    getStyles = () => {
        const {areaHighlighterSelector, areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput, areaChosenColorInput} = this.elements;
        const areaHighlighterType = areaHighlighterSelector[1].selected ? "border" : "color";

        const areaHighlighterColor = areaHighlighterType === "color" && areaHoverColorInput.value ? areaHoverColorInput.value : undefined;
        const areaHighlighterBorderEnabled = areaHighlighterType === "border" && (areaBorderWidthInput.value || areaBorderColorInput.value);

        return {
            areaHighlight: {
                type: areaHighlighterType,
                color: areaHighlighterColor,
                border: areaHighlighterBorderEnabled
                    ? {
                        width: areaBorderWidthInput.value ? areaBorderWidthInput.value : undefined,
                        color: areaBorderColorInput.value ? areaBorderColorInput.value : undefined
                    }
                    : undefined,
            },
            areaChoose: {
                color: areaChosenColorInput.value ? areaChosenColorInput.value : undefined
            }
        };
    };
}
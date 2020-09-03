import ImageOptions from "./tabs/ImageOptions";
import AnswerOptions from "./tabs/AnswerOptions";
import Styling from "./tabs/Styling";
import Elements from "./Elements";
import CommonFunctionsUtil from "./CommonFunctionsUtil";

export default class HeatmapDesignerManager {
    constructor({question, type}) {
        this.question = question;
        this.type = type;
        this.hasErrors = false;

        this.elements = new Elements();

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

        if (type) {
            CommonFunctionsUtil.toggleElementsVisibility({elements: [requiredInfo], shouldBeShown: true})
        }
    };

    setValuesFromSettings = (settings) => {
        this.ImageOptions.setValuesFromSettings(settings);
        this.AnswerOptions.setValuesFromSettings(settings);
        this.Styling.setValuesFromSettings(settings);
    };

    saveChanges = () => {
        const {question, hasErrors} = this;
        const {haveScalesInput} = this.elements;

        const settings = {
            imageOptions: this.getImageOptions(),
            areas: this.addAreaTexts({areas: this.getAreas()}),
            answersCount: this.getAnswersCount(),
            haveScales: haveScalesInput.checked,
            ...this.getScales(),
            styles: this.getStyles()
        };

        question.saveChanges(settings, hasErrors);
    };

    getImageOptions = () => {
        const {imageSrcInput, imageWidthInput} = this.elements;

        return {
            src: imageSrcInput.value,
            width: imageWidthInput.value
        };
    };

    getAreas = () => {
        const {heatmapWrapperId} = this.elements;
        const heatmapImageJQ = $(`#${heatmapWrapperId} img`);
        return heatmapImageJQ.length > 0 ? heatmapImageJQ.selectAreas("areas") : [];
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

        return resultAreas;
    };

    getAnswersCount = () => {
        const {typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput, maxNumberOfAnswersInput, minNumberOfAnswersInput} = this.elements;
        const typeForNumberOfAnswers = typeForNumberOfAnswersSelector[0].selected ? "equal" : "min-max";

        return {
            type: typeForNumberOfAnswers,
            equal: typeForNumberOfAnswers === "equal" && equalToNumberOfAnswersInput.value ? equalToNumberOfAnswersInput.value : undefined,
            max: typeForNumberOfAnswers === "min-max" && maxNumberOfAnswersInput.value ? maxNumberOfAnswersInput.value : undefined,
            min: typeForNumberOfAnswers === "min-max" && minNumberOfAnswersInput.value ? minNumberOfAnswersInput.value : undefined
        };
    };

    getStyles = () => {
        const {areaHighlighterSelector, areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput, areaChosenColorInput} = this.elements;
        const areaHighlighterType = areaHighlighterSelector[1].selected ? "border" : "color";

        return {
            areaHighlight: {
                type: areaHighlighterType,
                color: areaHighlighterType === "color" && areaHoverColorInput.value ? areaHoverColorInput.value : undefined,
                border: areaHighlighterType === "border" && (areaBorderWidthInput.value || areaBorderColorInput.value)
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

    getScales = () => {
        const {haveScalesInput, activateCustomScalesInput} = this.elements;

        if (haveScalesInput.checked) {
            const scaleType = activateCustomScalesInput.checked ? "custom" : "default";
            let customScales = undefined;

            if (activateCustomScalesInput.checked) {
                customScales = [];
                const customScaleItems = document.querySelectorAll(".custom-scale-item");
                customScaleItems.forEach((item, index) => {
                    const color = item.querySelector(".custom-scale-item__color").value;
                    const code = item.querySelector(".custom-scale-item__code").value;
                    const type = item.querySelector(".custom-scale-item__code").value;
                    const label = item.querySelector(".custom-scale-item__label").value;
                    customScales.push({color,
                        code: code ? code : index,
                        type: type ? type : index,
                        label: label ? label : index
                    })
                });
            }

            return {scaleType, customScales}
        }
    };
}
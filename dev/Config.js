import CommonFunctionsUtil from "./CommonFunctionsUtil";

import {HAVE_SCALES_WRAPPER_LEVEL_FROM_INPUT, QUESTION_TYPES} from "./Constants";

export default class Config {
    static questionType = QUESTION_TYPES.GRID;
    static heatmapWrapperId = "heatmapWrapper";

    constructor() {
        this.elements = {
            settingsWrapper: document.querySelector("#heatmapSettings")
        };

        this.setupElements();
    }

    setupElements = () => {
        this.setupInfos();
        this.setupImageOptions();
        this.setupAnswerOptions();
        this.setupStyling();
    };

    setupImageOptions = () => {
        const {elements} = this;
        const {settingsWrapper} = elements;

        this.elements = {
            ...elements,
            imageSettingsWrapper: settingsWrapper.querySelector(".settings-wrapper.settings-wrapper--image"),
            imageSrcInput: settingsWrapper.querySelector("#imageSrc"),
            areasWrapper: settingsWrapper.querySelector(".settings-wrapper.settings-wrapper--areas"),
            heatmapWrapper: settingsWrapper.querySelector(`#${Config.heatmapWrapperId}`)
        }

        this.elements.areaTextsTitle = this.elements.areasWrapper.querySelector(".node-property h4");
        this.elements.areaTextListWrapper = this.elements.areasWrapper.querySelector(".inputlist tbody");
    };

    setupAnswerOptions = () => {
        const {elements} = this;
        const {settingsWrapper} = elements;

        this.elements = {
            ...elements,
            answerOptionsTabWrapper: settingsWrapper.querySelector(".tab.tab--answer-options"),
            scaleSettingsWrapper: settingsWrapper.querySelector(".settings-wrapper.settings-wrapper--scales"),
            customScalesWrapper: settingsWrapper.querySelector(".custom-scales-wrapper"),
            haveScalesInput: settingsWrapper.querySelector("#haveScales"),
            activateDefaultScalesInput: settingsWrapper.querySelector("#activateDefaultScales"),
            activateCustomScalesInput: settingsWrapper.querySelector("#activateCustomScales"),
            numberOfAnswersWrapper: settingsWrapper.querySelector(".settings-wrapper.settings-wrapper--answers-number"),
            typeForNumberOfAnswersSelector: settingsWrapper.querySelector("#typeForNumberOfAnswers"),
            minNumberOfAnswersInput: settingsWrapper.querySelector("#minAnswers"),
            maxNumberOfAnswersInput: settingsWrapper.querySelector("#maxAnswers"),
            equalToNumberOfAnswersInput: settingsWrapper.querySelector("#equalAnswers")
        }

        this.elements.customScaleListWrapper = this.elements.customScalesWrapper.querySelector(".inputlist-container");
        this.elements.customScaleList = this.elements.customScaleListWrapper.querySelector(".inputlist tbody");

        this.elements.haveScalesWrapper = CommonFunctionsUtil.getInputWrapper({
            input: this.elements.haveScalesInput,
            level: HAVE_SCALES_WRAPPER_LEVEL_FROM_INPUT
        })
    };

    setupStyling = () => {
        const {elements} = this;
        const {settingsWrapper} = elements;

        this.elements = {
            ...elements,
            preHighlightAreasOnMobileInput: settingsWrapper.querySelector("#preHighlightAreasOnMobile"),
            stylingTabWrapper: settingsWrapper.querySelector(".tab.tab--styling"),
            areaHighlighterSelector: settingsWrapper.querySelector("#areaHighlighterSelector"),
            areaHoverColorInput: settingsWrapper.querySelector("#areaHoverColor"),
            areaBorderWidthInput: settingsWrapper.querySelector("#areaBorderWidth"),
            areaBorderColorInput: settingsWrapper.querySelector("#areaBorderColor"),
            areaChosenColorInput: settingsWrapper.querySelector("#areaChosenColor")
        }
    };

    setupInfos = () => {
        const {elements} = this;
        const {settingsWrapper} = elements;

        this.elements = {
            ...elements,

            requiredInfo: settingsWrapper.querySelector(".info.info--required"),
            minMaxInfo: settingsWrapper.querySelector(".info.info--min-max"),
            defaultScalesInfo: settingsWrapper.querySelector(".info.info--default-scales")
        }
    };
}
export default class Elements {
    constructor() {
        this.heatmapWrapperId = "heatmapWrapper";
        this.setupElements();
    }

    setupElements = () => {
        this.imageSrcInput = document.getElementById("imageSrc");
        this.imageWidthInput = document.getElementById("imageWidth");
        this.haveScalesInput = document.getElementById("haveScales");
        this.activateDefaultScalesInput = document.getElementById("activateDefaultScales");
        this.activateCustomScalesInput = document.getElementById("activateCustomScales");
        this.scalesNumberInput = document.getElementById("scalesNumber");
        this.areaHoverColorInput = document.getElementById("areaHoverColor");
        this.areaBorderWidthInput = document.getElementById("areaBorderWidth");
        this.areaBorderColorInput = document.getElementById("areaBorderColor");
        this.areaChosenColorInput = document.getElementById("areaChosenColor");

        this.areaHighlighterSelector = document.getElementById("areaHighlighterSelector");

        this.changeImageBtn = document.getElementById("changeImageBtn");
        this.drawImageBtn = document.getElementById("drawImageBtn");

        this.imageSettingsWrapper = document.getElementById("imageSettings");
        this.areasWrapper = document.getElementById("areas");
        this.areaTextListWrapper = document.getElementById("areaTextList");
        this.heatmapWrapper = document.getElementById(this.heatmapWrapperId);
        this.answerOptionsWrapper = document.getElementById("answerOptions");
        this.haveScalesWrapper = document.getElementById("haveScalesWrapper");
        this.activateScalesWrapper = document.getElementById("activateScales");
        this.customScalesWrapper = document.getElementById("customScales");
        this.customScaleListWrapper = document.getElementById("customScaleListWrapper");
        this.customScaleList = document.getElementById("customScaleList");

        this.defaultScalesInfo = document.getElementById("defaultScalesInfo");
        this.requiredInfo = document.getElementById("requiredInfo");

        this.numberOfAnswersWrapper = document.getElementById("numberOfAnswers");
        this.typeForNumberOfAnswersSelector = document.getElementById("numberOfAnswers__type");
        this.equalToNumberOfAnswersInput = document.getElementById("numberOfAnswers__equal");
        this.minNumberOfAnswersInput = document.getElementById("numberOfAnswers__min");
        this.maxNumberOfAnswersInput = document.getElementById("numberOfAnswers__max");

        this.areaTextsTitle = document.getElementById("areaTextsTitle");
    };
}
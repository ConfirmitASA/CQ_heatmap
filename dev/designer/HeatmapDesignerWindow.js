import ImageOptionsTab from "./tabs/ImageOptionsTab";
import AnswerOptionsTab from "./tabs/AnswerOptionsTab";
import StylingTab from "./tabs/StylingTab";
import Config from "../Config";
import QuestionTypesHandlerMakerForDesigner from "./QuestionTypesHandlerMakerForDesigner";

export default class HeatmapDesignerWindow {
    constructor({question}) {
        this.question = question;

        this.config = new Config();
        this.elements = this.config.elements;
        this.questionTypeHandler = new QuestionTypesHandlerMakerForDesigner({type: Config.questionType, elements: this.elements});

        this.state = {
            hasErrors: false
        };

        this.render();
    }

    render = () => {
        const {elements, questionTypeHandler, saveChanges} = this;

        this.tabs = {
            ImageOptions: new ImageOptionsTab({elements, questionTypeHandler, saveChanges}),
            AnswerOptions: new AnswerOptionsTab({elements, questionTypeHandler, saveChanges}),
            Styling: new StylingTab({elements, questionTypeHandler, saveChanges})
        }

        const {settingsWrapper} = elements;
        settingsWrapper.addEventListener("input", saveChanges);

        this.question.onSettingsReceived = this.setValuesFromSettingsCallback;

        questionTypeHandler.customizeDesignerWindowToType();
    };

    setValuesFromSettingsCallback = (settings) => {
        const {ImageOptions, AnswerOptions, Styling} = this.tabs;

        if (!settings) return;

        ImageOptions.setValues({values: settings});
        AnswerOptions.setValues({values: settings});
        Styling.setValues({values: settings});
    };

    saveChanges = () => {
        const {question, elements, tabs} = this;
        const {ImageOptions, AnswerOptions, Styling} = tabs;
        const {haveScalesInput} = elements;

        this.state.hasErrors = false;

        const settings = {
            haveScales: haveScalesInput.checked
        };

        const {imageOptions, areas} = ImageOptions.values;
        settings.imageOptions = imageOptions;
        settings.areas = areas;
        this.state.hasErrors = ImageOptions.raiseErrors() || this.state.hasErrors;

        const {answersCount, scales} = AnswerOptions.values;
        settings.answersCount = answersCount;
        if (scales) {
            settings.scaleType = scales.scaleType;
            settings.customScales = scales.customScales;
        }
        this.state.hasErrors = AnswerOptions.raiseErrors({areas: ImageOptions.getAreas()}) || this.state.hasErrors;

        settings.styles = Styling.values;
        this.state.hasErrors = Styling.raiseErrors() || this.state.hasErrors;

        question.saveChanges(settings, this.state.hasErrors);
    };
}
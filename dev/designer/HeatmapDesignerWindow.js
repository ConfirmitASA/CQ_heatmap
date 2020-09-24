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

        this.question.onInit = this.setSettingsOnInitCallback;
        this.question.onSettingsReceived = this.setValuesFromSettingsCallback;

        questionTypeHandler.customizeDesignerWindowToType();
    };

    setSettingsOnInitCallback = (settings, uiSettings, questionSettings, projectSettings) => {
        this.question.language = uiSettings.currentLanguage;
        this.question.answers = questionSettings.answers;
        this.question.scales = questionSettings.scales;

        this.tabs.AnswerOptions.questionScales = this.getScalesWithCurrentLanguage({scales: questionSettings.scales});
    };

    getScalesWithCurrentLanguage = ({scales}) => {
        return scales.map((scale) => {
            const currentLanguageText = scale.texts.find((textOptions) => textOptions.language === this.question.language);
            return {
                ...scale,
                text: currentLanguageText ? currentLanguageText.text : ""
            }
        })
    };

    setValuesFromSettingsCallback = (settings, uiSettings) => {
        const {question, tabs} = this;
        const {scales} = question;
        const {ImageOptions, AnswerOptions, Styling} = tabs;

        if (uiSettings) {
            this.question.language = uiSettings.currentLanguage;
            this.tabs.AnswerOptions.questionScales = this.getScalesWithCurrentLanguage({scales});
        }

        if (settings) {
            ImageOptions.setValues({values: settings});
            AnswerOptions.setValues({values: {...settings, scales: this.getScalesWithCurrentLanguage({scales})}});
            Styling.setValues({values: settings});

            this.saveChanges(settings.areas);
        }
    };

    saveChanges = (areasFromSettings) => {
        const {question, elements, tabs} = this;
        const {answers, scales} = question;
        const {ImageOptions, AnswerOptions, Styling} = tabs;
        const {haveScalesInput} = elements;

        this.state.hasErrors = false;

        const settings = {
            haveScales: haveScalesInput.checked
        };

        const {imageOptions, areas} = ImageOptions.values;
        settings.imageOptions = imageOptions;
        settings.areas = areas && areas.length > 0 ? areas : (areasFromSettings && areasFromSettings.length > 0 ? areasFromSettings : []);
        this.state.hasErrors = ImageOptions.raiseErrors({answers, areasFromSettings: settings.areas}) || this.state.hasErrors;

        const {answersCount, scaleOptions} = AnswerOptions.values;
        settings.answersCount = answersCount;
        if (scaleOptions) {
            settings.scaleType = scaleOptions.scaleType;
            settings.scales = scales.map((scale, index) => ({...scale, color: scaleOptions.scales[index].color}));
        }
        this.state.hasErrors = AnswerOptions.raiseErrors({areas: ImageOptions.getAreas()}) || this.state.hasErrors;

        settings.styles = Styling.values;
        this.state.hasErrors = Styling.raiseErrors() || this.state.hasErrors;

        question.saveChanges(settings, this.state.hasErrors);
    };
}
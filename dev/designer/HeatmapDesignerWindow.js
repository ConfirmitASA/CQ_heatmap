import ImageOptionsTab from "./tabs/ImageOptionsTab";
import AnswerOptionsTab from "./tabs/AnswerOptionsTab";
import StylingTab from "./tabs/StylingTab";
import MoreOptionsTab from "./tabs/MoreOptionsTab";
import Config from "../Config";
import QuestionTypesHandlerMakerForDesigner from "./QuestionTypesHandlerMakerForDesigner";
import CommonFunctionsUtil from "../CommonFunctionsUtil";
import {DEFAULT_SETTINGS} from "../Constants";

export default class HeatmapDesignerWindow {
    constructor({question}) {
        this.question = question;

        this.config = new Config();
        this.elements = this.config.elements;
        this.questionTypeHandler = new QuestionTypesHandlerMakerForDesigner({
            type: Config.questionType,
            elements: this.elements
        });

        this.state = {
            hasErrors: false,
            hasBeenCheckedForErrorsOnInit: false
        };

        this.render();
    }

    render = () => {
        const {elements, questionTypeHandler, saveChanges} = this;

        this.tabs = {
            ImageOptions: new ImageOptionsTab({elements, questionTypeHandler, saveChanges}),
            AnswerOptions: new AnswerOptionsTab({elements, questionTypeHandler, saveChanges}),
            Styling: new StylingTab({elements, questionTypeHandler, saveChanges}),
            MoreOptions: new MoreOptionsTab({elements, questionTypeHandler})
        }

        const {settingsWrapper} = elements;
        settingsWrapper.addEventListener("input", saveChanges);

        this.question.onInit = this.setValuesFromSettingsCallback;
        this.question.onSettingsReceived = this.setValuesFromSettingsCallback;

        questionTypeHandler.customizeDesignerWindowToType();
    };

    getScalesWithCurrentLanguage = ({scales}) => {
        return scales.map((scale) => {
            const currentLanguageText = scale.texts && scale.texts.find((textOptions) => textOptions.language === this.question.language);
            return {
                ...scale,
                text: currentLanguageText ? currentLanguageText.text : ""
            }
        })
    };

    getAreaTitlesWithCurrentLanguage = ({areas}) => {
        return areas.map((area) => {
            const currentLanguageTitle = area.titles && area.titles.find((titleOptions) => titleOptions.language === this.question.language);
            return {
                ...area,
                title: currentLanguageTitle ? currentLanguageTitle.title : ""
            }
        })
    };

    getTranslationsWithCurrentLanguage = ({translations}) => {
        return translations.map((translation) => {
            const currentLanguageText = translation.texts && translation.texts.find((textOptions) => textOptions.language === this.question.language);
            return {
                ...translation,
                text: currentLanguageText ? currentLanguageText.text : ""
            }
        })
    };

    setValuesFromSettingsCallback = (settings, uiSettings, questionSettings) => {
        const {tabs, elements, questionTypeHandler} = this;
        const {ImageOptions, AnswerOptions, Styling, MoreOptions} = tabs;
        const {predefinedListsInfo, activateDefaultScalesInput} = elements;
        settings = settings ? settings : DEFAULT_SETTINGS;

        if (questionSettings) {
            this.question.answers = questionSettings.answers ? questionSettings.answers : this.question.answers;
            this.question.scales = questionSettings.scales ? questionSettings.scales : this.question.scales;

            const isPredefinedListUsed = this.checkIfPredefinedListUsed({
                itemsList: questionTypeHandler.getSettingsFromEditTab({question: this.question})
            });
            CommonFunctionsUtil.toggleElementsVisibility({
                elements: [predefinedListsInfo],
                shouldBeShown: isPredefinedListUsed
            });
            this.state.hasErrors = this.state.hasErrors || isPredefinedListUsed;
        }

        if (uiSettings) {
            this.question.language = uiSettings.currentLanguage;
            this.tabs.AnswerOptions.questionScales = settings
                ? CommonFunctionsUtil.updateScales({
                    newScales: settings.scales,
                    oldScales: this.getScalesWithCurrentLanguage({scales: this.question.scales}),
                    isDefault: activateDefaultScalesInput.checked
                })
                : this.getScalesWithCurrentLanguage({scales: this.question.scales});
        }

        ImageOptions.setValues({
            values: {
                ...settings,
                areas: this.getAreaTitlesWithCurrentLanguage({areas: settings.areas})
            }
        });
        AnswerOptions.setValues({
            values: {
                ...settings,
                scales: this.getScalesWithCurrentLanguage({scales: this.question.scales})
            }
        });
        Styling.setValues({values: settings});
        MoreOptions.setValues({
            values: {
                ...settings,
                translations: this.getTranslationsWithCurrentLanguage({translations: settings.translations})
            }
        });

        if (!this.state.hasBeenCheckedForErrorsOnInit) {
            this.raiseErrors(settings.areas);
        }
        this.state.hasBeenCheckedForErrorsOnInit = true;
    };

    checkIfPredefinedListUsed = () => {
        const {question} = this;
        const {answers, scales} = question;
        return [answers, scales].reduce((isPredefinedListUsed, items) =>
            items.reduce((isPredefinedListUsedPartially, item) =>
                !item.code || isPredefinedListUsedPartially, false) || isPredefinedListUsed,
            false);
    };

    saveChanges = (areasFromSettings) => {
        const {question} = this;
        const settings = this.getSettings(areasFromSettings);
        this.raiseErrors(settings.areas);
        question.saveChanges(settings, this.state.hasErrors);
    };

    getSettings = (areasFromSettings) => {
        const {question, elements, tabs} = this;
        const {scales} = question;
        const {ImageOptions, AnswerOptions, Styling, MoreOptions} = tabs;
        const {haveScalesInput, activateDefaultScalesInput} = elements;

        const settings = {
            haveScales: haveScalesInput.checked
        };

        const {imageOptions, areas} = ImageOptions.values;
        this.setTextsForDifferentLanguages({items: areas});
        settings.imageOptions = imageOptions;
        settings.areas = areas && areas.length > 0 ? areas : (areasFromSettings && areasFromSettings.length > 0 ? areasFromSettings : []);

        const {answersCount, scaleOptions} = AnswerOptions.values;
        settings.answersCount = answersCount;
        if (scaleOptions) {
            settings.scaleType = scaleOptions.scaleType;
            settings.scales = CommonFunctionsUtil.updateScales({
                newScales: scaleOptions.scales,
                oldScales: scales,
                isDefault: activateDefaultScalesInput.checked
            });
        }

        settings.styles = Styling.values;

        const {translations} = MoreOptions.values;
        this.setTextsForDifferentLanguages({items: translations});
        settings.translations = translations;

        return settings;
    };

    raiseErrors = (areas) => {
        const {question, tabs} = this;
        const {answers, scales} = question;
        const {ImageOptions, AnswerOptions, Styling, MoreOptions} = tabs;

        this.state.hasErrors = false;

        this.state.hasErrors = ImageOptions.raiseErrors({
            answers,
            areasFromSettings: areas
        }) || this.state.hasErrors;
        if (scales && scales.length > 0) {
            this.state.hasErrors = AnswerOptions.raiseErrors({areas: ImageOptions.getAreas()}) || this.state.hasErrors;
        }
        this.state.hasErrors = Styling.raiseErrors() || this.state.hasErrors;
        this.state.hasErrors = MoreOptions.raiseErrors() || this.state.hasErrors;
    };

    setTextsForDifferentLanguages = ({items}) => {
        const {language} = this.question;

        items.forEach((item) => {
            if (item.texts) {
                const languageIndex = item.texts.findIndex((text) => text.language === language);
                if (languageIndex >= 0) {
                    item.texts[languageIndex] = {
                        language,
                        text: item.text
                    };
                } else {
                    item.texts.push({
                        language,
                        text: item.text
                    });
                }
            } else {
                item.texts = [];
                item.texts.push({
                    language,
                    text: item.text
                });
            }
        });
    }
}
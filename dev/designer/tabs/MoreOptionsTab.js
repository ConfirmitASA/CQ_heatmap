import CommonFunctionsUtil from "../../CommonFunctionsUtil";
import AbstractTab from "./AbstractTab";
import {DEFAULT_TRANSLATIONS, ELEMENTS} from "../../Constants";

export default class MoreOptionsTab extends AbstractTab {
    constructor({elements, questionTypeHandler}) {
        super({elements});
        this.questionTypeHandler = questionTypeHandler;
        this.render();
    }

    setValues = ({values}) => {
        const {questionTypeHandler, elements} = this;
        const {moreOptionsTabWrapper} = elements;
        let {translations} = values;
        translations = translations ? translations : DEFAULT_TRANSLATIONS;
        this.translations = translations;

        this.checkForTranslationsChange({translations});
        if (questionTypeHandler.shouldMoreOptionsTabBeOpened({values})) {
            CommonFunctionsUtil.toggleTab({
                elements: [moreOptionsTabWrapper]
            });
        }
    };

    checkForTranslationsChange = ({translations}) => {
        const {elements} = this;
        const {translationsWrapper} = elements;
        const translationItems = Array.prototype.slice.call(translationsWrapper.querySelectorAll(".translation-item"));
        translationItems.forEach((item) => {
            const type = item.getAttribute("translation-type");
            const textItem = item.querySelector(".translation-item__text");
            const translation = translations.find((translation) => translation.type === type);
            textItem.value = translation ? translation.text : "";
        });
    };

    get values() {
        const {elements, translations} = this;
        const {translationsWrapper} = this.elements;
        const newTranslations = [];

        const translationItems = Array.prototype.slice.call(translationsWrapper.querySelectorAll(".translation-item"));
        translationItems.forEach((item) => {
            const type = item.getAttribute("translation-type");
            const labelItem = item.querySelector(".translation-item__label");
            const textItem = item.querySelector(".translation-item__text");
            const oldTranslation = translations.find((translation) => translation.type === type);
            newTranslations.push({
                type: type ? type : "",
                label: labelItem ? labelItem.innerText : "",
                text: textItem ? textItem.value : "",
                texts: oldTranslation.texts
            });
        });

        return {translations: newTranslations};
    };

    render = () => {
        const {questionTypeHandler} = this;

        questionTypeHandler.customizeMoreOptionsTabToType();

        this.setDefaultTranslations();
    };

    setDefaultTranslations = () => {
        const {translationsWrapper} = this.elements;

        CommonFunctionsUtil.createListOfItems({
            defaultValues: DEFAULT_TRANSLATIONS,
            listWrapper: translationsWrapper,
            itemClassName: "translation-item",
            itemClass: ELEMENTS.CUSTOM.TRANSLATION_ITEM
        });
    };
}
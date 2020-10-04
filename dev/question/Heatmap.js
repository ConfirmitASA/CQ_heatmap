import {Tooltip} from "../components/Tooltip";
import ElementsMaker from "../components/ElementsMaker";
import ValidationLibrary from "./ValidationLbrary";
import QuestionTypesHandlerMakerForQuestion from "./QuestionTypesHandlerMakerForQuestion";
import CommonFunctionsUtil from "../CommonFunctionsUtil";

import {
    MIN_MAX_TYPE,
    EQUAL_TYPE,
    ELEMENTS,
    DEFAULT_LANGUAGE,
    DEFAULT_TRANSLATION_TEXT_SEPARATOR,
    TRANSLATION_TYPES
} from "../Constants";

export default class Heatmap {
    constructor({question, areas, imageOptions, styles, answersCount, haveScales, scales, translations, mobileThreshold}) {
        this.question = question;
        this.id = question.id;
        this.areas = areas;
        this.imageOptions = imageOptions;
        this.styles = styles;
        this.haveScales = haveScales;
        this.scales = scales;
        this.translations = translations;
        this.mobileThreshold = mobileThreshold;

        this.answersCount = answersCount
            ? {
                equal: answersCount.type === EQUAL_TYPE && answersCount.equal && answersCount.equal !== "0" ? answersCount.equal : "",
                max: answersCount.type === MIN_MAX_TYPE && answersCount.max && answersCount.max !== "0" ? answersCount.max : "",
                min: answersCount.type === MIN_MAX_TYPE && answersCount.min && answersCount.min !== "0" ? answersCount.min : ""
            }
            : {};

        this.questionNode = document.querySelector(`#${this.id}`);
        this.currentLanguage = Confirmit.page.surveyInfo.language;

        this.state = {
            isBackClicked: false
        };

        this.questionTypeHandler = new QuestionTypesHandlerMakerForQuestion({type: question.type});

        this.render();
    }

    render = () => {
        const {question, areas, scales} = this;
        this.questionTypeHandler.checkAnswersAndScales({question, areas, scales});

        const wrapper = this.setupWrapper();
        this.subscribeToQuestion();
        this.setDynamicStyles();

        return wrapper;
    };

    setupWrapper = () => {
        const {id, imageOptions} = this;

        const wrapper = ElementsMaker.createCustomElement({
            type: ELEMENTS.CUSTOM.IMAGE_WRAPPER,
            elementOptions: {id: `${id}-image-wrapper`, ...imageOptions}
        });
        this.setupQuestionElements({wrapper});

        this.selectPredefinedAreas();

        return wrapper;
    };

    setupQuestionElements = ({wrapper}) => {
        const {question, id, questionNode} = this;

        const text = ElementsMaker.createQuestionElement({
            type: ELEMENTS.QUESTION.TEXT,
            elementOptions: {questionId: id, text: question.text}
        });
        const instruction = ElementsMaker.createQuestionElement({
            type: ELEMENTS.QUESTION.INSTRUCTION,
            elementOptions: {questionId: id, text: question.instruction}
        });
        const errorBlock = ElementsMaker.createQuestionElement({
            type: ELEMENTS.QUESTION.ERROR_BLOCK,
            elementOptions: {questionId: id}
        });
        const questionContent = ElementsMaker.createQuestionElement({
            type: ELEMENTS.QUESTION.CONTENT,
            elementOptions: {questionId: id, children: [wrapper]}
        });

        questionNode.appendChild(text);
        questionNode.appendChild(instruction);
        questionNode.appendChild(errorBlock);
        questionNode.appendChild(questionContent);
    };

    selectPredefinedAreas = () => {
        const {areas, id} = this;
        const self = this;
        $(`#${id}-image-wrapper img`).selectAreas({
            allowEdit: false,
            allowMove: false,
            allowResize: false,
            allowSelect: false,
            allowDelete: false,
            allowNudge: false,

            outlineOpacity: 0,
            overlayOpacity: 0,
            areas: areas,

            onLoaded: function () {
                $(this).removeClass("blurred");
                self.onAreasLoaded();
            },
            onChanging: null,
            onChanged: null
        });
    };

    onAreasLoaded = () => {
        const {id} = this;
        const areaSquares = Array.prototype.slice.call(document.querySelectorAll(`#${id}-image-wrapper .select-areas-background-area`));
        areaSquares.forEach(this.createIndicatorAreaForAnswerCallback);
    };

    createIndicatorAreaForAnswerCallback = (area, index, areaSquares) => {
        const {haveScales} = this;
        const areaIndex = areaSquares.length - index;
        let areaText = this.areas[index].texts.find((textOptions) => textOptions.language === this.currentLanguage);
        areaText = areaText ? areaText.text : "";
        const indicator = this.createIndicatorNode({area, areaIndex});
        area.parentNode.insertBefore(indicator, area.nextSibling);

        if (!haveScales) {
            this.setAreaOnClick({indicator, areaIndex});
        }

        this.setExistingValues({to: "area", areaIndex});

        this.createAreaTooltip({
            title: (haveScales ? areaText : ""),
            content: (haveScales ? this.createButtonsWrapperWithAreaAttributes({areaIndex}).innerHTML : areaText),
            indicator,
            areaIndex
        });
    };

    setAreaOnClick = ({indicator, areaIndex}) => {
        indicator.addEventListener("click", () => {
            const {question} = this;
            const {values, answers, scales} = question;
            const answerCodes = answers.map(({code}) => code);
            const answerCode = answerCodes[parseInt(areaIndex) - 1];
            this.setValues({
                values: this.questionTypeHandler.handleAreaClick({
                    indicator,
                    values,
                    scales,
                    index: answerCode
                })
            });
            indicator.classList.toggle("area_chosen");
        });
    };

    createAreaTooltip = ({title, content, indicator, areaIndex}) => {
        const {id} = this;
        new Tooltip({
            id: `${id}-area-indicator-tooltip-${areaIndex}`,
            targetId: indicator.id,
            title,
            content,
            onCreated: this.onTooltipCreated.bind(this, {areaIndex, indicator})
        });
    };

    setExistingValues = ({to, areaIndex}) => {
        const {id, question, haveScales} = this;
        const {values, answers} = question;
        const code = answers[parseInt(areaIndex) - 1].code;

        if (!question.values) {
            return;
        }

        switch (to) {
            case "tooltip":
                const button = document.querySelector(`*[id^=${id}-area-indicator-tooltip-] .switch--${values[code]}[area-index="${areaIndex}"]`);
                if (button) {
                    button.click();
                }
                break;
            case "area":
                const area = document.querySelector(`#${id} .select-areas-background-area.area-indicator[area-index="${areaIndex}"]`);
                const className = haveScales ? `area_${values[code]}` : "area_chosen";
                if (area && !area.classList.contains(className) && this.questionTypeHandler.checkIfValueExists({
                    values,
                    index: code
                })) {
                    area.classList.add(className);
                }
                break;
        }
    };

    createIndicatorNode = ({area, areaIndex}) => {
        const {id} = this;
        const borderWidth = area.style.borderWidth;
        const indicator = area.cloneNode();
        indicator.id = id + `-area-indicator-${areaIndex}`;
        indicator.classList.add("area-indicator");
        Object.assign(indicator.style, {
            backgroundPositionX: (parseFloat(indicator.style.backgroundPositionX.replace("px", "")) - borderWidth) + "px",
            backgroundPositionY: (parseFloat(indicator.style.backgroundPositionY.replace("px", "")) - borderWidth) + "px",
            backgroundImage: "",
            backgroundColor: "",
            cursor: ""
        });
        indicator.setAttribute("area-index", areaIndex);

        return indicator;
    };

    createButtonsWrapperWithAreaAttributes = ({areaIndex}) => {
        const {scales, currentLanguage} = this;
        const buttonsWrapper = document.createElement("div");

        scales.forEach((option) => {
            const {code, texts} = option;
            let textWrapper = texts ? texts.find((text) => text.language === currentLanguage) : option;
            const button = ElementsMaker.createCustomElement({
                type: ELEMENTS.CUSTOM.SWITCH,
                elementOptions: {
                    modifier: code,
                    text: textWrapper && textWrapper.text ? textWrapper.text : "",
                    id: `scale-button-${code}-${areaIndex}`,
                    attributes: [{name: "area-index", value: areaIndex}]
                }
            });
            buttonsWrapper.appendChild(button);
        });

        return buttonsWrapper;
    };

    onTooltipCreated = ({areaIndex, indicator}) => {
        const {id, haveScales} = this;

        if (haveScales) {
            const {scales} = this;
            scales.forEach((option) => {
                const {code} = option;
                const button = document.querySelector(`*[id^="${id}-area-indicator-tooltip-"] .switch--${code}[area-index="${areaIndex}"]`);
                if (button) {
                    button.addEventListener("click", (e) => {
                        this.onButtonClick({code, areaIndex, indicator});
                        e.preventDefault();
                    });
                }
            });
        }

        this.setExistingValues({to: "tooltip", areaIndex});
    };

    onButtonClick = ({code, areaIndex, indicator}) => {
        const {id, scales} = this;
        const values = this.question.values;

        scales.forEach((option) => {
            const {code: currentCode} = option;
            const input = document.querySelector(`*[id^=${id}-area-indicator-tooltip-] .switch--${currentCode}[area-index="${areaIndex}"] input`);
            const answerCodes = this.question.answers.map(({code}) => code);
            const answerCode = answerCodes[parseInt(areaIndex) - 1];

            if (currentCode === code) {
                if (input.checked) {
                    delete values[answerCode];
                    input.checked = false;
                    indicator.classList.remove(`area_${currentCode}`);
                } else {
                    values[answerCode] = currentCode;
                    input.checked = true;
                    indicator.classList.add(`area_${currentCode}`);
                }
            } else {
                input.checked = false;
                indicator.classList.remove(`area_${currentCode}`);
            }
        });

        this.setValues({values});
    };

    setValues = ({values}) => {
        const {question} = this;
        this.questionTypeHandler.setValues({question, values});
    };

    subscribeToQuestion = () => {
        const {haveScales} = this;

        const validationCallback = this.getValidationCallback();

        Confirmit.page.beforeNavigateEvent.on((navigation) => {
            this.state.isBackClicked = !navigation.next;
        });

        this.question.validationEvent.on((validationResult) => {
            if (this.state.isBackClicked) {
                return;
            }

            if (this.question.values) {
                validationCallback(validationResult);

                // multi question (when !haveScales) has standard Confirmit error on "required"
                if (this.question.required && (haveScales && Object.keys(this.question.values).length !== this.question.answers.length)) {
                    const error = {message: this.getTranslations({type: TRANSLATION_TYPES.REQUIRED, values: []})};
                    validationResult.errors.push(error);
                }
            }

            this.setupErrorItems({validationResult});
        });
    };

    getValidationCallback = () => {
        const {answersCount} = this;

        const equal = parseInt(answersCount.equal);
        const min = parseInt(answersCount.min);
        const max = parseInt(answersCount.max);

        return ValidationLibrary.getQuestionValidationCallback({
            currentQuestion: this.question, validators: {
                allValues: [
                    ValidationLibrary.validationMethods.allValues.getEqualValidator({
                        equal,
                        errorMessage: this.getTranslations({type: TRANSLATION_TYPES.EQUAL, values: [equal]})
                    }),
                    ValidationLibrary.validationMethods.allValues.getMinMaxValidator({
                        min, max,
                        generalErrorMessage: this.getTranslations({type: TRANSLATION_TYPES.MINMAX, values: [min, max]}),
                        minErrorMessage: this.getTranslations({type: TRANSLATION_TYPES.MIN, values: [min]}),
                        maxErrorMessage: this.getTranslations({type: TRANSLATION_TYPES.MAX, values: [max]})
                    })
                ]
            }
        });
    };

    getTranslations = ({type, values}) => {
        const {translations, currentLanguage} = this;
        const translation = translations.find((translation) => translation.type === type);

        if (!translation || !translation.texts) return "";

        const currentLanguageText = translation.texts.find((text) => text.language === currentLanguage);
        const defaultLanguageText = translation.texts.find((text) => text.language === DEFAULT_LANGUAGE);
        let text = currentLanguageText && currentLanguageText.text ? currentLanguageText.text : (defaultLanguageText && defaultLanguageText.text ? defaultLanguageText.text : "");

        values.forEach((value) => {
            text = text.replace(DEFAULT_TRANSLATION_TEXT_SEPARATOR, value);
        });

        return text;
    };

    setupErrorItems = ({validationResult}) => {
        const {questionNode} = this;

        const errorBlock = questionNode.querySelector(".cf-question__error");
        const errorList = errorBlock.querySelector(".cf-error-list");

        errorList.innerHTML = "";

        validationResult.errors.forEach(this.addErrorItem);

        CommonFunctionsUtil.toggleClassForHTMLElement({element: questionNode, className: "cf-question--error", condition: validationResult.errors.length > 0});
        CommonFunctionsUtil.toggleClassForHTMLElement({element: errorBlock, className: "cf-error-block--bottom", condition: validationResult.errors.length > 0});
    }

    addErrorItem = ({message}) => {
        const {id} = this;
        const errorList = document.querySelector(`#${id}_error_list`);
        const errorItem = ElementsMaker.createQuestionElement({
            type: ELEMENTS.QUESTION.ERROR_ITEM,
            elementOptions: {text: message}
        });
        errorList.appendChild(errorItem);
    };

    setDynamicStyles = () => {
        const {id, scales, styles, questionNode, haveScales, mobileThreshold} = this;

        const stylesElement = document.createElement("style");
        stylesElement.innerText = "";

        // area highlighting
        if (styles) {
            if (styles.areaHighlight) {
                const {preHighlightOnMobiles, color, border} = styles.areaHighlight;
                if (color) {
                    const isTouchScreen = 'ontouchstart' in window // works on most browsers
                        || 'onmsgesturechange' in window; // works on IE10 with some false positives
                    stylesElement.innerText += `#${id} .select-areas-background-area${preHighlightOnMobiles && (window.innerWidth <= mobileThreshold || isTouchScreen) ? "" : ":hover"}` +
                        `{ background-color: ${(color ? color : "#fff")}; opacity: 0.5; }`;
                }
                if (border) {
                    stylesElement.innerText += `#${id} .select-areas-background-area { border: ${(border.width ? border.width : "0")}px solid ${(!!border.color ? border.color : "#000")}; }`;
                }
            }
        } else {
            stylesElement.innerText += `#${id} .select-areas-background-area:hover { background-color: #fff; opacity: 0.5; }`;
        }

        if (haveScales) {
            // area colors
            scales.forEach((option) => {
                const {code, color} = option;
                stylesElement.innerText += `#${id} .area_${code}{ background-color: ${color}; opacity: 0.5; }`;
                stylesElement.innerText += `*[id^=${id}-area-indicator-tooltip-] .switch--${code}{ background-color: ${color}; }`;
                stylesElement.innerText += `*[id^=${id}-area-indicator-tooltip-] .switch--${code} .switch__slider.slider .slider__input:checked + .slider__toggle:after { background-color: ${color}; }`;
            });
        } else {
            stylesElement.innerText += `#${id} .area_chosen { background-color: ${styles.areaChoose && styles.areaChoose.color ? styles.areaChoose.color : "green"} !important; opacity: 0.5; }`;
            stylesElement.innerText += `#${id} .area-indicator:hover { cursor: pointer; }`;
        }

        questionNode.appendChild(stylesElement);
    };
}
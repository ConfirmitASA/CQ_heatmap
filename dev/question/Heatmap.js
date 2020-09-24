import {Tooltip} from "../components/Tooltip";
import ElementsMaker from "../components/ElementsMaker";
import ValidationLibrary from "./ValidationLbrary";
import QuestionTypesHandlerMakerForQuestion from "./QuestionTypesHandlerMakerForQuestion";

import {MIN_MAX_TYPE, EQUAL_TYPE, ELEMENTS} from "../Constants";

export default class Heatmap {
    constructor({question, areas, imageOptions, styles, answersCount, haveScales, scales}) {
        this.question = question;
        this.id = question.id;
        this.questionNode = document.querySelector(`#${this.id}`);
        this.areas = areas;
        this.imageOptions = imageOptions;
        this.styles = styles;
        this.answersCount = answersCount
            ? {
                equal: answersCount.type === EQUAL_TYPE && answersCount.equal && answersCount.equal !== "0" ? answersCount.equal : undefined,
                max: answersCount.type === MIN_MAX_TYPE && answersCount.max && answersCount.max !== "0" ? answersCount.max : undefined,
                min: answersCount.type === MIN_MAX_TYPE && answersCount.min && answersCount.min !== "0" ? answersCount.min : undefined
            }
            : {};

        this.haveScales = haveScales;

        this.scales = scales;

        this.currentLanguage = Confirmit.page.surveyInfo.language;

        this.state = {
            isBackClicked: false
        };

        this.questionTypeHandler = new QuestionTypesHandlerMakerForQuestion({type: question.type});

        this.render();
    }

    render = () => {
        this.checkAnswersAndScales();

        const wrapper = this.setupWrapper();
        this.subscribeToQuestion();
        this.setDynamicStyles();

        return wrapper;
    };

    checkAnswersAndScales = () => {
        const {question, areas, scales} = this;
        if (areas.length !== question.answers.length) {
            throw new Error("Number of areas is not equal to number of answers");
        }
        if (scales.length !== question.scales.length) {
            throw new Error("Number of custom scales is not equal to number of question scales");
        }
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
        const areaSquares = document.querySelectorAll(`#${id}-image-wrapper .select-areas-background-area`);
        areaSquares.forEach(this.createIndicatorAreaForAnswerCallback);
    };

    createIndicatorAreaForAnswerCallback = (area, index, areaSquares) => {
        const {haveScales} = this;
        const areaIndex = areaSquares.length - index;
        const areaTitle = this.areas[index].title;
        const indicator = this.createIndicatorNode({area, areaIndex});
        area.parentNode.insertBefore(indicator, area.nextSibling);

        if (!haveScales) {
            this.setAreaOnClick({indicator, areaIndex});
        }

        this.setExistingValues({to: "area", areaIndex});

        this.createAreaTooltip({
            title: (haveScales ? areaTitle : undefined),
            content: (haveScales ? this.createButtonsWrapperWithAreaAttributes({areaIndex}).innerHTML : areaTitle),
            indicator,
            areaIndex
        });
    };

    setAreaOnClick = ({indicator, areaIndex}) => {
        indicator.addEventListener("click", () => {
            const {question} = this;
            const {values, scales} = question;
            this.setValues({values: this.questionTypeHandler.handleAreaClick({indicator, values, scales, index: areaIndex})});
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
        const {values} = question;

        if (question.values) {
            return;
        }

        switch (to) {
            case "tooltip":
                const button = document.querySelector(`*[id^=${id}-area-indicator-tooltip-] .switch--${values[areaIndex]}[area-index="${areaIndex}"]`);
                if (button) {
                    button.click();
                }
                break;
            case "area":
                const area = document.querySelector(`#${id} .select-areas-background-area.area-indicator[area-index="${areaIndex}"]`);
                const className = haveScales ? `area_${values[areaIndex]}` : "area_chosen";
                if (area && !area.classList.contains(className) && this.questionTypeHandler.checkIfValueExists({values, index: areaIndex})) {
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
            const text = texts.find((text) => text.language === currentLanguage);
            const button = ElementsMaker.createCustomElement({
                type: ELEMENTS.CUSTOM.SWITCH,
                elementOptions: {
                    modifier: code,
                    text: text ? text.text : "",
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

            if (currentCode === code) {
                if (input.checked) {
                    delete values[areaIndex];
                    input.checked = false;
                    indicator.classList.remove(`area_${currentCode}`);
                } else {
                    values[areaIndex] = currentCode;
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
                    const error = {message: "This question is required. Please select a scale for each answer."};
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
            currentQuestion: this.question, validators: [
                ValidationLibrary.validationMethods.getEqualValidator({
                    equal,
                    message: `Please select ${equal} answer${parseInt(equal) > 1 ? "s" : ""}.`
                }),
                ValidationLibrary.validationMethods.getMinMaxValidator({
                    min, max,
                    generalErrorMessage: `Please select between ${min} and ${max} answers.`,
                    minErrorMessage: `Please select at least ${min} answer${parseInt(min) > 1 ? "s" : ""}.`,
                    maxErrorMessage: `Please do not select more than ${max} answer${parseInt(max) > 1 ? "s" : ""}.`
                })
            ]
        });
    };

    setupErrorItems = ({validationResult}) => {
        const {questionNode} = this;

        const errorBlock = questionNode.querySelector(".cf-question__error");
        const errorList = errorBlock.querySelector(".cf-error-list");

        errorList.innerHTML = "";

        validationResult.errors.forEach(this.addErrorItem);

        questionNode.classList.toggle("cf-question--error", validationResult.errors.length > 0);
        errorBlock.classList.toggle("cf-error-block--bottom", validationResult.errors.length > 0);
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
        const {id, scales, styles, questionNode, haveScales} = this;

        const stylesElement = document.createElement("style");
        stylesElement.innerText = "";

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

        // area highlighting
        if (styles) {
            if (styles.areaHighlight) {
                const {color, border} = styles.areaHighlight;
                if (color) {
                    stylesElement.innerText += `#${id} .select-areas-background-area:hover { background-color: ${(color ? color : "#fff")}; opacity: 0.5; }`;
                }
                if (border) {
                    stylesElement.innerText += `#${id} .select-areas-background-area { border: ${(border.width ? border.width : "0")}px solid ${(border.color ? border.color : "#000")}; }`;
                }
            }
        } else {
            stylesElement.innerText += `#${id} .select-areas-background-area:hover { background-color: #fff; opacity: 0.5; }`;
        }

        questionNode.appendChild(stylesElement);
    };
}
import {ImageWrapper} from "../components/ImageWrapper";
import {Switch} from "../components/Switch";
import {Tooltip} from "../components/Tooltip";
import {ErrorBlock} from "../components/standard question/ErrorBlock";
import {ErrorItem} from "../components/standard question/ErrorItem";

export default class Heatmap {
    constructor({question, areas, imageOptions, styles, answersCount, haveScales, scaleType, customScales}) {
        this.question = question;
        this.id = question.id;
        this.questionNode = document.querySelector(`#${this.id}`);
        this.areas = areas;
        this.imageOptions = imageOptions;
        this.styles = styles;
        this.answersCount = answersCount
            ? {
                equal: answersCount.type === "equal" && answersCount.equal && answersCount.equal !== "0" ? answersCount.equal : undefined,
                max: answersCount.type === "min-max" && answersCount.max && answersCount.max !== "0" ? answersCount.max : undefined,
                min: answersCount.type === "min-max" && answersCount.min && answersCount.min !== "0" ? answersCount.min : undefined
            }
            : {};

        this.haveScales = haveScales;
        const defaultScales = [
            {
                type: "positive",
                label: "Positive",
                color: "green"
            },
            {
                type: "neutral",
                label: "Neutral",
                color: "#aaa"
            },
            {
                type: "negative",
                label: "Negative",
                color: "red"
            }
        ];
        this.customScales = (scaleType === "custom" && customScales) ? customScales : defaultScales;

        this.init();
    }

    init = () => {
        const wrapper = this.render();
        this.subscribeToQuestion();
        this.setDynamicStyles();

        return wrapper;
    };

    render = () => {
        const wrapper = this.createImageWrapper();
        this.selectPredefinedAreas();

        return wrapper;
    };

    createImageWrapper = () => {
        const {id, questionNode, imageOptions} = this;

        const wrapper = new ImageWrapper({id: id + "-image-wrapper", imageOptions});
        questionNode.appendChild(wrapper);

        return wrapper;
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

            // callbacks
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
        areaSquares.forEach(this.createIndicatorAreaForAnswer);
    };

    createIndicatorAreaForAnswer = (area, index, areaSquares) => {
        const {id, question, haveScales} = this;
        const areaIndex = areaSquares.length - index;
        const areaTitle = this.areas[index].title;
        const indicator = this.createIndicatorNode({area, areaIndex});
        area.parentNode.insertBefore(indicator, area.nextSibling);

        if (!haveScales) {
            this.setAreaOnClick(haveScales, indicator, areaIndex);
        }

        if (question.values) {
            this.setExistingValues({to: "area", areaIndex});
        }

        this.createAreaTooltip({
            title: (haveScales ? areaTitle : undefined),
            content: (haveScales ? this.createButtonsWrapperWithAreaAttributes({areaIndex}).innerHTML : areaTitle),
            indicator,
            areaIndex
        });
    };

    setAreaOnClick = ({indicator, areaIndex}) => {
        indicator.addEventListener("click", () => {
            const values = this.question.values;
            const areaArrayIndex = values.indexOf(areaIndex.toString());
            if (indicator.classList.contains("area_chosen")) {
                if (areaArrayIndex >= 0) {
                    values.splice(areaArrayIndex, 1);
                }
                this.setValues({values});
            } else {
                if (areaArrayIndex < 0) {
                    values.push(areaIndex);
                }
                this.setValues({values});
            }
            indicator.classList.toggle("area_chosen");
        });
    }

    createAreaTooltip = ({title, content, indicator, areaIndex}) => {
        const tooltip = new Tooltip({
            id: `${id}-area-indicator-tooltip-${areaIndex}`,
            targetId: indicator.id,
            title,
            content,
            onCreated: this.onTooltipCreated.bind(this, {areaIndex, indicator})
        });
    }

    setExistingValues = ({to, areaIndex}) => {
        const {question, haveScales} = this;
        const {values} = question;

        switch (to) {
            case "tooltip":
                const button = document.querySelector(`.switch-wrapper-${values[areaIndex]}[area-index="${areaIndex}"]`);
                if (button) {
                    button.click();
                }
                break;
            case "area":
            default:
                const area = document.querySelector(`.select-areas-background-area.area-indicator[area-index="${areaIndex}"]`);
                const className = haveScales ? `area_${values[areaIndex]}` : "area_chosen";
                if (area && !area.classList.contains(className) &&
                    (!haveScales && values.indexOf(areaIndex.toString()) >= 0 || haveScales && values[areaIndex])) {
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
        const {customScales} = this;
        const buttonsWrapper = document.createElement("div");

        customScales.forEach((option) => {
            const {type, label} = option;
            const button = new Switch({type, text: label, id: `scale-button-${type}-${areaIndex}`});
            button.setAttribute("area-index", areaIndex);
            buttonsWrapper.appendChild(button);
        });

        return buttonsWrapper;
    };

    onTooltipCreated = ({areaIndex, indicator}) => {
        const {question, haveScales} = this;

        if (haveScales) {
            const {customScales} = this;
            customScales.forEach((option) => {
                const {type} = option;
                const button = document.querySelector(`.switch-wrapper-${type}[area-index="${areaIndex}"]`);
                if (button) {
                    button.addEventListener("click", (e) => {
                        this.onButtonClick({type, areaIndex, indicator});
                        e.preventDefault();
                    });
                }
            });
        }

        if (question.values) {
            this.setExistingValues({to: "tooltip", areaIndex});
        }
    };

    onButtonClick = ({type, areaIndex, indicator}) => {
        const {customScales} = this;
        const values = this.question.values;

        customScales.forEach((option) => {
            const {type: currentType} = option;
            const input = document.querySelector(`.switch-wrapper-${currentType}[area-index="${areaIndex}"] input`);

            if (currentType === type) {
                if (input.checked) {
                    delete values[areaIndex];
                    input.checked = false;
                    indicator.classList.remove(`area_${currentType}`);
                } else {
                    values[areaIndex] = currentType;
                    input.checked = true;
                    indicator.classList.add(`area_${currentType}`);
                }
            } else {
                input.checked = false;
                indicator.classList.remove(`area_${currentType}`);
            }
        });

        this.setValues({values});
    };

    setValues = ({values}) => {
        const allValues = this.question.values;
        if (this.haveScales) {
            this.question.answers.forEach(({code}) => {
                allValues[code] = undefined;
            });
            Object.keys(values).forEach((key) => {
                allValues[key] = values[key];
            });
            Object.keys(allValues).forEach((key) => {
                this.question.setValue(key, allValues[key]);
            });
        } else {
            this.question.answers.forEach(({code}) => {
                this.question.setValue(code, 0);
            });
            values.forEach((code) => {
                this.question.setValue(code, 1);
            });
        }
    };

    subscribeToQuestion = () => {
        const {questionNode, answersCount, haveScales} = this;

        const errorBlock = this.addErrorBlock();
        const errorList = errorBlock.querySelector(".cf-error-list");

        this.question.validationEvent.on((validationResult) => {
            const valuesCount = Object.keys(this.question.values).length;
            const equal = parseInt(answersCount.equal);
            const min = parseInt(answersCount.min);
            const max = parseInt(answersCount.max);

            errorList.innerHTML = "";

            if (this.question.values) {
                if (equal && valuesCount !== equal) {
                    const error = {message: `Please provide exactly ${equal} answer(s)`};
                    validationResult.errors.push(error);
                }
                if (min && valuesCount < min) {
                    const error = {message: `Please provide at least ${min} answer(s)`};
                    validationResult.errors.push(error);
                }
                if (max && valuesCount > max) {
                    const error = {message: `Please provide less than ${max} answer(s)`};
                    validationResult.errors.push(error);
                }
                if (this.question.required && (haveScales && Object.keys(this.question.values).length !== this.question.answers.length || !haveScales && this.question.values.length === this.question.answers.length)) {
                    const error = {message: `This question is required. ${haveScales ? "Please choose scale for every answer" : "Please provide at least 1 answer"}`};
                    validationResult.errors.push(error);
                }
                validationResult.errors.forEach(this.addErrorItem);
                if (validationResult.errors.length > 0) {
                    questionNode.classList.add("cf-question--error");
                } else {
                    questionNode.classList.remove("cf-question--error");
                }
            }
        });
    };

    addErrorBlock = () => {
        const {id} = this;
        const imageWrapper = document.querySelector(`#${id}-image-wrapper`);
        const errorBlock = new ErrorBlock({id});
        imageWrapper.parentNode.insertBefore(errorBlock, imageWrapper);
        return errorBlock;
    };

    addErrorItem = ({message}) => {
        const {id} = this;
        const errorList = document.querySelector(`#${id}_error_list`);
        const errorItem = new ErrorItem({message});
        errorList.appendChild(errorItem);
    };

    setDynamicStyles = () => {
        const {customScales, styles, questionNode, haveScales} = this;

        const stylesElement = document.createElement("style");
        stylesElement.innerText = "";

        if (haveScales) {
            // area colors
            customScales.forEach((option) => {
                const {type, color} = option;
                stylesElement.innerText += `.area_${type}{ background-color: ${color}; opacity: 0.5; }`;
                stylesElement.innerText += `.switch-wrapper-${type}{ background-color: ${color}; }`;
                stylesElement.innerText += `.switch-wrapper-${type} .switch-input:checked + .switch-label:after { background-color: ${color}; }`;
            });
        } else {
            stylesElement.innerText += `.area_chosen { background-color: ${styles.areaChoose && styles.areaChoose.color ? styles.areaChoose.color : "green"} !important; opacity: 0.5; }`;
            stylesElement.innerText += ".area-indicator:hover { cursor: pointer; }";
        }

        // area highlighting
        if (styles) {
            if (styles.areaHighlight) {
                const {color, border} = styles.areaHighlight;
                if (color) {
                    stylesElement.innerText += `.select-areas-background-area:hover { background-color: ${(color ? color : "#fff")}opacity: 0.5; }`;
                }
                if (border) {
                    stylesElement.innerText += `.select-areas-background-area { border: ${(border.width ? border.width : "1")}px solid ${(border.color ? border.color : "#000")}; }`;
                }
            }
        } else {
            stylesElement.innerText += ".select-areas-background-area:hover { background-color: #fff; opacity: 0.5; }";
        }

        questionNode.appendChild(stylesElement);
    };
}
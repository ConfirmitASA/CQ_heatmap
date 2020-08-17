import {ImageWrapper} from "./components/ImageWrapper";
import {Switch} from "./components/Switch";
import {Tooltip} from "./components/Tooltip";

class Heatmap {
    constructor({question, areas, imageOptions, buttonOptions, styles, answersCount, haveScales}) {
        this.question = question;
        this.id = question.id;
        this.questionNode = document.querySelector("#" + this.id);
        this.areas = areas;
        this.imageOptions = imageOptions;
        this.styles = styles;
        this.answersCount = answersCount ? answersCount : {
            min: 1
        };
        this.haveScales = haveScales;

        this.buttonOptions = buttonOptions ? buttonOptions : [
            {
                type: "positive",
                text: "Positive",
                color: "green"
            },
            {
                type: "neutral",
                text: "Neutral",
                color: "#aaa"
            },
            {
                type: "negative",
                text: "Negative",
                color: "red"
            }
        ];

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
        $("#" + id + "-image-wrapper img").selectAreas({
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
        const areaSquares = document.querySelectorAll("#" + id + "-image-wrapper .select-areas-background-area");
        areaSquares.forEach(this.createIndicatorAreaForAnswer);
    };

    createIndicatorAreaForAnswer = (area, index, areaSquares) => {
        const areaIndex = areaSquares.length - index;
        const {id, haveScales} = this;
        const indicator = this.createIndicatorNode({area, areaIndex});
        area.parentNode.insertBefore(indicator, area.nextSibling);

        const tooltip = new Tooltip({
            id: id + '-area-indicator-tooltip-' + areaIndex,
            targetId: indicator.id,
            title: !haveScales ? "Food" : "",
            content: haveScales ? this.createButtonsWrapperWithAreaAttributes({areaIndex}).innerHTML : "",
            onCreated: this.onTooltipCreated.bind(this, {areaIndex, indicator})
        });
    };

    createIndicatorNode = ({area, areaIndex}) => {
        const {id} = this;
        const borderWidth = area.style.borderWidth;
        const indicator = area.cloneNode();
        indicator.id = id + "-area-indicator-" + areaIndex;
        indicator.classList.add("area-indicator");
        Object.assign(indicator.style, {
            backgroundPositionX: (parseFloat(indicator.style.backgroundPositionX.replace("px", "")) - borderWidth) + "px",
            backgroundPositionY: (parseFloat(indicator.style.backgroundPositionY.replace("px", "")) - borderWidth) + "px",
            backgroundImage: "",
            backgroundColor: ""
        });
        indicator.setAttribute("area-index", areaIndex);

        return indicator;
    };

    createButtonsWrapperWithAreaAttributes = ({areaIndex}) => {
        const {buttonOptions} = this;
        const buttonsWrapper = document.createElement("div");

        buttonOptions.forEach((option) => {
            const {type, text} = option;
            const button = new Switch({type, text});
            button.setAttribute("area-index", areaIndex);
            buttonsWrapper.appendChild(button);
        });

        return buttonsWrapper;
    };

    onTooltipCreated = ({areaIndex, indicator}) => {
        const {haveScales} = this;

        if (haveScales) {
            const {buttonOptions} = this;
            buttonOptions.forEach((option) => {
                const {type} = option;
                const button = document.querySelector('.switch-wrapper-' + type + '[area-index="' + areaIndex + '"]');
                if (button) {
                    button.addEventListener("click", (e) => {
                        this.onButtonClick({type, areaIndex, indicator});
                        e.preventDefault();
                    });
                }
            });
        } else {
            const {question} = this;
            const {values: questionValues} = question;
            indicator.addEventListener("click", () => {
                if (indicator.classList.contains("area_chosen")) {
                    indicator.classList.remove("area_chosen");
                    questionValues[areaIndex] = undefined;
                    this.setValues({question, values: questionValues});
                } else {
                    indicator.classList.add("area_chosen");
                    questionValues[areaIndex] = "1";
                    this.setValues({question, values: questionValues});
                }
            });
        }
    };

    onButtonClick = ({type, areaIndex, indicator}) => {
        const {question, buttonOptions} = this;
        const {values: questionValues} = question;

        const values = questionValues
            ? questionValues
            : {};

        buttonOptions.forEach((option) => {
            const {type: currentType} = option;
            const input = document.querySelector('.switch-wrapper-' + currentType + '[area-index="' + areaIndex + '"] input');

            if (currentType === type) {
                if (input.checked) {
                    values[areaIndex] = undefined;
                    input.checked = false;
                    if (indicator.classList.contains("area_" + currentType)) {
                        indicator.classList.remove("area_" + currentType);
                    }
                } else {
                    values[areaIndex] = currentType;
                    input.checked = true;
                    if (!indicator.classList.contains("area_" + currentType)) {
                        indicator.classList.add("area_" + currentType);
                    }
                }
            } else {
                input.checked = false;
                if (indicator.classList.contains("area_" + currentType)) {
                    indicator.classList.remove("area_" + currentType);
                }
            }
        });

        this.setValues({question, values});
    };

    setValues = ({question, values}) => {
        Object.keys(values).forEach((areaIndex) => {
            if (values[areaIndex]) {
                question.setValue(areaIndex, values[areaIndex]);
            }
        });
    };

    subscribeToQuestion = () => {
        const {question, answersCount} = this;
        const {values} = question;
        question.validationEvent.on(function (validationResult) {
            const valuesCount = Object.keys(values).length;
            if (!values || valuesCount <= 0) {
                const error = {message: 'Please provide at least one answer'};
                validationResult.errors.push(error);
            } else {
                if (answersCount.min && valuesCount < answersCount.min) {
                    const error = {message: 'Please provide at least ' + answersCount.min + ' answer(s)'};
                    validationResult.errors.push(error);
                }
                if (answersCount.max && valuesCount > answersCount.max) {
                    const error = {message: 'Please provide less than ' + answersCount.max + ' answer(s)'};
                    validationResult.errors.push(error);
                }
            }
        });
    };

    setDynamicStyles = () => {
        const {buttonOptions, styles, questionNode, haveScales} = this;

        const stylesElement = document.createElement("style");
        stylesElement.innerText = "";

        if (haveScales) {
            // area colors
            buttonOptions.forEach((option) => {
                const {type, color} = option;
                stylesElement.innerText += ".area_" + type + "{ background-color: " + color + "; opacity: 0.5; }";
                stylesElement.innerText += ".switch-wrapper-" + type + "{ background-color: " + color + "; }";
                stylesElement.innerText += ".switch-wrapper-" + type + " input:checked + .slider:before { background-color: " + color + "; }";
            });
        } else {
            stylesElement.innerText += ".area_chosen { background-color: green; opacity: 0.5; }";
        }

        // area highlighting
        if (styles) {
            const {emptyAreaHoverColor, borderWidth} = styles;
            if (!styles.borderWidth) {
                stylesElement.innerText += ".select-areas-background-area:hover { background-color: " + (emptyAreaHoverColor ? emptyAreaHoverColor : "#fff") + "; opacity: 0.5; }";
            } else {
                stylesElement.innerText += ".select-areas-background-area { border: " + borderWidth + "px solid black; }";
            }
        } else {
            stylesElement.innerText += ".select-areas-background-area:hover { background-color: #fff; opacity: 0.5; }";
        }

        questionNode.appendChild(stylesElement);
    };
}

export default Heatmap;
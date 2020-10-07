import ElementsMaker from "./components/ElementsMaker";

const CommonFunctionsUtil = {
    toggleClassForHTMLElement: ({element, className, condition}) => {
        if (condition) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    },

    toggleElementsVisibility: ({elements, shouldBeShown}) => {
        elements.forEach((element) => CommonFunctionsUtil.toggleClassForHTMLElement({element, className: "hidden", condition: !shouldBeShown}));
    },

    toggleElementsDisabling: ({elements, shouldBeDisabled}) => {
        elements.forEach((element) => {
            element.disabled = !!shouldBeDisabled;
        });
    },

    createListOfItems: ({defaultValues, itemsExpectedCount, listWrapper, itemClassName, itemClass, onInputChange, onClick, shouldNumberAsLabelBeAdded}) => {
        const count = defaultValues ? defaultValues.length : itemsExpectedCount;
        const existingItems = Array.prototype.slice.call(listWrapper.querySelectorAll(`.${itemClassName}`));

        if (existingItems.length === count) {
            return;
        }

        if (existingItems.length < count) {
            for (let i = 1; i <= count - existingItems.length; i++) {
                listWrapper.appendChild(ElementsMaker.createCustomElement({
                    type: itemClass,
                    elementOptions: {
                        id: `${itemClassName}${existingItems.length + i}`,
                        events: [
                            {type: "input", callback: onInputChange},
                            {type: "click", callback: onClick},
                        ],
                        value: defaultValues ? defaultValues[i - 1] : "",
                        text: shouldNumberAsLabelBeAdded ? (existingItems.length + i) : ""
                    }
                }));
            }
        } else {
            existingItems.forEach((item, index) => {
                if (index + 1 > count) {
                    item.remove();
                }
            });
        }
    },

    getInputWrapper: ({input, level}) => {
        let result = input;
        for (let i = 0; i < (level ? level : 2); i++) {
            result = result.parentNode;
        }
        return result;
    },

    toggleTab: ({elements}) => {
        elements.forEach((element) => element.classList.remove("comd-panel--collapsed"));
    },

    correctValueToMinMaxInInput: ({input, value}) => {
        let currentValue = value ? value : input.value;
        const intValue = parseInt(currentValue);
        const intMin = parseInt(input.min);
        const intMax = parseInt(input.max);

        currentValue = !input.min || !currentValue || isNaN(intMin)  || intValue > intMin ? currentValue : input.min;
        currentValue = !input.max || !currentValue || isNaN(intMax) || intValue < intMax ? currentValue : input.max;

        return currentValue;
    },

    checkIfValueIsPositiveNumber: ({code, min, max}) => {
        return code >= 48 + (min ? min : 0) && code <= (max ? max : 9);
    },

    removeMathSignsFromPositiveIntCallback: (e) => {
        //e.target.value = e.target.value.replace(/\D+/g, '');
        return e.target.value;
    },

    updateScales: ({newScales, oldScales, isDefault}) => {
        return oldScales.map((scale) => {
            const newScale = newScales && newScales.length > 0 && newScales.find((s) => s.code && scale.code && s.code.toString() === scale.code.toString());
            return !isDefault ? {...scale, color: newScale ? newScale.color : (scale.color ? scale.color : "#000000")} : (newScale ? newScale : scale);
        });
    }
}

export default CommonFunctionsUtil;
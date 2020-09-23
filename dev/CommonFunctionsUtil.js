import ElementsMaker from "./components/ElementsMaker";

const CommonFunctionsUtil = {
    toggleElementsVisibility: ({elements, shouldBeShown}) => {
        elements.forEach((element) => {
            element.classList.toggle("hidden", !shouldBeShown);
        });
    },

    toggleElementsDisabling: ({elements, shouldBeDisabled}) => {
        elements.forEach((element) => {
            element.disabled = !!shouldBeDisabled;
        });
    },

    createListOfItems: ({defaultValues, itemsExpectedCount, listWrapper, itemClassName, itemClass, onInputChange, onClick, shouldNumberAsLabelBeAdded}) => {
        const count = defaultValues ? defaultValues.length : itemsExpectedCount;
        const existingItems = listWrapper.querySelectorAll(`.${itemClassName}`);

        if (existingItems.length === count) {
            return;
        }

        if (existingItems.length < count) {
            for (let i = 1; i <= count - existingItems.length; i++) {
                listWrapper.appendChild(ElementsMaker.createCustomElement({
                    type: itemClass, elementOptions: {
                        id: `${itemClassName}${existingItems.length + i}`,
                        events: [
                            {type: "input", callback: onInputChange},
                            {type: "click", callback: onClick},
                        ],
                        value: defaultValues ? defaultValues[i - 1] : undefined,
                        text: shouldNumberAsLabelBeAdded ? (existingItems.length + i) : undefined
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

        currentValue = !input.min || !currentValue || parseInt(currentValue) > parseInt(input.min) ? currentValue : input.min;
        currentValue = !input.max || !currentValue || parseInt(currentValue) < parseInt(input.max) ? currentValue : input.max;

        return currentValue;
    },

    checkIfValueIsPositiveNumber: ({code, min, max}) => {
        return code >= 48 + (min ? min : 0) && code <= (max ? max : 9);
    },

    removeMathSignsFromPositiveIntCallback: (e) => {
        e.target.value = e.target.value.replace(/\D+/g, '');
        return e.target.value;
    }
}

export default CommonFunctionsUtil;
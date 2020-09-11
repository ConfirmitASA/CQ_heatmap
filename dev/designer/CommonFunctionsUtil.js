export default class CommonFunctionsUtil {
    static toggleElementsVisibility = ({elements, shouldBeShown}) => {
        elements.forEach((element) => {
            element.style.display = shouldBeShown ? "" : "none";
        });
    };

    static toggleElementsDisabling = ({elements, shouldBeDisabled}) => {
        elements.forEach((element) => {
            element.disabled = !!shouldBeDisabled;
        });
    };

    static createListOfItems = ({defaultValues, itemsExpectedCount, listWrapper, itemClassName, itemClass, onInputChange, onClick, shouldNumberAsLabelBeAdded}) => {
        const count = defaultValues ? defaultValues.length : itemsExpectedCount;
        const existingItems = listWrapper.querySelectorAll(`.${itemClassName}`);

        if (existingItems.length === count) {
            return;
        }

        if (existingItems.length < count) {
            for (let i = 1; i <= count - existingItems.length; i++) {
                listWrapper.appendChild(new itemClass({
                    id: `${itemClassName}${existingItems.length + i}`,
                    onInputChange,
                    onClick,
                    defaultValue: defaultValues ? defaultValues[i - 1] : undefined,
                    labelText: shouldNumberAsLabelBeAdded ? (existingItems.length + i) : undefined
                }));
            }
        } else {
            existingItems.forEach((item, index) => {
                if (index + 1 > count) {
                    item.remove();
                }
            });
        }
    };

    static getInputWrapper = ({input, level}) => {
        let result = input;
        for (let i = 0; i < (level ? level : 2); i++) {
            result = result.parentNode;
        }
        return result;
    };

    static toggleTab = ({elements}) => {
        elements.forEach((element) => element.classList.remove("comd-panel--collapsed"));
    };

    static correctValueToMinMaxInInput = ({input, value}) => {
        let currentValue = value ? value : input.value;

        currentValue = !input.min || !currentValue || parseInt(currentValue) > parseInt(input.min) ? currentValue : input.min;
        currentValue = !input.max || !currentValue || parseInt(currentValue) < parseInt(input.max) ? currentValue : input.max;

        return currentValue;
    };
}
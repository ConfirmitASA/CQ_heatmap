export const InputWrapper = ({id, wrapperClass, components}) => {
    const createWrapper = ({id, wrapperClass}) => {
        const wrapper = document.createElement("tr");
        wrapper.classList.add(wrapperClass);
        wrapper.classList.add("inputlist__item");
        wrapper.id = id;
        return wrapper;
    };

    const createComponent = ({tag, classes, inputType, onInputChange, inputDefaultValue, labelText}) => {
        const column = document.createElement("td");
        column.classList.add("inputlist__column");

        const component = document.createElement(tag);
        classes.length > 0 && component.classList.add(...classes);
        switch (tag) {
            case "input":
                component.type = inputType;
                component.addEventListener('change', onInputChange);
                if (inputDefaultValue) {
                    component.value = inputDefaultValue;
                }
                break;
            case "label":
                if (labelText) {
                    component.innerText = labelText;
                }
                break;
        }

        column.appendChild(component);

        return column;
    };

    const wrapper = createWrapper({id, wrapperClass});

    components.forEach((options) => {
        const {tag, classes, inputType, onInputChange, inputDefaultValue, labelText} = options;
        const component = createComponent({tag, classes, inputType, onInputChange, inputDefaultValue, labelText});
        wrapper.appendChild(component);
    });

    return wrapper;
};
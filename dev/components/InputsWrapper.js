export const InputsWrapper = ({id, wrapperClass, inputs, gridTemplateColumns}) => {
    const createWrapper = ({id, wrapperClass, gridTemplateColumns}) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add(wrapperClass);
        wrapper.classList.add("node-input-area");
        wrapper.id = id;
        wrapper.style.gridTemplateColumns = gridTemplateColumns;
        return wrapper;
    };

    // const createDeleteButton = () => {
    //     const button = document.createElement("button");
    //     button.classList.add("sd-temp-icon-button");
    //     button.classList.add("custom-scale-item__delete");
    //     button.style.paddingTop = "4px";
    //     button.innerHTML = `
    //         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="answerlist__btn-delete-answer-icon" fill="rgba(18, 24, 33, 0.6)">
    //             <path d="M7.91 23.45h9.82c.53 0 1.64-1.16 1.64-3.27v-13H4.64v13a2.93 2.93 0 0 0 3.27 3.27zm8.18-21.27L14.45.55H9.54L7.91 2.18H3v3.24h18V2.18z"></path>
    //         </svg>
    //     `;
    //     button.addEventListener('click', onDeleteButtonClick);
    //     return button;
    // };

    const createLabel = ({text}) => {
        const label = document.createElement("label");
        label.classList.add("node-input-area__label");
        label.classList.add("sd-label");
        label.innerText = text;
        return label;
    };

    const createInput = ({sizeClass, wrapperClass, type, onInputsChange}) => {
        const input = document.createElement("input");
        input.classList.add("node-input-area__input");
        input.classList.add("form-control");
        input.classList.add("form-input");
        input.classList.add(wrapperClass);
        input.classList.add(sizeClass);
        input.type = type;
        input.addEventListener('change', onInputsChange);
        return input;
    };

    // const onDeleteButtonClick = () => {
    //     wrapper.remove();
    // };

    const wrapper = createWrapper({id, wrapperClass, gridTemplateColumns});

    // const button = createDeleteButton();
    // wrapper.appendChild(button);

    inputs.forEach((inputOptions) => {
        const {sizeClass, wrapperClass, type, onInputsChange, defaultValue, labelText} = inputOptions;
        const input = createInput({sizeClass, wrapperClass, type, onInputsChange});

        if (defaultValue) {
            input.value = defaultValue;
        }

        if (labelText) {
            const label = createLabel({text: labelText});
            wrapper.appendChild(label);
        }

        wrapper.appendChild(input);
    });

    return wrapper;
};
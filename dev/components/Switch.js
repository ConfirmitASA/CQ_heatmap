export const Switch = ({type, text, id}) => {
    const createSwitchWrapper = ({type, text}) => {
        const switchWrapper = document.createElement("div");
        switchWrapper.classList.add("switch-wrapper");
        switchWrapper.classList.add(`switch-wrapper-${type}`);
        switchWrapper.appendChild(createSwitch({type, text, id}));
        switchWrapper.appendChild(createSwitchLabel({text}));
        return switchWrapper;
    };

    const createSwitch = ({type, text, id}) => {
        const switchNode = document.createElement("div");
        switchNode.classList.add("switch");
        switchNode.appendChild(createSwitchInput({id}));
        switchNode.appendChild(createSlider({type, id}));
        if (!text) {
            switchNode.style.marginRight = "0";
        }
        return switchNode;
    };

    const createSwitchInput = ({id}) => {
        const switchInput = document.createElement("input");
        switchInput.type = "checkbox";
        switchInput.classList.add("switch-input");
        switchInput.id = id;
        return switchInput;
    };

    const createSlider = ({type, id}) => {
        const slider = document.createElement("label");
        slider.classList.add("switch-label");
        slider.classList.add(`button-${type}`);
        slider.setAttribute("for", id);
        return slider;
    };

    const createSwitchLabel = ({text}) => {
        const switchLabel = document.createElement("label");
        switchLabel.classList.add("switch-text");
        if (text) {
            switchLabel.innerText = text;
        } else {
            switchLabel.style.display = "none";
        }
        return switchLabel;
    };

    return createSwitchWrapper({type, text});
};
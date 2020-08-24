export const Switch = ({type, text}) => {
    const createSwitchWrapper = ({type, text}) => {
        const switchWrapper = document.createElement("div");
        switchWrapper.classList.add("switch-wrapper");
        switchWrapper.classList.add("switch-wrapper-" + type);
        switchWrapper.appendChild(createSwitch({type, text}));
        switchWrapper.appendChild(createSwitchLabel({text}));
        return switchWrapper;
    };

    const createSwitch = ({type, text}) => {
        const switchNode = document.createElement("label");
        switchNode.classList.add("switch");
        switchNode.appendChild(createSwitchInput());
        switchNode.appendChild(createSlider({type}));
        if (!text) {
            switchNode.style.marginRight = "0";
        }
        return switchNode;
    };

    const createSwitchInput = () => {
        const switchInput = document.createElement("input");
        switchInput.type = "checkbox";
        return switchInput;
    };

    const createSlider = ({type}) => {
        const slider = document.createElement("span");
        slider.classList.add("slider");
        slider.classList.add("round");
        slider.classList.add("button-" + type);
        return slider;
    };

    const createSwitchLabel = ({text}) => {
        const switchLabel = document.createElement("label");
        switchLabel.classList.add("switch-label");
        if (text) {
            switchLabel.innerText = text;
        } else {
            switchLabel.style.display = "none";
        }
        return switchLabel;
    };

    return createSwitchWrapper({type, text});
};
export const Switch = ({type, text, onClick}) => {
    function createSwitchWrapper({type, text}) {
        const switchWrapper = document.createElement("div");
        switchWrapper.classList.add("switch-wrapper");
        switchWrapper.classList.add("switch-wrapper-" + type);
        switchWrapper.appendChild(createSwitch({type}));
        switchWrapper.appendChild(createSwitchLabel({text}));
        return switchWrapper;
    }

    function createSwitch({type}) {
        const switchNode = document.createElement("label");
        switchNode.classList.add("switch");
        switchNode.appendChild(createSwitchInput());
        switchNode.appendChild(createSlider({type}));
        return switchNode;
    }

    function createSwitchInput() {
        const switchInput = document.createElement("input");
        switchInput.type = "checkbox";
        return switchInput;
    }

    function createSlider({type}) {
        const slider = document.createElement("span");
        slider.classList.add("slider");
        slider.classList.add("round");
        slider.classList.add("button-" + type);
        return slider;
    }

    function createSwitchLabel({text}) {
        const switchLabel = document.createElement("label");
        switchLabel.classList.add("switch-label");
        switchLabel.innerText = text;
        return switchLabel;
    }

    return createSwitchWrapper({type, text});
};
import {InputWrapper} from "./InputWrapper";

export const AreaTextItem = ({id, onInputChange, onClick, defaultValue, labelText}) => {
    const components = [
        {
            tag: "label",
            classes: [],
            labelText,
            onClick
        },
        {
            tag: "input",
            classes: ["area-text-item__text", "form-input", "form-input--40ch"],
            inputType: "text",
            onInputChange,
            onClick,
            inputDefaultValue: defaultValue
        }
    ];

    return new InputWrapper({id, wrapperClass: "area-text-item", components});
};
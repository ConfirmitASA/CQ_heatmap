import {InputWrapper} from "./InputWrapper";

export const AreaTextItem = ({id, onInputChange, defaultValue, labelText}) => {
    const components = [
        {
            tag: "label",
            classes: [],
            labelText
        },
        {
            tag: "input",
            classes: ["area-text-item__text", "form-input", "form-input--40ch"],
            inputType: "text",
            onInputChange,
            inputDefaultValue: defaultValue
        }
    ];

    return new InputWrapper({id, wrapperClass: "area-text-item", components});
};
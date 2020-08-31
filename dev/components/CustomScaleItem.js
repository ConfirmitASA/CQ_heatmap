import {InputWrapper} from "./InputWrapper";

export const CustomScaleItem = ({id, onInputChange, defaultValue}) => {
    const components = [
        {
            tag: "input",
            classes: ["custom-scale-item__color", "form-input", "form-input--2ch"],
            inputType: "color",
            onInputChange,
            inputDefaultValue: defaultValue ? defaultValue.color : undefined
        },
        {
            tag: "input",
            classes: ["custom-scale-item__code", "form-input", "form-input--8ch"],
            inputType: "text",
            onInputChange,
            inputDefaultValue: defaultValue ? defaultValue.code : undefined
        },
        {
            tag: "input",
            classes: ["custom-scale-item__label", "form-input", "form-input--40ch"],
            inputType: "text",
            onInputChange,
            inputDefaultValue: defaultValue ? defaultValue.label : undefined
        }
    ];

    return new InputWrapper({id, wrapperClass: "custom-scale-item", components});
};
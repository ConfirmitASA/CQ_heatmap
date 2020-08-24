import {InputsWrapper} from "./InputsWrapper";

export const CustomScaleItem = ({id, onInputsChange, defaultValue}) => {
    const inputs = [
        {
            wrapperClass: "custom-scale-item__color",
            sizeClass: "form-input--2ch",
            type: "color",
            onInputsChange,
            defaultValue: defaultValue ? defaultValue.color : undefined
        },
        {
            wrapperClass: "custom-scale-item__code",
            sizeClass: "form-input--8ch",
            type: "text",
            onInputsChange,
            defaultValue: defaultValue ? defaultValue.code : undefined
        },
        {
            wrapperClass: "custom-scale-item__label",
            sizeClass: "form-input--40ch",
            type: "text",
            onInputsChange,
            defaultValue: defaultValue ? defaultValue.label : undefined
        }
    ];

    return new InputsWrapper({id, wrapperClass: "custom-scale-item", inputs});
};
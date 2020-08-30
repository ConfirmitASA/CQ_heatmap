import {InputWrapper} from "./InputWrapper";

export const AreaTextItem = ({id, onInputsChange, defaultValue, labelText}) => {
    const inputs = [
        {
            wrapperClass: "area-text-item__text",
            sizeClass: "form-input--40ch",
            type: "text",
            onInputsChange,
            defaultValue,
            labelText
        }
    ];

    return new InputWrapper({id, wrapperClass: "area-text-item", inputs});
};
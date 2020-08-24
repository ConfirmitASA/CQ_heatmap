import {InputsWrapper} from "./InputsWrapper";

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

    return new InputsWrapper({id, wrapperClass: "area-text-item", inputs, gridTemplateColumns: "auto auto minmax(0, 1fr)"});
};
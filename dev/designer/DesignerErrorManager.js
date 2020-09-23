import {ERROR_TYPES} from "../Constants";

export default class DesignerErrorManager {
    static handleInputError({element, errorCondition}) {
        element.classList.toggle("form-input--error", errorCondition);
        return errorCondition;
    }

    static handleWrapperError({element, errorCondition}) {
        element.classList.toggle("wrapper--error", errorCondition);
        return errorCondition;
    }

    static handleSeveralErrors({errors}) {
        return errors.reduce((result, errorOptions) => {
            switch (errorOptions.type) {
                case ERROR_TYPES.INPUT:
                    return DesignerErrorManager.handleInputError({...errorOptions}) || result;
                case ERROR_TYPES.WRAPPER:
                    return DesignerErrorManager.handleWrapperError({...errorOptions}) || result;
            }
        }, false);
    }
}
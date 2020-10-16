import CommonFunctionsUtil from "../CommonFunctionsUtil";
import {ERROR_TYPES} from "../Constants";

export default class DesignerErrorManager {
    static handleInputError({element, errorCondition}) {
        CommonFunctionsUtil.toggleClassForHTMLElement({element, className: "form-input--error", condition: errorCondition});
        return errorCondition;
    }

    static handleWrapperError({element, errorCondition}) {
        CommonFunctionsUtil.toggleClassForHTMLElement({element, className: "wrapper__error", condition: errorCondition});
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
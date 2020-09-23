import {QUESTION_TYPES} from "../Constants";

const ValidationLibrary = {
    getQuestionValidationCallback: ({currentQuestion, validators}) => {
        return (validationResult) => {
            let values = [];
            switch (currentQuestion.type) {
                case QUESTION_TYPES.MULTI:
                    values = currentQuestion.values;
                    break;
                case QUESTION_TYPES.GRID:
                    values = Object.keys(currentQuestion.values).map((key) => currentQuestion.values[key]);
                    break;
                case QUESTION_TYPES.SINGLE:
                    values.push(currentQuestion.value);
                    break;
            }

            let errors = [];
            validators.forEach((validator) => values.forEach((value) => errors = errors.concat(validator.validate(value))));
            errors.forEach((error) => validationResult.errors.push(error));
        }
    },

    subscribeQuestionValidation: ({currentQuestion, validators}) => {
        const validationCallback = ValidationLibrary.getQuestionValidationCallback({currentQuestion, validators});
        currentQuestion.validationEvent.on(validationCallback);
    },

    validationMethods: {
        getMinLengthValidator: ({minLength, errorMessage}) => {
            return {
                validate: (questionValue) => {
                    const errors = [];
                    if (minLength && questionValue.length < minLength){
                        errors.push({message: errorMessage});
                    }
                    return errors;
                }
            };
        },

        getMaxLengthValidator: ({maxLength, errorMessage}) => {
            return {
                validate: (questionValue) => {
                    const errors = [];
                    if (maxLength && questionValue.length > maxLength){
                        errors.push({message: errorMessage});
                    }
                    return errors;
                }
            };
        },

        getMinMaxValidator: ({min, max, generalErrorMessage, minErrorMessage, maxErrorMessage}) => {
            return (min && max)
                ? {
                    validate: (questionValue) => {
                        const errors = [];
                        if (questionValue < min || questionValue > max){
                            errors.push({message: generalErrorMessage});
                        }
                        return errors;
                    }
                }
                : min ? ValidationLibrary.validationMethods.getMinValidator(min, minErrorMessage) : ValidationLibrary.validationMethods.getMaxValidator(max, maxErrorMessage);
        },

        getMinValidator: ({min, errorMessage}) => {
            return {
                validate: (questionValue) => {
                    const errors = [];
                    if (min && questionValue < min){
                        errors.push({message: errorMessage});
                    }
                    return errors;
                }
            };
        },

        getMaxValidator: ({max, errorMessage}) => {
            return {
                validate: (questionValue) => {
                    const errors = [];
                    if (max && questionValue > max){
                        errors.push({message: errorMessage});
                    }
                    return errors;
                }
            };
        },

        getEqualValidator: ({equal, errorMessage}) => {
            return {
                validate: (questionValue) => {
                    const errors = [];
                    if (equal && questionValue === equal){
                        errors.push({message: errorMessage});
                    }
                    return errors;
                }
            };
        },

        getRegExpValidator: ({regExpText, errorMessage}) => {
            return {
                validate: (questionValue) => {
                    const errors = [];
                    if (regExpText && !(new RegExp(regExpText)).test(questionValue)) {
                        errors.push({message: errorMessage});
                    }
                    return errors;
                }
            };
        },

        getEmailValidator: ({errorMessage}) => {
            const emailRegExp = "[a-z0-9!#$%&'*+/=?_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
            return ValidationLibrary.validationMethods.getRegExpValidator({emailRegExp, errorMessage});
        }
    }
};

export default ValidationLibrary;
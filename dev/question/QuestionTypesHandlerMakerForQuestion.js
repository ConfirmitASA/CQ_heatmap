import {QUESTION_TYPES} from "../Constants";

export default class QuestionTypesHandlerMakerForQuestion {
    constructor({type}) {
        switch (type) {
            case QUESTION_TYPES.GRID:
                return new GridHandler();
            case QUESTION_TYPES.MULTI:
                return new MultiHandler();
            default:
                return new QuestionTypesHandlerForQuestion();
        }
    }
}

class QuestionTypesHandlerForQuestion {
    constructor() { }
    handleAreaClick = () => {};
    checkIfValueExists = () => {};
    setValues = () => {};
}

class GridHandler extends QuestionTypesHandlerForQuestion {
    handleAreaClick = ({indicator, values, scales, index}) => {
        if (indicator.classList.contains("area_chosen") && values[index]) {
            values[index] = undefined;
        }
        if (!indicator.classList.contains("area_chosen") && !values[index]) {
            values[index] = scales[0].code;
        }
        return values;
    };

    checkIfValueExists = ({values, index}) => {
        return values[index];
    };

    setValues = ({question, values}) => {
        const allValues = question.values;
        question.answers.forEach(({code}) => {
            allValues[code] = undefined;
        });
        Object.keys(values).forEach((key) => {
            allValues[key] = values[key];
        });
        Object.keys(allValues).forEach((key) => {
            question.setValue(key, allValues[key]);
        });
    };
}

class MultiHandler extends QuestionTypesHandlerForQuestion {
    handleAreaClick = ({indicator, values, index}) => {
        const arrayIndex = values.indexOf(index.toString());
        if (indicator.classList.contains("area_chosen") && arrayIndex >= 0) {
            values.splice(arrayIndex, 1);
        }
        if (!indicator.classList.contains("area_chosen") && arrayIndex < 0) {
            values.push(index);
        }
        return values;
    };

    checkIfValueExists = ({values, index}) => {
        return values.indexOf(index.toString());
    };

    setValues = ({question, values}) => {
        question.answers.forEach(({code}) => {
            question.setValue(code, 0);
        });
        values.forEach((code) => {
            question.setValue(code, 1);
        });
    };
}
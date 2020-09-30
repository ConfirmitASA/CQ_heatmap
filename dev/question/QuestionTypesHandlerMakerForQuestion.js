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

    checkAnswersAndScales = ({question, areas, scales}) => {
        if (areas && areas.length !== question.answers.length) {
            throw new Error("Number of areas is not equal to number of answers");
        }
        if (scales && scales.length !== question.scales.length) {
            throw new Error("Number of custom scales is not equal to number of question scales");
        }
    };
}

class GridHandler extends QuestionTypesHandlerForQuestion {
    checkIfValueExists = ({values, index}) => {
        return !!values[index];
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
        return values.indexOf(index.toString()) >= 0;
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
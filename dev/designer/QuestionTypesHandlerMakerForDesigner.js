import CommonFunctionsUtil from "../CommonFunctionsUtil";

import {
    AREA_CHOSEN_COLOR_WRAPPER_LEVEL_FROM_INPUT,
    CUSTOM_SCALE_TYPE, DEFAULT_SCALE_TYPE, DEFAULT_SCALES,
    EQUAL_TYPE,
    MIN_MAX_TYPE,
    QUESTION_TYPES
} from "../Constants";

export default class QuestionTypesHandlerMakerForDesigner {
    constructor({type, elements}) {
        switch (type) {
            case QUESTION_TYPES.GRID:
                return new GridHandler({elements});
            case QUESTION_TYPES.MULTI:
                return new MultiHandler({elements});
            default:
                return new QuestionTypesHandlerForDesigner({elements});
        }
    }
}

class QuestionTypesHandlerForDesigner {
    constructor({elements}) {
        this.elements = elements;
    }

    customizeDesignerWindowToType = () => {
        const {requiredInfo} = this.elements;
        CommonFunctionsUtil.toggleElementsVisibility({elements: [requiredInfo], shouldBeShown: true});
    };

    customizeAnswerOptionsTabToType = () => {
        const {minMaxInfo} = this.elements;
        CommonFunctionsUtil.toggleElementsVisibility({elements: [minMaxInfo]});
    };

    customizeAnswerOptionsTabToTypeOnSettingsReceived = ({haveScales}) => {
        const {scaleSettingsWrapper} = this.elements;
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [scaleSettingsWrapper],
            shouldBeShown: haveScales
        });
    };

    shouldAnswerOptionsTabBeOpened = ({values}) => {
        return values.haveScales;
    };

    customizeStylingTabToType = () => {
        const {areaChosenColorInput} = this.elements;

        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [CommonFunctionsUtil.getInputWrapper({
                input: areaChosenColorInput,
                level: AREA_CHOSEN_COLOR_WRAPPER_LEVEL_FROM_INPUT
            })],
            shouldBeShown: true
        });
    };
}

class GridHandler extends QuestionTypesHandlerForDesigner {
    constructor({elements}) {
        super({elements});
    }

    customizeAnswerOptionsTabToType = () => {
        const {haveScalesWrapper, haveScalesInput, scaleSettingsWrapper, activateDefaultScalesInput, minMaxInfo} = this.elements;
        CommonFunctionsUtil.toggleElementsVisibility({elements: [scaleSettingsWrapper], shouldBeShown: true});
        CommonFunctionsUtil.toggleElementsVisibility({elements: [minMaxInfo, haveScalesWrapper]});
        haveScalesInput.checked = true;
        activateDefaultScalesInput.checked = true;
    };

    shouldAnswerOptionsTabBeOpened = ({values, questionScales}) => {
        const {scaleType, scales, answersCount} = values;
        const equalHasValue = answersCount.type === EQUAL_TYPE && answersCount.equal > 0;
        const minMaxHasValue = answersCount.type === MIN_MAX_TYPE && (answersCount.min > 0 || answersCount.max > 0);
        const defaultScalesHaveErrors = questionScales ? DEFAULT_SCALES.length !== questionScales.length : true;
        const customScalesHaveValues = scaleType === CUSTOM_SCALE_TYPE && scales.length > 0;
        return equalHasValue || minMaxHasValue || customScalesHaveValues || defaultScalesHaveErrors;
    };

    customizeStylingTabToType = () => {
        const {areaChosenColorInput} = this.elements;

        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [CommonFunctionsUtil.getInputWrapper({
                input: areaChosenColorInput,
                level: 3
            })]
        });
    };
}

class MultiHandler extends QuestionTypesHandlerForDesigner {
    constructor({elements}) {
        super({elements});
    }

    customizeDesignerWindowToType = () => {
    };

    customizeAnswerOptionsTabToType = () => {
        const {haveScalesWrapper, answerOptionsTabWrapper} = this.elements;
        CommonFunctionsUtil.toggleElementsVisibility({elements: [answerOptionsTabWrapper, haveScalesWrapper]});
    };

    customizeAnswerOptionsTabToTypeOnSettingsReceived = ({}) => {
    };

    shouldAnswerOptionsTabBeOpened = ({values}) => {
        const {answersCount} = values;
        const equalHasValue = answersCount && answersCount.type === EQUAL_TYPE && answersCount.equal > 0;
        const minMaxHasValue = answersCount && answersCount.type === MIN_MAX_TYPE && (answersCount.min > 0 || answersCount.max > 0);
        return equalHasValue || minMaxHasValue;
    };

    customizeStylingTabToType = () => {
        const {areaChosenColorInput} = this.elements;

        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [CommonFunctionsUtil.getInputWrapper({
                input: areaChosenColorInput,
                level: AREA_CHOSEN_COLOR_WRAPPER_LEVEL_FROM_INPUT
            })],
            shouldBeShown: true
        });
    };
}
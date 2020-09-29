const DEFAULT_SCALE_TYPE = "default";
const CUSTOM_SCALE_TYPE = "custom";

const MIN_MAX_TYPE = "min-max";
const EQUAL_TYPE = "equal";

const COLOR_HIGHLIGHT_TYPE = "color";
const BORDER_HIGHLIGHT_TYPE = "border";

const MIN_VALUE_FOR_MINMAX = 1;

const HAVE_SCALES_WRAPPER_LEVEL_FROM_INPUT = 4;
const AREA_CHOSEN_COLOR_WRAPPER_LEVEL_FROM_INPUT = 3;

const QUESTION_TYPES = {
    GRID: "Grid",
    MULTI: "Multi",
    SINGLE: "Single"
};

const DEFAULT_COLORS = {
    AREA_HOVER: "#ffffff",
    AREA_BORDER: "#000000",
    AREA_CHOSEN: "#008000"
};

const MIN_SIZES_FOR_AREA = [10, 10];
const MAX_SIZES_FOR_AREA = [0, 0]; // [0, 0] is equal to undefined

const DEFAULT_SCALES = [
    {
        code: "1",
        text: "Positive",
        color: "green"
    },
    {
        code: "2",
        text: "Neutral",
        color: "#aaa"
    },
    {
        code: "3",
        text: "Negative",
        color: "red"
    }
];

const ERROR_TYPES = {
    INPUT: "input",
    WRAPPER: "wrapper"
}

const ELEMENTS = {
    CUSTOM: {
        SWITCH: "Switch",
        INPUT_WRAPPER: "InputWrapper",
        AREA_TEXT_ITEM: "AreaTextItem",
        CUSTOM_SCALE_ITEM: "CustomScaleItem",
        IMAGE_WRAPPER: "ImageWrapper"
    },
    QUESTION: {
        CONTENT: "Content",
        INSTRUCTION: "Instruction",
        TEXT: "Text",
        ERROR_ITEM: "ErrorItem",
        ERROR_LIST: "ErrorList",
        ERROR_BLOCK: "ErrorBlock"
    },
    HTML: {
        DIV: "div",
        LABEL: "label",
        INPUT: "input",
        TR: "tr",
        TD: "td",
        IMG: "img"
    }
}

const AREAS_COUNT_ERROR_TEXT = "Please select as many areas as answers";

export {
    DEFAULT_SCALE_TYPE,
    CUSTOM_SCALE_TYPE,
    MIN_MAX_TYPE,
    EQUAL_TYPE,
    COLOR_HIGHLIGHT_TYPE,
    BORDER_HIGHLIGHT_TYPE,
    MIN_VALUE_FOR_MINMAX,
    HAVE_SCALES_WRAPPER_LEVEL_FROM_INPUT,
    AREA_CHOSEN_COLOR_WRAPPER_LEVEL_FROM_INPUT,
    QUESTION_TYPES,
    DEFAULT_COLORS,
    MIN_SIZES_FOR_AREA,
    MAX_SIZES_FOR_AREA,
    DEFAULT_SCALES,
    ERROR_TYPES,
    ELEMENTS,
    AREAS_COUNT_ERROR_TEXT
};
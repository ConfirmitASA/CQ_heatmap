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
        IMAGE_WRAPPER: "ImageWrapper",
        TRANSLATION_ITEM: "TranslationItem",
        HELP_TOOLTIP: "HelpTooltip"
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
const AREA_TEXTS_HELP_TEXT = "To define, draw an area with the mouse and then click to add label (below image)";

const TRANSLATION_TYPES = {
    REQUIRED: "required",
    MINMAX: "minmax",
    MIN: "min",
    MAX: "max",
    EQUAL: "equal"
};

const DEFAULT_TRANSLATIONS = [
    {
        type: TRANSLATION_TYPES.REQUIRED,
        label: "Required warning",
        text: "This question is required. Please select a scale for each answer.",
        tooltip: "",
        texts: [{
            language: 9,
            text: "This question is required. Please select a scale for each answer."
        }]
    },
    {
        type: TRANSLATION_TYPES.MINMAX,
        label: "Min and max warning",
        text: "Please select between @ and @ answers.",
        tooltip: "The values can be replaced with '@' in the text. There're two values.",
        texts: [{
            language: 9,
            text: "Please select between @ and @ answers."
        }]
    },
    {
        type: TRANSLATION_TYPES.MIN,
        label: "Min warning",
        text: "Please change your response. Number of answers should be more or equal to @.",
        tooltip: "The values can be replaced with '@' in the text. There's one value.",
        texts: [{
            language: 9,
            text: "Please change your response. Number of answers should be more or equal to @."
        }]
    },
    {
        type: TRANSLATION_TYPES.MAX,
        label: "Max warning",
        text: "Please change your response. Number of answers should be less or equal to @.",
        tooltip: "The values can be replaced with '@' in the text. There's one value.",
        texts: [{
            language: 9,
            text: "Please change your response. Number of answers should be less or equal to @."
        }]
    },
    {
        type: TRANSLATION_TYPES.EQUAL,
        label: "Equal warning",
        text: "Please change your response. Number of answers should be equal to @.",
        tooltip: "The values can be replaced with '@' in the text. There's one value.",
        texts: [{
            language: 9,
            text: "Please change your response. Number of answers should be equal to @."
        }]
    }
];

const DEFAULT_LANGUAGE = 9;

const DEFAULT_TRANSLATION_TEXT_SEPARATOR = "@";

const DEFAULT_SETTINGS = {
    imageOptions: {
        src: "",
        width: 0
    },
    areas: [],
    answersCount: {
        type: "min-max",
        equal: "",
        max: "",
        min: ""
    },
    scaleType: "default",
    scales: [],
    styles: {
        areaHighlight: {
            preHighlightOnMobiles: true,
            type: "color",
            color: "#ffffff"
        },
        areaChoose: {
            color: "#008000"
        }
    },
    translations: DEFAULT_TRANSLATIONS
};

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
    AREAS_COUNT_ERROR_TEXT,
    AREA_TEXTS_HELP_TEXT,
    TRANSLATION_TYPES,
    DEFAULT_TRANSLATIONS,
    DEFAULT_LANGUAGE,
    DEFAULT_TRANSLATION_TEXT_SEPARATOR,
    DEFAULT_SETTINGS
};
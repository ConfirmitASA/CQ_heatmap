import CommonFunctionsUtil from "../../CommonFunctionsUtil";
import AbstractTab from "./AbstractTab";

import {
    COLOR_HIGHLIGHT_TYPE,
    BORDER_HIGHLIGHT_TYPE,
    DEFAULT_COLORS
} from "../../Constants";

export default class StylingTab extends AbstractTab {
    constructor({elements, questionTypeHandler, saveChanges}) {
        super({elements});
        this.questionTypeHandler = questionTypeHandler;
        this.saveChanges = saveChanges;
        this.render();
    }

    setValues = ({values}) => {
        const {elements} = this;
        const {areaHoverColorInput, areaBorderColorInput, areaBorderWidthInput, areaChosenColorInput} = elements;
        const {styles} = values;

        if (styles) {
            this.shouldBeOpened({styles});
            this.setValuesFromSettingsForAreaHighlight({styles});
            areaChosenColorInput.value = styles.areaChoose && styles.areaChoose.color ? styles.areaChoose.color : undefined;
        }

        const elementsToChangeVisibility = [
            {
                elements: [CommonFunctionsUtil.getInputWrapper({input: areaHoverColorInput})],
                shouldBeShown: !styles || !styles.areaHighlight || styles.areaHighlight.type === COLOR_HIGHLIGHT_TYPE
            },
            {
                elements: [CommonFunctionsUtil.getInputWrapper({input: areaBorderWidthInput}), CommonFunctionsUtil.getInputWrapper({input: areaBorderColorInput})],
                shouldBeShown: styles && styles.areaHighlight && styles.areaHighlight.type === BORDER_HIGHLIGHT_TYPE
            }
        ];
        elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));
    };

    shouldBeOpened = ({styles}) => {
        const {stylingTabWrapper} = this.elements;
        const {areaHighlight, areaChoose} = styles;

        const isPreHighlightOnMobilesUnchecked = !areaHighlight.preHighlightOnMobiles;
        const isAreaColorHighlightChanged = areaHighlight && areaHighlight.type === COLOR_HIGHLIGHT_TYPE && areaHighlight.color !== DEFAULT_COLORS.AREA_HOVER;
        const isAreaBorderHighlightChanged = areaHighlight && areaHighlight.type === BORDER_HIGHLIGHT_TYPE &&
            (areaHighlight.border.color !== DEFAULT_COLORS.AREA_BORDER || areaHighlight.border.width > 0);
        const isChosenAreaColorChanged = areaChoose && areaChoose.color !== DEFAULT_COLORS.AREA_CHOSEN;

        if (isPreHighlightOnMobilesUnchecked || isAreaColorHighlightChanged || isAreaBorderHighlightChanged || isChosenAreaColorChanged) {
            CommonFunctionsUtil.toggleTab({elements: [stylingTabWrapper]});
        }
    };

    setValuesFromSettingsForAreaHighlight = ({styles}) => {
        const {preHighlightAreasOnMobileInput, areaHighlighterSelector, areaHoverColorInput, areaBorderColorInput, areaBorderWidthInput} = this.elements;

        if (!styles.areaHighlight) {
            return;
        }

        const {preHighlightOnMobiles, type, color, border} = styles.areaHighlight;

        preHighlightAreasOnMobileInput.checked = preHighlightOnMobiles;

        areaHighlighterSelector[0].selected = type !== BORDER_HIGHLIGHT_TYPE;
        areaHighlighterSelector[1].selected = type === BORDER_HIGHLIGHT_TYPE;

        areaHoverColorInput.value = color ? color : undefined;

        areaBorderWidthInput.value = border && border.width ? border.width : undefined;
        areaBorderColorInput.value = border && border.color ? border.color : undefined;
    };

    get values() {
        const {areaHighlighterSelector, areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput, areaChosenColorInput, preHighlightAreasOnMobileInput} = this.elements;
        const areaHighlighterType = areaHighlighterSelector[1].selected ? BORDER_HIGHLIGHT_TYPE : COLOR_HIGHLIGHT_TYPE;

        const areaHighlighterColor = areaHighlighterType === COLOR_HIGHLIGHT_TYPE && areaHoverColorInput.value ? areaHoverColorInput.value : undefined;
        const areaHighlighterBorderEnabled = areaHighlighterType === BORDER_HIGHLIGHT_TYPE && (areaBorderWidthInput.value || areaBorderColorInput.value);

        return {
            areaHighlight: {
                preHighlightOnMobiles: preHighlightAreasOnMobileInput.checked,
                type: areaHighlighterType,
                color: areaHighlighterColor,
                border: areaHighlighterBorderEnabled
                    ? {
                        width: areaBorderWidthInput.value ? areaBorderWidthInput.value : undefined,
                        color: areaBorderColorInput.value ? areaBorderColorInput.value : undefined
                    }
                    : undefined,
            },
            areaChoose: {
                color: areaChosenColorInput.value ? areaChosenColorInput.value : undefined
            }
        };
    };

    render = () => {
        const {elements, questionTypeHandler} = this;
        const {areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput, areaChosenColorInput, preHighlightAreasOnMobileInput} = elements;
        this.setDefaultAttributes({
            elementsToChangeVisibility: [{
                elements: [CommonFunctionsUtil.getInputWrapper({input: areaBorderWidthInput}), CommonFunctionsUtil.getInputWrapper({input: areaBorderColorInput})]
            }],
            elementsToSetValues: [
                {element: areaHoverColorInput, value: DEFAULT_COLORS.AREA_HOVER},
                {element: areaBorderColorInput, value: DEFAULT_COLORS.AREA_BORDER},
                {element: areaChosenColorInput, value: DEFAULT_COLORS.AREA_CHOSEN}
            ],
            elementsToSetAttribute: [
                {element: preHighlightAreasOnMobileInput, attribute: {name: "checked", value: true}},
            ]
        });

        questionTypeHandler.customizeStylingTabToType();

        this.setupAdditionalStyles();
    };

    setupAdditionalStyles = () => {
        const {areaHighlighterSelector, areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput} = this.elements;

        areaHighlighterSelector.addEventListener("change", (e) => {
            const selector = e.target;
            const elementsToChangeVisibility = [
                {
                    elements: [CommonFunctionsUtil.getInputWrapper({input: areaHoverColorInput})],
                    shouldBeShown: selector[0].selected
                },
                {
                    elements: [CommonFunctionsUtil.getInputWrapper({input: areaBorderWidthInput}), CommonFunctionsUtil.getInputWrapper({input: areaBorderColorInput})],
                    shouldBeShown: selector[1].selected
                }
            ];
            elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));

            this.saveChanges();
        });

        areaBorderWidthInput.addEventListener("input", CommonFunctionsUtil.removeMathSignsFromPositiveIntCallback);
    };
}
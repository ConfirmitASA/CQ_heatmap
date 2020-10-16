import CommonFunctionsUtil from "../../CommonFunctionsUtil";
import AbstractTab from "./AbstractTab";

import {
    COLOR_HIGHLIGHT_TYPE,
    BORDER_HIGHLIGHT_TYPE,
    DEFAULT_COLORS, DEFAULT_SETTINGS
} from "../../Constants";

export default class StylingTab extends AbstractTab {
    constructor({elements, questionTypeHandler, saveChanges}) {
        super({elements});
        this.questionTypeHandler = questionTypeHandler;
        this.saveChanges = saveChanges;
        this.render();
    }

    setValues = ({values}) => {
        const {areaChosenColorInput} = this.elements;
        const {styles} = values;

        if (styles) {
            this.shouldBeOpened({styles});
            this.setValuesFromSettingsForAreaHighlight({styles});
            this.setValuesFromSettingsForAreaHighlight({styles, isMobile: true});
            areaChosenColorInput.value = styles.areaChoose && styles.areaChoose.color ? styles.areaChoose.color : DEFAULT_COLORS.AREA_CHOSEN;
        }

        this.toggleVisibilityForAreaHighlight({styles});
        this.toggleVisibilityForAreaHighlight({styles, isMobile: true});
    };

    shouldBeOpened = ({styles}) => {
        const {stylingTabWrapper} = this.elements;
        const {areaHighlight, areaChoose} = styles;

        const isPreHighlightOnMobilesUnchecked = !areaHighlight.preHighlightOnMobiles;
        const isAreaColorHighlightChanged = areaHighlight && areaHighlight.type === COLOR_HIGHLIGHT_TYPE && areaHighlight.color !== DEFAULT_COLORS.AREA_HOVER;
        const isAreaBorderHighlightChanged = areaHighlight && areaHighlight.type === BORDER_HIGHLIGHT_TYPE &&
            areaHighlight.border && (areaHighlight.border.color !== DEFAULT_COLORS.AREA_BORDER || areaHighlight.border.width > 0);
        const isAreaColorHighlightOnMobileChanged = areaHighlight && areaHighlight.mobile && areaHighlight.mobile.type === COLOR_HIGHLIGHT_TYPE && areaHighlight.mobile.color !== DEFAULT_COLORS.AREA_HOVER;
        const isAreaBorderHighlightOnMobileChanged = areaHighlight && areaHighlight.mobile && areaHighlight.mobile.type === BORDER_HIGHLIGHT_TYPE &&
            areaHighlight.mobile.border && (areaHighlight.mobile.border.color !== DEFAULT_COLORS.AREA_BORDER || areaHighlight.mobile.border.width > 0);
        const isChosenAreaColorChanged = areaChoose && areaChoose.color !== DEFAULT_COLORS.AREA_CHOSEN;

        if (isPreHighlightOnMobilesUnchecked || isAreaColorHighlightChanged || isAreaBorderHighlightChanged || isAreaColorHighlightOnMobileChanged || isAreaBorderHighlightOnMobileChanged || isChosenAreaColorChanged) {
            CommonFunctionsUtil.toggleTab({elements: [stylingTabWrapper]});
        }
    };

    setValuesFromSettingsForAreaHighlight = ({styles, isMobile}) => {
        const {preHighlightAreasOnMobileInput} = this.elements;
        const {preHighlightOnMobiles} = styles.areaHighlight;
        const areaHighlighterSelector = this.elements[`areaHighlighter${isMobile ? "OnMobile" : ""}Selector`];
        const areaHoverColorInput = this.elements[`areaHoverColor${isMobile ? "OnMobile" : ""}Input`];
        const areaBorderColorInput = this.elements[`areaBorderColor${isMobile ? "OnMobile" : ""}Input`];
        const areaBorderWidthInput = this.elements[`areaBorderWidth${isMobile ? "OnMobile" : ""}Input`];

        if (isMobile) {
            preHighlightAreasOnMobileInput.checked = preHighlightOnMobiles;
        }

        if (!styles.areaHighlight || isMobile && !styles.areaHighlight.mobile) {
            return;
        }

        const {type, color, border} = isMobile ? styles.areaHighlight.mobile : styles.areaHighlight;
        const {type: defaultType, color: defaultColor, border: defaultBorder} = isMobile ? DEFAULT_SETTINGS.styles.areaHighlight.mobile : DEFAULT_SETTINGS.styles.areaHighlight;

        areaHighlighterSelector[0].selected = type ? type !== BORDER_HIGHLIGHT_TYPE : defaultType !== BORDER_HIGHLIGHT_TYPE;
        areaHighlighterSelector[1].selected = type ? type === BORDER_HIGHLIGHT_TYPE : defaultType === BORDER_HIGHLIGHT_TYPE;

        areaHoverColorInput.value = color ? color : (defaultColor ? defaultColor : DEFAULT_COLORS.AREA_HOVER);

        areaBorderWidthInput.value = border && border.width ? border.width : (defaultBorder ? defaultBorder.width : "");
        areaBorderColorInput.value = border && border.color ? border.color : (defaultBorder ? defaultBorder.color : "");
    };

    toggleVisibilityForAreaHighlight = ({styles, isMobile}) => {
        const {preHighlightAreasOnMobileInput, areaHighlightOnMobileWrapper} = this.elements;
        const areaHoverColorInput = this.elements[`areaHoverColor${isMobile ? "OnMobile" : ""}Input`];
        const areaBorderColorInput = this.elements[`areaBorderColor${isMobile ? "OnMobile" : ""}Input`];
        const areaBorderWidthInput = this.elements[`areaBorderWidth${isMobile ? "OnMobile" : ""}Input`];

        const areaHighlight = isMobile ? styles.areaHighlight.mobile : styles.areaHighlight;

        const elementsToChangeVisibility = [
            {
                elements: [CommonFunctionsUtil.getInputWrapper({input: areaHoverColorInput})],
                shouldBeShown: !styles || !areaHighlight || areaHighlight.type === COLOR_HIGHLIGHT_TYPE
            },
            {
                elements: [CommonFunctionsUtil.getInputWrapper({input: areaBorderWidthInput}), CommonFunctionsUtil.getInputWrapper({input: areaBorderColorInput})],
                shouldBeShown: styles && areaHighlight && areaHighlight.type === BORDER_HIGHLIGHT_TYPE
            }
        ];

        if (isMobile) {
            elementsToChangeVisibility.push({
                elements: [areaHighlightOnMobileWrapper],
                shouldBeShown: preHighlightAreasOnMobileInput.checked
            });
        }

        elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));
    };

    get values() {
        const {areaHighlighterSelector, areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput, areaChosenColorInput, preHighlightAreasOnMobileInput,
            areaHighlighterOnMobileSelector, areaHoverColorOnMobileInput, areaBorderWidthOnMobileInput, areaBorderColorOnMobileInput} = this.elements;

        const areaHighlighterType = areaHighlighterSelector[1].selected ? BORDER_HIGHLIGHT_TYPE : COLOR_HIGHLIGHT_TYPE;
        const areaHighlighterColor = areaHighlighterType === COLOR_HIGHLIGHT_TYPE && !!areaHoverColorInput.value ? areaHoverColorInput.value : DEFAULT_SETTINGS.styles.areaHighlight.color;
        const areaHighlighterBorderEnabled = areaHighlighterType === BORDER_HIGHLIGHT_TYPE && (!!areaBorderWidthInput.value || !!areaBorderColorInput.value);

        const areaHighlighterOnMobileType = areaHighlighterOnMobileSelector[1].selected ? BORDER_HIGHLIGHT_TYPE : COLOR_HIGHLIGHT_TYPE;
        const areaHighlighterOnMobileColor = areaHighlighterOnMobileType === COLOR_HIGHLIGHT_TYPE && !!areaHoverColorOnMobileInput.value ? areaHoverColorOnMobileInput.value : "";
        const areaHighlighterOnMobileBorderEnabled = areaHighlighterOnMobileType === BORDER_HIGHLIGHT_TYPE && (!!areaBorderWidthOnMobileInput.value || !!areaBorderColorOnMobileInput.value);

        return {
            areaHighlight: {
                preHighlightOnMobiles: preHighlightAreasOnMobileInput.checked,
                type: areaHighlighterType,
                color: areaHighlighterColor,
                border: areaHighlighterBorderEnabled
                    ? {
                        width: !!areaBorderWidthInput.value ? areaBorderWidthInput.value : "",
                        color: !!areaBorderColorInput.value ? areaBorderColorInput.value : ""
                    }
                    : undefined,
                mobile: preHighlightAreasOnMobileInput.checked ? {
                    type: areaHighlighterOnMobileType,
                    color: areaHighlighterOnMobileColor,
                    border: areaHighlighterOnMobileBorderEnabled
                        ? {
                            width: !!areaBorderWidthOnMobileInput.value ? areaBorderWidthOnMobileInput.value : DEFAULT_SETTINGS.styles.areaHighlight.mobile.border.width,
                            color: !!areaBorderColorOnMobileInput.value ? areaBorderColorOnMobileInput.value : DEFAULT_SETTINGS.styles.areaHighlight.mobile.border.color
                        }
                        : undefined,
                } : undefined
            },
            areaChoose: {
                color: areaChosenColorInput.value ? areaChosenColorInput.value : DEFAULT_SETTINGS.styles.areaChoose.color
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

        this.setupAreaHighlight({isMobile: false});
        this.setupAreaHighlight({isMobile: true});
    };

    setupAreaHighlight = ({isMobile}) => {
        const {preHighlightAreasOnMobileInput, areaHighlightOnMobileWrapper} = this.elements;
        const areaHighlighterSelector = this.elements[`areaHighlighter${isMobile ? "OnMobile" : ""}Selector`];
        const areaHoverColorInput = this.elements[`areaHoverColor${isMobile ? "OnMobile" : ""}Input`];
        const areaBorderColorInput = this.elements[`areaBorderColor${isMobile ? "OnMobile" : ""}Input`];
        const areaBorderWidthInput = this.elements[`areaBorderWidth${isMobile ? "OnMobile" : ""}Input`];

        if (isMobile) {
            preHighlightAreasOnMobileInput.addEventListener("change", (e) => {
                const input = e.target;
                const elementsToChangeVisibility = [
                    {
                        elements: [areaHighlightOnMobileWrapper],
                        shouldBeShown: input.checked
                    }
                ];
                elementsToChangeVisibility.forEach((elementsOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementsOptions));

                this.saveChanges();
            });
        }

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
import {CustomScaleItem} from "../components/CustomScaleItem";
import {AreaTextItem} from "../components/AreaTextItem";

export default class HeatmapDesignerManager {
    constructor({question}) {
        this.question = question;
        this.elements = {
            imageSrcInput: document.getElementById('imageSrc'),
            imageWidthInput: document.getElementById('imageWidth'),
            haveScalesInput: document.getElementById('haveScales'),
            equalToNumberOfAnswersInput: document.getElementById('number-of-responses__equal'),
            minNumberOfAnswersInput: document.getElementById('number-of-responses__min'),
            maxNumberOfAnswersInput: document.getElementById('number-of-responses__max'),
            activateDefaultScalesInput: document.getElementById('activateDefaultScales'),
            activateCustomScalesInput: document.getElementById('activateCustomScales'),
            scalesNumberInput: document.getElementById('scalesNumber'),
            areaHoverColorInput: document.getElementById('areaHoverColor'),
            areaBorderWidthInput: document.getElementById('areaBorderWidth'),
            areaBorderColorInput: document.getElementById('areaBorderColor'),

            typeForNumberOfAnswersSelector: document.getElementById('number-of-responses__type'),
            areaHighlighterSelector: document.getElementById('areaHighlighterSelector'),

            changeImageBtn: document.getElementById('change-image-btn'),
            drawImageBtn: document.getElementById('draw-image-btn'),

            imageSettingsWrapper: document.getElementById('image-settings'),
            areasWrapper: document.getElementById('areas'),
            areaTextListWrapper: document.getElementById('areaTextList'),
            heatmapWrapper: document.getElementById('heatmap-wrapper'),
            answerOptionsWrapper: document.getElementById('answerOptionsWrapper'),
            activateScalesWrapper: document.getElementById('activateScales'),
            customScalesWrapper: document.getElementById('customScales'),
            customScaleListWrapper: document.getElementById('customScaleListWrapper'),
            customScaleList: document.getElementById('customScaleList')
        };

        this.showImage = false;
        this.hasErrors = false;

        this.render();
    }

    render = () => {
        this.question.onSettingsReceived = this.setValuesFromSettings;
        this.setDefaultAttributes();
        this.setupImageInputs();
        this.setupImageButtons();
        this.setupSavingElements();
        this.setupScaleElements();
        this.setupMinMaxEqualInputs();
        this.connectMinMaxInputs();
        this.setupAdditionalStyles();
    };

    setDefaultAttributes = () => {
        const {areasWrapper, imageWidthInput, activateScalesWrapper, customScalesWrapper, customScaleListWrapper,
            equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput, areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput} = this.elements;

        this.toggleElementsVisibility({elements: [areasWrapper, activateScalesWrapper, customScalesWrapper, customScaleListWrapper,
                equalToNumberOfAnswersInput.parentNode.parentNode, areaBorderWidthInput.parentNode.parentNode, areaBorderColorInput.parentNode.parentNode]});

        areaHoverColorInput.value = "#ffffff";

        minNumberOfAnswersInput.setAttribute("min", 1);
        maxNumberOfAnswersInput.setAttribute("min", 1);
        imageWidthInput.setAttribute("min", 1);
    };

    setValuesFromSettings = (settings) => {
        const {answerOptionsWrapper, imageSrcInput, imageWidthInput, haveScalesInput, activateScalesWrapper, activateDefaultScalesInput,
            activateCustomScalesInput, customScalesWrapper, customScaleListWrapper, scalesNumberInput, typeForNumberOfAnswersSelector,
            equalToNumberOfAnswersInput, maxNumberOfAnswersInput, minNumberOfAnswersInput, areasWrapper,
            areaHighlighterSelector, areaHoverColorInput, areaBorderColorInput, areaBorderWidthInput} = this.elements;
        const {imageOptions, areas, haveScales, scaleType, customScales, answersCount, styles} = settings;

        if (haveScales || answersCount.type === "equal" && answersCount.equal || answersCount.type === "min-max" && (answersCount.min || answersCount.max)) {
            answerOptionsWrapper.querySelector("header").click();
        }

        if (imageOptions) {
            imageSrcInput.value = imageOptions.src;
            imageWidthInput.value = imageOptions.width;

            if ($("#heatmap-wrapper img").length <= 0) {
                this.drawImage({settings});
            }
        } else {
            this.toggleElementsVisibility({elements: [areasWrapper]});
        }

        haveScalesInput.checked = haveScales;
        this.toggleElementsVisibility({elements: [activateScalesWrapper], shouldBeShown: haveScales});
        activateDefaultScalesInput.checked = scaleType === "default";
        activateCustomScalesInput.checked = scaleType === "custom";

        if (haveScales && scaleType === "custom") {
            scalesNumberInput.value = customScales.length;
            this.createScaleItems({defaultValues: customScales});
        }
        this.toggleElementsVisibility({elements: [customScalesWrapper], shouldBeShown: haveScales && scaleType === "custom"});
        this.toggleElementsVisibility({elements: [customScaleListWrapper], shouldBeShown: haveScales && scaleType === "custom" && customScales.length > 0});

        if (answersCount.type === "equal") {
            typeForNumberOfAnswersSelector[0].selected = true;
        } else {
            typeForNumberOfAnswersSelector[1].selected = true;
        }
        this.toggleElementsVisibility({elements: [equalToNumberOfAnswersInput.parentNode.parentNode], shouldBeShown: answersCount.type === "equal"});
        this.toggleElementsVisibility({elements: [minNumberOfAnswersInput.parentNode.parentNode, maxNumberOfAnswersInput.parentNode.parentNode], shouldBeShown: answersCount.type === "min-max"});

        if (answersCount.equal) {
            equalToNumberOfAnswersInput.value = answersCount.equal;
        }
        if (answersCount.max) {
            maxNumberOfAnswersInput.value = answersCount.max;
        }
        if (answersCount.min) {
            minNumberOfAnswersInput.value = answersCount.min;
        }

        maxNumberOfAnswersInput.setAttribute("max", areas.length);

        if (styles && styles.areaHighlight) {
            if (styles.areaHighlight.type === "border") {
                areaHighlighterSelector[1].selected = true;
            } else {
                areaHighlighterSelector[0].selected = true;
            }
            if (styles.areaHighlight.color) {
                areaHoverColorInput.value = styles.areaHighlight.color;
            } else {
                areaHoverColorInput.value = "#ffffff";
            }
            if (styles.areaHighlight.border) {
                if (styles.areaHighlight.border.width) {
                    areaBorderWidthInput.value = styles.areaHighlight.border.width;
                }
                if (styles.areaHighlight.border.color) {
                    areaBorderColorInput.value = styles.areaHighlight.border.color;
                }
            }
        }
        this.toggleElementsVisibility({elements: [areaHoverColorInput.parentNode.parentNode], shouldBeShown: !styles || !styles.areaHighlight || styles.areaHighlight.type === "color"});
        this.toggleElementsVisibility({elements: [areaBorderWidthInput.parentNode.parentNode, areaBorderColorInput.parentNode.parentNode], shouldBeShown: styles && styles.areaHighlight && styles.areaHighlight.type === "border"});
    };

    drawImage = ({settings}) => {
        let src, width, areas;
        if (settings) {
            const {imageOptions} = settings;
            src = imageOptions.src;
            width = imageOptions.width;
            areas = settings.areas;
        } else {
            const {imageSrcInput, imageWidthInput} = this.elements;
            src = imageSrcInput.value;
            width = imageWidthInput.value;
            areas = [];
        }
        this.hasErrors = false;

        if (src && width) {
            const {imageSettingsWrapper, areasWrapper} = this.elements;
            if (settings || this.showImage) {
                new customQuestionsLibrary.HeatmapDesigner({
                    wrapperId: "heatmap-wrapper",
                    imageOptions: {
                        src: src,
                        widthInput: width
                    },
                    predefinedAreas: areas,
                    onAreasChanged: () => {
                        this.createAreaTextItems({});
                        this.saveChanges();
                    },
                    onAreasInit: () => {
                        this.createAreaTextItems({defaultValues: areas.reverse().map(area => area.title)});
                    }
                });
            }
            this.toggleElementsVisibility({elements: [imageSettingsWrapper]})
            this.toggleElementsVisibility({elements: [areasWrapper], shouldBeShown: true})
            this.showImage = false;
        }
    };

    createAreaTextItems = ({defaultValues}) => {
        const {areaTextListWrapper} = this.elements;
        const areasCount = $("#heatmap-wrapper img").selectAreas('areas').length;
        const areaTextItems = areaTextListWrapper.querySelectorAll(".area-text-item");

        if (areaTextItems.length === areasCount) {
            return;
        }

        if (areaTextItems.length < areasCount) {
            for (let i = 1; i <= areasCount - areaTextItems.length; i++) {
                areaTextListWrapper.appendChild(new AreaTextItem({
                    id: `area-text-item${areaTextItems.length + i}`,
                    onInputChange: this.saveChanges,
                    defaultValue: defaultValues ? defaultValues[i - 1] : undefined,
                    labelText: areaTextItems.length + i
                }));
            }
        } else {
            areaTextItems.forEach((item, index) => {
                if (index + 1 > areasCount) {
                    item.remove();
                }
            });
        }
    };

    setupImageInputs = () => {
        const {imageSrcInput, imageWidthInput} = this.elements;

        imageSrcInput.addEventListener('change', this.onImageInputsChange);
        imageWidthInput.addEventListener('change', this.onImageInputsChange);
    };

    onImageInputsChange = () => {
        const {heatmapWrapper} = this.elements;
        this.showImage = true;
        heatmapWrapper.innerHTML = "";
    };

    setupImageButtons = () => {
        const {drawImageBtn, changeImageBtn} = this.elements;

        drawImageBtn.addEventListener('click', this.drawImage);
        changeImageBtn.addEventListener('click', this.showImageSettings);
    };

    setupSavingElements = () => {
        const {haveScalesInput, activateDefaultScalesInput, activateCustomScalesInput,
            typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput,
            areaHighlighterSelector, areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput} = this.elements;

        haveScalesInput.addEventListener('change', this.saveChanges);
        activateDefaultScalesInput.addEventListener('change', this.saveChanges);
        activateCustomScalesInput.addEventListener('change', this.saveChanges);

        typeForNumberOfAnswersSelector.addEventListener('change', this.saveChanges);
        equalToNumberOfAnswersInput.addEventListener('change', this.saveChanges);
        minNumberOfAnswersInput.addEventListener('change', this.saveChanges);
        maxNumberOfAnswersInput.addEventListener('change', this.saveChanges);

        areaHighlighterSelector.addEventListener('change', this.saveChanges);
        areaHoverColorInput.addEventListener('change', this.saveChanges);
        areaBorderWidthInput.addEventListener('change', this.saveChanges);
        areaBorderColorInput.addEventListener('change', this.saveChanges);
    };

    saveChanges = () => {
        const {imageSrcInput, imageWidthInput, areaTextListWrapper, typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput,
            maxNumberOfAnswersInput, minNumberOfAnswersInput, haveScalesInput, activateCustomScalesInput,
            areaHighlighterSelector, areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput} = this.elements;
        const heatmapImageJQ = $("#heatmap-wrapper img");

        const typeForNumberOfAnswers = typeForNumberOfAnswersSelector[0].selected ? "equal" : "min-max";
        const areaHighlighterType = areaHighlighterSelector[1].selected ? "border" : "color";

        const settings = {
            imageOptions: {
                src: imageSrcInput.value,
                width: imageWidthInput.value
            },
            areas: heatmapImageJQ.length > 0 ? heatmapImageJQ.selectAreas('areas') : [],
            answersCount: {
                type: typeForNumberOfAnswers,
                equal: typeForNumberOfAnswers === "equal" && equalToNumberOfAnswersInput.value ? equalToNumberOfAnswersInput.value : undefined,
                max: typeForNumberOfAnswers === "min-max" && maxNumberOfAnswersInput.value ? maxNumberOfAnswersInput.value : undefined,
                min: typeForNumberOfAnswers === "min-max" && minNumberOfAnswersInput.value ? minNumberOfAnswersInput.value : undefined
            },
            haveScales: haveScalesInput.checked,
            styles: areaHighlighterType && (areaHoverColorInput.value || areaBorderWidthInput.value || areaBorderColorInput.value)
                ? {
                    areaHighlight: {
                        type: areaHighlighterType,
                        color: areaHighlighterType === "color" && areaHoverColorInput.value ? areaHoverColorInput.value : undefined,
                        border: areaHighlighterType === "border" && (areaBorderWidthInput.value || areaBorderColorInput.value)
                            ? {
                                width: areaBorderWidthInput.value ? areaBorderWidthInput.value : undefined,
                                color: areaBorderColorInput.value ? areaBorderColorInput.value : undefined
                            }
                            : undefined,
                    }
                }
                : undefined
        };

        const areaTextItems = areaTextListWrapper.querySelectorAll(".area-text-item__text");
        settings.areas.forEach((area, index) => {
            const textIndex = areaTextItems.length - index - 1;
            if (areaTextItems[textIndex]) {
                area.title = areaTextItems[textIndex].value;
            }
        });

        if (haveScalesInput.checked) {
            settings.scaleType = activateCustomScalesInput.checked ? "custom" : "default";
            if (activateCustomScalesInput.checked) {
                settings.customScales = [];
                const customScaleItems = document.querySelectorAll(".custom-scale-item");
                customScaleItems.forEach((item, index) => {
                    const color = item.querySelector(".custom-scale-item__color").value;
                    const code = item.querySelector(".custom-scale-item__code").value;
                    const type = item.querySelector(".custom-scale-item__code").value;
                    const label = item.querySelector(".custom-scale-item__label").value;
                    settings.customScales.push({color,
                        code: code ? code : index,
                        type: type ? type : index,
                        label: label ? label : index
                    })
                });
            }
        }

        this.question.saveChanges(settings, this.hasErrors);
    };

    setupScaleElements = () => {
        const {haveScalesInput, activateScalesWrapper, activateDefaultScalesInput, activateCustomScalesInput, customScalesWrapper, customScaleListWrapper, scalesNumberInput} = this.elements;

        haveScalesInput.addEventListener('change', () => {
            this.toggleElementsVisibility({elements: [activateScalesWrapper], shouldBeShown: haveScalesInput.checked});
            activateDefaultScalesInput.checked = !activateDefaultScalesInput.checked && !activateCustomScalesInput.checked && haveScalesInput.checked;
        });

        activateDefaultScalesInput.addEventListener('change', () => {
            activateDefaultScalesInput.checked = true;
            activateCustomScalesInput.checked = false;

            this.toggleElementsVisibility({elements: [customScalesWrapper]});
        });

        activateCustomScalesInput.addEventListener('change', () => {
            activateDefaultScalesInput.checked = false;
            activateCustomScalesInput.checked = true;

            this.toggleElementsVisibility({elements: [customScalesWrapper], shouldBeShown: true});
        });

        scalesNumberInput.addEventListener('change', () => {
            const scalesNumberInputValue = scalesNumberInput.value;
            this.toggleElementsVisibility({elements: [customScaleListWrapper], shouldBeShown: scalesNumberInputValue});
        });
        scalesNumberInput.addEventListener('change', this.createScaleItems);
    };

    createScaleItems = ({defaultValues}) => {
        const {scalesNumberInput, customScaleList} = this.elements;
        const scaleItems = customScaleList.querySelectorAll(".custom-scale-item");
        const scalesNumberInputValue = parseInt(scalesNumberInput.value);

        if (scaleItems.length === scalesNumberInputValue) {
            return;
        }

        if (scaleItems.length < scalesNumberInputValue) {
            for (let i = 1; i <= scalesNumberInputValue - scaleItems.length; i++) {
                customScaleList.appendChild(new CustomScaleItem({
                    id: `custom-scale-item${scaleItems.length + i}`,
                    onInputChange: this.saveChanges,
                    defaultValue: defaultValues ? defaultValues[i - 1] : undefined
                }));
            }
        } else {
            scaleItems.forEach((item, index) => {
                if (index + 1 > scalesNumberInputValue) {
                    item.remove();
                }
            });
        }
    };

    setupMinMaxEqualInputs = () => {
        const {typeForNumberOfAnswersSelector, equalToNumberOfAnswersInput, minNumberOfAnswersInput, maxNumberOfAnswersInput} = this.elements;

        typeForNumberOfAnswersSelector.addEventListener('change', (e) => {
            const selector = e.target;
            this.toggleElementsVisibility({elements: [equalToNumberOfAnswersInput.parentNode.parentNode], shouldBeShown: selector[0].selected});
            this.toggleElementsVisibility({elements: [minNumberOfAnswersInput.parentNode.parentNode, maxNumberOfAnswersInput.parentNode.parentNode], shouldBeShown: selector[1].selected});
        });
    };

    connectMinMaxInputs = () => {
        const {minNumberOfAnswersInput, maxNumberOfAnswersInput} = this.elements;

        minNumberOfAnswersInput.addEventListener('change', function () {
            const minValue = minNumberOfAnswersInput.value;
            maxNumberOfAnswersInput.setAttribute("min", minValue);
        });
        maxNumberOfAnswersInput.addEventListener('change', function () {
            const maxValue = maxNumberOfAnswersInput.value;
            minNumberOfAnswersInput.setAttribute("max", maxValue);
        });
    };

    showImageSettings = () => {
        const {imageSettingsWrapper, areasWrapper} = this.elements;

        this.toggleElementsVisibility({elements: [imageSettingsWrapper], shouldBeShown: true});
        this.toggleElementsVisibility({elements: [areasWrapper]});
    };

    setupAdditionalStyles = () => {
        const {areaHighlighterSelector, areaHoverColorInput, areaBorderWidthInput, areaBorderColorInput} = this.elements;

        areaHighlighterSelector.addEventListener('change', (e) => {
            const selector = e.target;
            this.toggleElementsVisibility({elements: [areaHoverColorInput.parentNode.parentNode], shouldBeShown: selector[0].selected});
            this.toggleElementsVisibility({elements: [areaBorderWidthInput.parentNode.parentNode, areaBorderColorInput.parentNode.parentNode], shouldBeShown: selector[1].selected});
        });
    };

    toggleElementsVisibility = ({elements, shouldBeShown}) => {
        elements.forEach((element) => {
            element.style.display = shouldBeShown ? "" : "none";
        });
    };

    toggleElementsDisabling = ({elements, shouldBeDisabled}) => {
        elements.forEach((element) => {
            element.disabled = !!shouldBeDisabled;
        });
    };
}
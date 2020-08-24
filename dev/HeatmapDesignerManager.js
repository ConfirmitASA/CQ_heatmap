import {CustomScaleItem} from "./components/CustomScaleItem";
import {AreaTextItem} from "./components/AreaTextItem";

export default class HeatmapDesignerManager {
    constructor({question}) {
        this.question = question;
        this.elements = {
            imageSrcInput: document.getElementById('src'),
            imageWidthInput: document.getElementById('width'),
            haveScalesInput: document.getElementById('haveScales'),
            activateMinNumberInput: document.getElementById('activateMinNumber'),
            activateMaxNumberInput: document.getElementById('activateMaxNumber'),
            minNumberOfAnswersInput: document.getElementById('minNumberOfAnswers'),
            maxNumberOfAnswersInput: document.getElementById('maxNumberOfAnswers'),
            activateDefaultScalesInput: document.getElementById('activateDefaultScales'),
            activateCustomScalesInput: document.getElementById('activateCustomScales'),
            scalesNumberInput: document.getElementById('scalesNumber'),

            changeImageBtn: document.getElementById('change-image-btn'),
            drawImageBtn: document.getElementById('draw-image-btn'),
            //saveChangesBtn: document.getElementById('save-changes-btn'),

            imageSettingsWrapper: document.getElementById('image-settings'),
            areasWrapper: document.getElementById('areas'),
            areaTextListWrapper: document.getElementById('areaTextList'),
            heatmapWrapper: document.getElementById('heatmap-wrapper'),
            activateScalesWrapper: document.getElementById('activateScales'),
            customScalesWrapper: document.getElementById('customScales'),
            customScaleListWrapper: document.getElementById('customScaleList')
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
        this.setupMinMaxInputs();
        this.connectMinMaxInputs();
    };

    setDefaultAttributes = () => {
        const {areasWrapper, activateScalesWrapper, customScalesWrapper, minNumberOfAnswersInput, maxNumberOfAnswersInput, imageWidthInput} = this.elements;

        this.toggleElementsVisibility({elements: [areasWrapper, activateScalesWrapper, customScalesWrapper]});
        this.toggleElementsDisabling({elements: [maxNumberOfAnswersInput, minNumberOfAnswersInput], shouldBeDisabled: true});

        minNumberOfAnswersInput.setAttribute("min", 1);
        maxNumberOfAnswersInput.setAttribute("min", 1);
        imageWidthInput.setAttribute("min", 1);
    };

    setValuesFromSettings = (settings) => {
        const {imageSrcInput, imageWidthInput, haveScalesInput, activateScalesWrapper, activateDefaultScalesInput, activateCustomScalesInput, customScalesWrapper, scalesNumberInput,
            activateMaxNumberInput, activateMinNumberInput, maxNumberOfAnswersInput, minNumberOfAnswersInput, areasWrapper} = this.elements;
        const {imageOptions, haveScales, scaleType, customScales, answersCount, areas} = settings;

        if (imageOptions) {
            imageSrcInput.value = imageOptions.src;
            imageWidthInput.value = imageOptions.width;

            if ($("#heatmap-wrapper img").length <= 0) {
                this.drawImage({settings});
            }
        } else {
            this.toggleElementsVisibility({elements: [areasWrapper]})
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

        if (answersCount.max) {
            maxNumberOfAnswersInput.value = answersCount.max;
            activateMaxNumberInput.checked = true;
        }
        this.toggleElementsDisabling({elements: [maxNumberOfAnswersInput], shouldBeDisabled: !answersCount.max});

        if (answersCount.min) {
            minNumberOfAnswersInput.value = answersCount.min;
            activateMinNumberInput.checked = true;
        }
        this.toggleElementsDisabling({elements: [minNumberOfAnswersInput], shouldBeDisabled: !answersCount.min});

        maxNumberOfAnswersInput.setAttribute("max", areas.length);
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
            const {minNumberOfAnswersInput, maxNumberOfAnswersInput, imageSettingsWrapper, areasWrapper} = this.elements;
            if (settings || this.showImage) {
                new customQuestionsLibrary.HeatmapDesigner({
                    wrapperId: "heatmap-wrapper",
                    imageOptions: {
                        src: src,
                        widthInput: width
                    },
                    predefinedAreas: areas,
                    onAreasChanged: () => {
                        const areas = $("#heatmap-wrapper img").selectAreas('areas');
                        const areasCount = areas.length;
                        const oldMaxValue = parseInt(maxNumberOfAnswersInput.value);
                        maxNumberOfAnswersInput.setAttribute("max", areasCount);
                        minNumberOfAnswersInput.setAttribute("max", oldMaxValue < areasCount ? oldMaxValue : areasCount);

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
                    onInputsChange: this.saveChanges,
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
        const {saveChangesBtn, haveScalesInput, activateDefaultScalesInput, activateCustomScalesInput,
            minNumberOfAnswersInput, maxNumberOfAnswersInput, activateMinNumberInput, activateMaxNumberInput} = this.elements;

        //saveChangesBtn.addEventListener('click', this.saveChanges);

        haveScalesInput.addEventListener('change', this.saveChanges);
        activateDefaultScalesInput.addEventListener('change', this.saveChanges);
        activateCustomScalesInput.addEventListener('change', this.saveChanges);

        minNumberOfAnswersInput.addEventListener('change', this.saveChanges);
        maxNumberOfAnswersInput.addEventListener('change', this.saveChanges);

        activateMinNumberInput.addEventListener('change', this.saveChanges);
        activateMaxNumberInput.addEventListener('change', this.saveChanges);
    };

    saveChanges = () => {
        const {imageSrcInput, imageWidthInput, areaTextListWrapper, activateMaxNumberInput, activateMinNumberInput, maxNumberOfAnswersInput, minNumberOfAnswersInput,
            haveScalesInput, activateCustomScalesInput} = this.elements;
        const heatmapImageJQ = $("#heatmap-wrapper img");

        const settings = {
            imageOptions: {
                src: imageSrcInput.value,
                width: imageWidthInput.value
            },
            areas: heatmapImageJQ.length > 0 ? heatmapImageJQ.selectAreas('areas') : [],
            answersCount: {
                max: activateMaxNumberInput.checked ? maxNumberOfAnswersInput.value : 0,
                min: activateMinNumberInput.checked ? minNumberOfAnswersInput.value : 0
            },
            haveScales: haveScalesInput.checked
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
                customScaleItems.forEach((item) => {
                    settings.customScales.push({
                        color: item.querySelector(".custom-scale-item__color").value,
                        code: item.querySelector(".custom-scale-item__code").value,
                        type: item.querySelector(".custom-scale-item__code").value,
                        label: item.querySelector(".custom-scale-item__label").value
                    })
                });
            }
        }

        this.question.saveChanges(settings, this.hasErrors);
    };

    setupScaleElements = () => {
        const {haveScalesInput, activateScalesWrapper, activateDefaultScalesInput, activateCustomScalesInput, customScalesWrapper, scalesNumberInput} = this.elements;

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

        scalesNumberInput.addEventListener('change', this.createScaleItems);
    };

    createScaleItems = ({defaultValues}) => {
        const {scalesNumberInput, customScaleListWrapper} = this.elements;
        const scaleItems = customScaleListWrapper.querySelectorAll(".custom-scale-item");
        const scalesNumberInputValue = parseInt(scalesNumberInput.value);

        if (scaleItems.length === scalesNumberInputValue) {
            return;
        }

        if (scaleItems.length < scalesNumberInputValue) {
            for (let i = 1; i <= scalesNumberInputValue - scaleItems.length; i++) {
                customScaleListWrapper.appendChild(new CustomScaleItem({id: `custom-scale-item${scaleItems.length + i}`, onInputsChange: this.saveChanges, defaultValue: defaultValues ? defaultValues[i - 1] : undefined}));
            }
        } else {
            scaleItems.forEach((item, index) => {
                if (index + 1 > scalesNumberInputValue) {
                    item.remove();
                }
            });
        }
    };

    setupMinMaxInputs = () => {
        const {activateMinNumberInput, activateMaxNumberInput, minNumberOfAnswersInput, maxNumberOfAnswersInput} = this.elements;

        activateMinNumberInput.addEventListener('change', () => {
            this.toggleElementsDisabling({
                elements: [minNumberOfAnswersInput],
                shouldBeDisabled: !activateMinNumberInput.checked
            });

            const minValue = minNumberOfAnswersInput.value;
            minNumberOfAnswersInput.value = minValue ? minValue : minNumberOfAnswersInput.min;
        });

        activateMaxNumberInput.addEventListener('change', () => {
            this.toggleElementsDisabling({
                elements: [maxNumberOfAnswersInput],
                shouldBeDisabled: !activateMaxNumberInput.checked
            });

            const maxValue = maxNumberOfAnswersInput.value;
            maxNumberOfAnswersInput.value = maxValue ? maxValue : maxNumberOfAnswersInput.min;

            minNumberOfAnswersInput.setAttribute("max", 1);
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
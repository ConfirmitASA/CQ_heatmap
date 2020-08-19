export default class Designer {
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

            changeImageBtn: document.getElementById('change-image-btn'),
            drawImageBtn: document.getElementById('draw-image-btn'),
            saveChangesBtn: document.getElementById('save-changes-btn'),

            imageSettingsWrapper: document.getElementById('image-settings'),
            areasWrapper: document.getElementById('areas'),
            heatmapWrapper: document.getElementById('heatmap-wrapper')
        };
        this.showImage = false;

        this.render();
    }

    render = () => {
        this.question.onSettingsReceived = this.setValuesFromSettings;
        this.setDefaultAttributes();
        this.setupImageInputs();
        this.setupImageButtons();
        this.setupSavingElements();
        this.setupMinMaxInputs();
        this.connectMinMaxInputs();
    };

    setDefaultAttributes = () => {
        const {areasWrapper, minNumberOfAnswersInput, maxNumberOfAnswersInput, imageWidthInput} = this.elements;

        this.toggleElementsVisibility({elements: [areasWrapper]})
        this.toggleElementsDisabling({elements: [minNumberOfAnswersInput, maxNumberOfAnswersInput], shouldBeDisabled: true})

        minNumberOfAnswersInput.setAttribute("min", 1);
        maxNumberOfAnswersInput.setAttribute("min", 1);
        imageWidthInput.setAttribute("min", 1);
    };

    setValuesFromSettings = (settings) => {
        const {imageSrcInput, imageWidthInput, haveScalesInput, activateMaxNumberInput, activateMinNumberInput, maxNumberOfAnswersInput, minNumberOfAnswersInput, areasWrapper} = this.elements;
        const {imageOptions, haveScales, answersCount, areas} = settings;

        if (imageOptions) {
            imageSrcInput.value = imageOptions.src;
            imageWidthInput.value = imageOptions.width;

            haveScalesInput.checked = haveScales;

            if (answersCount.max) {
                maxNumberOfAnswersInput.value = answersCount.max;
                activateMaxNumberInput.checked = true;
                this.toggleElementsDisabling({elements: [maxNumberOfAnswersInput]});
            }
            if (answersCount.min) {
                minNumberOfAnswersInput.value = answersCount.min;
                activateMinNumberInput.checked = true;
                this.toggleElementsDisabling({elements: [minNumberOfAnswersInput]});
            }

            maxNumberOfAnswersInput.setAttribute("max", areas.length);
            if ($("#heatmap-wrapper img").length <= 0) {
                this.drawImage({settings});
            }
        } else {
            this.toggleElementsVisibility({elements: [areasWrapper]})
        }
    };

    toggleElementsVisibility = ({elements, shouldBeShown}) => {
        elements.forEach((element) => {
           element.style.display = shouldBeShown ? "" : "none";
        });
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
                    onAreasChanged: function () {
                        const areasCount = $("#heatmap-wrapper img").selectAreas('areas').length;
                        const oldMaxValue = parseInt(maxNumberOfAnswersInput.value);
                        maxNumberOfAnswersInput.setAttribute("max", areasCount);
                        minNumberOfAnswersInput.setAttribute("max", oldMaxValue < areasCount ? oldMaxValue : areasCount);
                    }
                });
            }
            this.toggleElementsVisibility({elements: [imageSettingsWrapper]})
            this.toggleElementsVisibility({elements: [areasWrapper], shouldBeShown: true})
            this.showImage = false;
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
        const {saveChangesBtn, haveScalesInput, minNumberOfAnswersInput, maxNumberOfAnswersInput, activateMinNumberInput, activateMaxNumberInput} = this.elements;

        saveChangesBtn.addEventListener('click', this.saveChanges);

        haveScalesInput.addEventListener('change', this.saveChanges);
        minNumberOfAnswersInput.addEventListener('change', this.saveChanges);
        maxNumberOfAnswersInput.addEventListener('change', this.saveChanges);

        activateMinNumberInput.addEventListener('change', this.saveChanges);
        activateMaxNumberInput.addEventListener('change', this.saveChanges);
    };

    toggleElementsDisabling = ({elements, shouldBeDisabled}) => {
        elements.forEach((element) => {
            element.disabled = !!shouldBeDisabled;
        });
    };

    saveChanges = () => {
        const {imageSrcInput, imageWidthInput, activateMaxNumberInput, activateMinNumberInput, maxNumberOfAnswersInput, minNumberOfAnswersInput, haveScalesInput} = this.elements;
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

        this.question.saveChanges(settings);
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

        minNumberOfAnswersInput.addEventListener('change', function() {
            const minValue = minNumberOfAnswersInput.value;
            maxNumberOfAnswersInput.setAttribute("min", minValue);
        });
        maxNumberOfAnswersInput.addEventListener('change', function() {
            const maxValue = maxNumberOfAnswersInput.value;
            minNumberOfAnswersInput.setAttribute("max", maxValue);
        });
    };

    showImageSettings = () => {
        const {imageSettingsWrapper, areasWrapper} = this.elements;

        this.toggleElementsVisibility({elements: [imageSettingsWrapper], shouldBeShown: true})
        this.toggleElementsVisibility({elements: [areasWrapper]})
    };
}
import CommonFunctionsUtil from "../CommonFunctionsUtil";
import {AreaTextItem} from "../../components/AreaTextItem";
import HeatmapDesigner from "../HeatmapDesigner";

export default class ImageOptions {
    constructor({elements, saveChanges}) {
        this.elements = elements;
        this.saveChanges = saveChanges;

        this.showImage = false;

        this.render();
    }

    render = () => {
        this.setDefaultAttributes();
        this.setupImageInputs();
        // this.setupImageButtons();
        this.setupSavingElements();
    };

    setDefaultAttributes = () => {
        const {imageWidthInput, areasWrapper} = this.elements;

        CommonFunctionsUtil.toggleElementsVisibility({elements: [areasWrapper]});

        imageWidthInput.setAttribute("min", 100);
    };

    setupImageInputs = () => {
        const {imageSrcInput, imageWidthInput} = this.elements;

        imageSrcInput.addEventListener("change", this.onImageInputsChange);
        imageWidthInput.addEventListener("change", this.onImageInputsChange);
        imageWidthInput.addEventListener("change", this.onImageWidthInputChange);
    };

    onImageInputsChange = () => {
        const {heatmapWrapper, areaTextsTitle, areaTextListWrapper} = this.elements;
        this.showImage = true;
        heatmapWrapper.innerHTML = "";
        CommonFunctionsUtil.toggleElementsVisibility({elements: [areaTextsTitle]});
        areaTextListWrapper.innerHTML = "";
    };

    onImageWidthInputChange = (e) => {
        const input = e.target;
        input.value = !input.min || parseInt(input.value) > parseInt(input.min) ? input.value : input.min;
        input.value = !input.max || parseInt(input.value) < parseInt(input.max) ? input.value : input.max;
    };

    setupImageButtons = () => {
        const {drawImageBtn, changeImageBtn} = this.elements;

        drawImageBtn.addEventListener("click", this.drawImage);
        // drawImageBtn.addEventListener("click", this.saveChanges);
        changeImageBtn.addEventListener("click", this.showImageSettings);
    };

    drawImage = ({imageOptions, areas}) => {
        const {imageSrcInput, imageWidthInput} = this.elements;
        let src, width;

        if (imageOptions) {
            src = imageOptions.src;
            width = imageOptions.width;
        } else {
            src = imageSrcInput.value;
            width = imageWidthInput.value;
        }

        if (src && width) {
            const {imageSettingsWrapper, areasWrapper, areaTextsTitle, areaTextListWrapper, heatmapWrapperId} = this.elements;
            if ($(`#${heatmapWrapperId} img`).length <= 0 && this.showImage) {
                const textItemsOptions = {
                    listWrapper: areaTextListWrapper,
                    itemClassName: "area-text-item",
                    itemClass: AreaTextItem,
                    onInputChange: this.saveChanges,
                    onClick: (e) => {
                        const component = e.target;
                        const itemWrapper = CommonFunctionsUtil.getInputWrapper({input: component});
                        const areaIndex = itemWrapper.id.replace("area-text-item", "");
                        const area = document.querySelector(`.select-areas-background-area[area-index="${areaIndex}"]`);
                        area.click();
                        area.previousSibling.click();
                    },
                    shouldNumberAsLabelBeAdded: true
                };

                new HeatmapDesigner({
                    wrapperId: heatmapWrapperId,
                    imageOptions: {src, width},
                    predefinedAreas: areas && areas.length > 0 ? areas : [],
                    onAreasChanged: () => {
                        const areas = $(`#${heatmapWrapperId} img`).selectAreas("areas");
                        CommonFunctionsUtil.createListOfItems({
                            ...textItemsOptions,
                            itemsExpectedCount: areas.length
                        });

                        if (areas && areas.length > 0) {
                            this.setAreaIndexesAndClickForTexts();
                        }

                        const areaTextItems = areaTextListWrapper.querySelectorAll(".area-text-item");
                        CommonFunctionsUtil.toggleElementsVisibility({
                            elements: [areaTextsTitle],
                            shouldBeShown: areaTextItems.length > 0
                        });

                        this.saveChanges();
                    },
                    onAreasInit: () => {
                        CommonFunctionsUtil.createListOfItems({
                            ...textItemsOptions,
                            defaultValues: areas && areas.length > 0 ? areas.reverse().map(area => area.title) : []
                        });

                        if (areas && areas.length > 0) {
                            this.setAreaIndexesAndClickForTexts();
                        }

                        const areaTextItems = areaTextListWrapper.querySelectorAll(".area-text-item");
                        CommonFunctionsUtil.toggleElementsVisibility({
                            elements: [areaTextsTitle],
                            shouldBeShown: areaTextItems.length > 0
                        });

                        this.saveChanges();
                    }
                });
            }
            // CommonFunctionsUtil.toggleElementsVisibility({elements: [imageSettingsWrapper]});
            CommonFunctionsUtil.toggleElementsVisibility({elements: [areasWrapper], shouldBeShown: true});
            this.showImage = false;
        }

        imageSrcInput.classList.toggle("form-input--error", !src);
        imageWidthInput.classList.toggle("form-input--error", !width);
    };

    setAreaIndexesAndClickForTexts = () => {
        const {heatmapWrapper, areaTextListWrapper} = this.elements;
        const areaNodes = Array.prototype.slice.call(heatmapWrapper.querySelectorAll(".select-areas-background-area")).reverse();
        areaNodes.forEach((area, index) => {
            const areaIndex = index + 1;
            const areaTextInput = areaTextListWrapper.querySelector(`#area-text-item${areaIndex} input`)
            if (areaTextInput) {
                areaTextInput.setAttribute("disabled", "disabled");
            }
            area.setAttribute("area-index", areaIndex);
            area.addEventListener("click", () => {
                const deleteButton = area.nextSibling;
                if (deleteButton.style.display === "none") {
                    areaTextInput.setAttribute("disabled", "disabled");
                } else {
                    areaTextInput.removeAttribute("disabled");
                    areaTextInput.focus({preventScroll: true});
                }
            });
        });
    };

    showImageSettings = () => {
        const {imageSettingsWrapper, areasWrapper} = this.elements;

        CommonFunctionsUtil.toggleElementsVisibility({elements: [imageSettingsWrapper], shouldBeShown: true});
        CommonFunctionsUtil.toggleElementsVisibility({elements: [areasWrapper]});
    };

    setupSavingElements = () => {
        const {imageSrcInput, imageWidthInput} = this.elements;

        imageSrcInput.addEventListener("change", this.saveChanges);
        imageWidthInput.addEventListener("change", this.saveChanges);
    };

    setValuesFromSettings = (settings) => {
        const {imageSrcInput, imageWidthInput, areasWrapper, heatmapWrapperId} = this.elements;
        const {imageOptions, areas} = settings;

        if (imageOptions) {
            imageSrcInput.value = imageOptions.src;
            imageWidthInput.value = imageOptions.width;
            this.showImage = true;

            if ($(`#${heatmapWrapperId} img`).length <= 0) {
                this.drawImage({imageOptions, areas});
            }
        } else {
            CommonFunctionsUtil.toggleElementsVisibility({elements: [areasWrapper]});
        }
    };
}
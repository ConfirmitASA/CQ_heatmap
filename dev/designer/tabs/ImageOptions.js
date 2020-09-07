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
        this.setupImageButtons();
    };

    setDefaultAttributes = () => {
        const {imageWidthInput, areasWrapper} = this.elements;

        CommonFunctionsUtil.toggleElementsVisibility({elements: [areasWrapper]});

        imageWidthInput.setAttribute("min", 1);
    };

    setupImageInputs = () => {
        const {imageSrcInput, imageWidthInput} = this.elements;

        imageSrcInput.addEventListener("change", this.onImageInputsChange);
        imageWidthInput.addEventListener("change", this.onImageInputsChange);
    };

    onImageInputsChange = () => {
        const {heatmapWrapper, areaTextsTitle, areaTextListWrapper} = this.elements;
        this.showImage = true;
        heatmapWrapper.innerHTML = "";
        CommonFunctionsUtil.toggleElementsVisibility({elements: [areaTextsTitle]});
        areaTextListWrapper.innerHTML = "";
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
                    }
                });
            }
            CommonFunctionsUtil.toggleElementsVisibility({elements: [imageSettingsWrapper]})
            CommonFunctionsUtil.toggleElementsVisibility({elements: [areasWrapper], shouldBeShown: true})
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
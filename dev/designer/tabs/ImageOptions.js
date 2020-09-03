import CommonFunctionsUtil from "../CommonFunctionsUtil";
import {AreaTextItem} from "../../components/AreaTextItem";

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
        const {heatmapWrapper} = this.elements;
        this.showImage = true;
        heatmapWrapper.innerHTML = "";
    };

    setupImageButtons = () => {
        const {drawImageBtn, changeImageBtn} = this.elements;

        drawImageBtn.addEventListener("click", this.drawImage);
        changeImageBtn.addEventListener("click", this.showImageSettings);
    };

    drawImage = ({imageOptions, areas}) => {
        let src, width;
        if (imageOptions) {
            src = imageOptions.src;
            width = imageOptions.width;
        } else {
            const {imageSrcInput, imageWidthInput} = this.elements;
            src = imageSrcInput.value;
            width = imageWidthInput.value;
        }

        if (src && width) {
            const {imageSettingsWrapper, areasWrapper, areaTextsTitle, areaTextListWrapper, heatmapWrapperId} = this.elements;
            if (this.showImage) {
                const textItemsOptions = {
                    listWrapper: areaTextListWrapper,
                    itemClassName: "area-text-item",
                    itemClass: AreaTextItem,
                    onInputChange: this.saveChanges,
                    shouldNumberAsLabelBeAdded: true
                };

                new customQuestionsLibrary.HeatmapDesigner({
                    wrapperId: heatmapWrapperId,
                    imageOptions: {
                        src: src,
                        widthInput: width
                    },
                    predefinedAreas: areas && areas.length > 0 ? areas : [],
                    onAreasChanged: () => {
                        CommonFunctionsUtil.createListOfItems({
                            ...textItemsOptions,
                            itemsExpectedCount: $(`#${heatmapWrapperId} img`).selectAreas("areas").length
                        });

                        this.setAreaIndexesAndClickForTexts();

                        const areaTextItems = areaTextListWrapper.querySelectorAll(".area-text-item");
                        CommonFunctionsUtil.toggleElementsVisibility({elements: [areaTextsTitle], shouldBeShown: areaTextItems.length > 0});

                        this.saveChanges();
                    },
                    onAreasInit: () => {
                        CommonFunctionsUtil.createListOfItems({
                            ...textItemsOptions,
                            defaultValues: areas && areas.length > 0 ? areas.reverse().map(area => area.title) : []
                        });

                        this.setAreaIndexesAndClickForTexts();

                        const areaTextItems = areaTextListWrapper.querySelectorAll(".area-text-item");
                        CommonFunctionsUtil.toggleElementsVisibility({elements: [areaTextsTitle], shouldBeShown: areaTextItems.length > 0});
                    }
                });
            }
            CommonFunctionsUtil.toggleElementsVisibility({elements: [imageSettingsWrapper]})
            CommonFunctionsUtil.toggleElementsVisibility({elements: [areasWrapper], shouldBeShown: true})
            this.showImage = false;
        }
    };

    setAreaIndexesAndClickForTexts = () => {
        const {heatmapWrapper, areaTextListWrapper} = this.elements;
        const areaNodes = Array.prototype.slice.call(heatmapWrapper.querySelectorAll(".select-areas-background-area")).reverse();
        areaNodes.forEach((area, index) => {
            const areaIndex = index + 1;
            const areaTextInput = areaTextListWrapper.querySelector(`#area-text-item${areaIndex} input`)
            areaTextInput.setAttribute("disabled", "disabled");
            area.setAttribute("area-index", areaIndex);
            area.addEventListener("click", () => {
                const deleteButton = area.nextSibling;
                if (deleteButton.style.display === "none") {
                    areaTextInput.setAttribute("disabled", "disabled");
                } else {
                    areaTextInput.removeAttribute("disabled");
                    areaTextInput.focus();
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
        const {imageSrcInput, imageWidthInput, areasWrapper} = this.elements;
        const {imageOptions, areas} = settings;

        if (imageOptions) {
            imageSrcInput.value = imageOptions.src;
            imageWidthInput.value = imageOptions.width;

            if ($("#heatmap-wrapper img").length <= 0) {
                this.drawImage({imageOptions, areas});
            }
        } else {
            CommonFunctionsUtil.toggleElementsVisibility({elements: [areasWrapper]});
        }
    };
}
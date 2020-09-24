import CommonFunctionsUtil from "../../CommonFunctionsUtil";
import HeatmapDesigner from "../HeatmapDesigner";
import Config from "../../Config";
import AbstractTab from "./AbstractTab";
import DesignerErrorManager from "../DesignerErrorManager";

import {ELEMENTS, ERROR_TYPES} from "../../Constants";

export default class ImageOptionsTab extends AbstractTab {
    constructor({elements, saveChanges}) {
        super({elements});
        this.saveChanges = saveChanges;

        this.state = {
            showImage: false,
            hasErrors: false
        };

        this.render();
    }

    setValues = ({values}) => {
        const {imageSrcInput, areasWrapper} = this.elements;
        const {imageOptions, areas} = values;

        if (imageOptions) {
            imageSrcInput.value = imageOptions.src;

            this.state.showImage = true;
            this.drawImage({areas});
        } else {
            CommonFunctionsUtil.toggleElementsVisibility({elements: [areasWrapper]});
        }
    };

    get values() {
        const {imageSrcInput, areaTextListWrapper} = this.elements;

        const src = imageSrcInput.value;
        const width = this.getHeatmapImageWidth();
        const areas = this.getAreas();

        const areaTextItems = areaTextListWrapper.querySelectorAll(".area-text-item__text");
        areas.forEach((area, index) => {
            const textIndex = areaTextItems.length - index - 1;
            if (areaTextItems[textIndex]) {
                area.title = areaTextItems[textIndex].value;
            }
        });

        return {imageOptions: {src, width}, areas};
    };

    raiseErrors = ({answers, areasFromSettings}) => {
        const {imageSrcInput, heatmapWrapper} = this.elements;

        const src = imageSrcInput.value;
        const areas = areasFromSettings ? areasFromSettings : this.getAreas();

        this.state.hasErrors = DesignerErrorManager.handleSeveralErrors({
            errors: [
                {type: ERROR_TYPES.INPUT, element: imageSrcInput, errorCondition: !src},
                {type: ERROR_TYPES.WRAPPER, element: heatmapWrapper, errorCondition: areas.length <= 0 || areas.length !== answers.length}
            ]
        });

        return this.state.hasErrors;
    };

    getAreas = () => {
        const {heatmapWrapper} = this.elements;
        const {heatmapWrapperId} = Config;

        let areas = [];
        if (heatmapWrapper.querySelectorAll(".select-areas-overlay").length > 0) {
            areas = $(`#${heatmapWrapperId} img`).selectAreas("areas");
        }
        return areas;
    };

    getHeatmapImageWidth = () => {
        const {heatmapWrapper} = this.elements;
        const heatmapWrapperImg = heatmapWrapper.querySelector("img");
        return heatmapWrapperImg ? heatmapWrapperImg.innerWidth : 0;
    };

    render = () => {
        const {areasWrapper} = this.elements;

        this.setDefaultAttributes({
            elementsToChangeVisibility: [{
                elements: [areasWrapper]
            }]
        });

        this.setupImageInputs();
    };

    setupImageInputs = () => {
        const {imageSrcInput} = this.elements;
        imageSrcInput.addEventListener("input", this.handleImageInputsChange);
    };

    handleImageInputsChange = () => {
        const {heatmapWrapper, areaTextsTitle, areaTextListWrapper} = this.elements;
        this.state.showImage = true;
        heatmapWrapper.innerHTML = "";
        areaTextListWrapper.innerHTML = "";
        CommonFunctionsUtil.toggleElementsVisibility({elements: [areaTextsTitle]});
    };

    drawImage = ({areas}) => {
        const {imageSrcInput} = this.elements;
        const src = imageSrcInput.value;

        if (src) {
            const {heatmapWrapper, areasWrapper} = this.elements;
            if (!heatmapWrapper.querySelector("img") && this.state.showImage) {
                new HeatmapDesigner(this.getHeatmapDesignerOptions({src, areas}));
            }

            const elementsToChangeVisibility = [
                {elements: [areasWrapper], shouldBeShown: true}
            ];
            elementsToChangeVisibility.forEach((elementOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementOptions));

            this.state.showImage = false;
        }
    };

    getHeatmapDesignerOptions = ({src, areas}) => {
        const {heatmapWrapperId} = Config;
        const textItemsOptions = this.getTextItemsOptions();

        return {
            wrapperId: heatmapWrapperId,
            imageOptions: {src, width: this.getHeatmapImageWidth()},
            predefinedAreas: areas && areas.length > 0 ? areas : [],
            onAreasChanged: () => {
                const areas = this.getAreas();
                this.handleAreasChanging({
                    textItemsOptions: {
                        ...textItemsOptions,
                        itemsExpectedCount: areas && areas.length > 0 ? areas.length : 0
                    }
                })
                this.saveChanges();
            },
            onAreasInit: () => this.handleAreasChanging({
                textItemsOptions: {
                    ...textItemsOptions,
                    defaultValues: areas && areas.length > 0 ? areas.reverse().map(area => area.title) : []
                }
            })
        }
    };

    getTextItemsOptions = () => {
        const {areaTextListWrapper} = this.elements;
        return {
            listWrapper: areaTextListWrapper,
            itemClassName: "area-text-item",
            itemClass: ELEMENTS.CUSTOM.AREA_TEXT_ITEM,
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
    };

    handleAreasChanging = ({textItemsOptions}) => {
        const {areaTextsTitle, areaTextListWrapper} = this.elements;

        CommonFunctionsUtil.createListOfItems(textItemsOptions);
        this.setAreaIndexesAndClickForTexts();

        const areaTextItems = areaTextListWrapper.querySelectorAll(".area-text-item");
        CommonFunctionsUtil.toggleElementsVisibility({
            elements: [areaTextsTitle],
            shouldBeShown: areaTextItems.length > 0
        });
    };

    setAreaIndexesAndClickForTexts = () => {
        const {heatmapWrapper} = this.elements;
        const areaNodes = Array.prototype.slice.call(heatmapWrapper.querySelectorAll(".select-areas-background-area")).reverse();
        areaNodes.forEach(this.setIndexAndClickForOneAreaCallback);
    };

    setIndexAndClickForOneAreaCallback = (area, index) => {
        const {areaTextListWrapper} = this.elements;
        const areaIndex = index + 1;
        const areaTextInput = areaTextListWrapper.querySelector(`#area-text-item${areaIndex} input`);

        areaTextInput && areaTextInput.setAttribute("disabled", "disabled");
        area.setAttribute("area-index", areaIndex);
        area.addEventListener("click", () => this.handleAreaClick({area, areaTextInput}));
    };

    handleAreaClick = ({area, areaTextInput}) => {
        const deleteButton = area.nextSibling;
        if (deleteButton.style.display === "none") {
            areaTextInput.setAttribute("disabled", "disabled");
        } else {
            areaTextInput.removeAttribute("disabled");
            areaTextInput.focus({preventScroll: true});
        }
    };

    showImageSettings = () => {
        const {imageSettingsWrapper, areasWrapper} = this.elements;
        const elementsToChangeVisibility = [
            {elements: [imageSettingsWrapper], shouldBeShown: true},
            {elements: [areasWrapper]}
        ];
        elementsToChangeVisibility.forEach((elementOptions) => CommonFunctionsUtil.toggleElementsVisibility(elementOptions));
    };
}
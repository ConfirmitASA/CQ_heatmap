import ElementsMaker from "../components/ElementsMaker";

import {ELEMENTS, MAX_SIZES_FOR_AREA, MIN_SIZES_FOR_AREA} from "../Constants";

export default class HeatmapDesigner {
    constructor({wrapperId, imageOptions, predefinedAreas, maxAreas, onAreasChanged, onAreasInit}) {
        this.id = wrapperId;
        this.imageOptions = imageOptions;
        this.predefinedAreas = predefinedAreas;
        this.maxAreas = maxAreas ? maxAreas : 0;
        this.onAreasChanged = onAreasChanged;
        this.onAreasInit = onAreasInit;
        this.wrapper = document.querySelector(`#${this.id}`);

        this.render();
    }

    render() {
        const {wrapper, imageOptions, id, predefinedAreas, onAreasChanged, onAreasInit} = this;
        const {width} = imageOptions;

        const imageWrapper = ElementsMaker.createCustomElement({type: ELEMENTS.CUSTOM.IMAGE_WRAPPER, elementOptions:{id: "heatmap-image-wrapper", ...imageOptions}});
        const image = imageWrapper.querySelector("img");

        image.addEventListener("load", () =>
            $(`#${id} img`).selectAreas({
                allowEdit: true,
                allowMove: true,
                allowResize: true,
                allowSelect: true,
                allowDelete: true,
                allowNudge: true,
                aspectRatio: 0,
                minSize: MIN_SIZES_FOR_AREA,
                maxSize: MAX_SIZES_FOR_AREA,
                width: width,
                maxAreas: this.maxAreas,
                outlineOpacity: 0.5,
                overlayOpacity: 0.5,
                areas: predefinedAreas,

                onLoaded: onAreasInit,
                onChanging: null,
                onChanged: onAreasChanged
            })
        );

        wrapper.appendChild(imageWrapper);

        return imageWrapper;
    }
}
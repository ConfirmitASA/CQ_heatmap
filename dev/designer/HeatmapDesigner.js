export default class HeatmapDesigner {
    constructor ({wrapperId, imageOptions, predefinedAreas, maxAreas, onAreasChanged, onAreasInit}) {
        this.id = wrapperId;
        this.imageOptions = imageOptions;
        this.predefinedAreas = predefinedAreas;
        this.maxAreas = maxAreas ? maxAreas : 0;
        this.onAreasChanged = onAreasChanged;
        this.onAreasInit = onAreasInit;
        this.wrapper = document.querySelector(`#${this.id}`);

        this.init();
    }

    init = () => {
        return this.render();
    };

    render = () => {
        const {wrapper, imageOptions, id, predefinedAreas, onAreasChanged, onAreasInit} = this;
        const {src, width} = imageOptions;

        const image = document.createElement("img");
        image.src = src;
        image.style.width = width + "px";

        image.addEventListener("load", (e) => {
            $(`#${id} img`).selectAreas({
                allowEdit:true,
                allowMove:true,
                allowResize:true,
                allowSelect:true,
                allowDelete:true,
                allowNudge: true,
                aspectRatio: 0,
                minSize: [10, 10],
                maxSize: [0, 0],
                width: width,
                maxAreas: this.maxAreas,
                outlineOpacity: 0.5,
                overlayOpacity: 0.5,
                areas: predefinedAreas,

                onLoaded: onAreasInit,
                onChanging: null,
                onChanged: onAreasChanged
            })
        });

        wrapper.appendChild(image);

        return image;
    };
}
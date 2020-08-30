export default class HeatmapDesigner {
    constructor ({wrapperId, imageOptions, predefinedAreas, onAreasChanged, onAreasInit}) {
        this.id = wrapperId;
        this.imageOptions = imageOptions;
        this.predefinedAreas = predefinedAreas;
        this.onAreasChanged = onAreasChanged;
        this.onAreasInit = onAreasInit;
        this.wrapper = document.querySelector("#" + this.id);

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
        image.style.width = width;
        wrapper.appendChild(image);

        $("#" + id + " img").selectAreas({
            allowEdit:true,
            allowMove:true,
            allowResize:true,
            allowSelect:true,
            allowDelete:true,
            allowNudge: true,
            aspectRatio: 0,
            minSize: [0, 0],
            maxSize: [0, 0],
            width: 0,
            maxAreas: 0,
            outlineOpacity: 0.5,
            overlayOpacity: 0.5,
            areas: predefinedAreas,

            onLoaded: onAreasInit,
            onChanging: null,
            onChanged: onAreasChanged
        });

        return image;
    };
}
import HeatmapDesigner from "./HeatmapDesigner"
import HeatmapDesignerManager from "./HeatmapDesignerManager";

if (window && !window.customQuestionsLibrary) {
    window.customQuestionsLibrary = {};
}

window.customQuestionsLibrary.HeatmapDesigner = HeatmapDesigner;
window.customQuestionsLibrary.HeatmapDesignerManager = HeatmapDesignerManager;
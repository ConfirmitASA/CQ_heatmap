import HeatmapDesigner from "./HeatmapDesigner"
import Designer from "./Designer";

if (window && !window.customQuestionsLibrary) {
    window.customQuestionsLibrary = {};
}

window.customQuestionsLibrary.HeatmapDesigner = HeatmapDesigner;
window.customQuestionsLibrary.Designer = Designer;
import HeatmapDesignerWindow from "./HeatmapDesignerWindow";
import setupPolyfills from "../polyfills";

setupPolyfills();

if (window && !window.customQuestionsLibrary) {
    window.customQuestionsLibrary = {};
}

window.customQuestionsLibrary.HeatmapDesignerManager = HeatmapDesignerWindow;
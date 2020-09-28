import Heatmap from "./Heatmap";
import setupPolyfills from "../polyfills";

setupPolyfills();

if (window && !window.customQuestionsLibrary) {
    window.customQuestionsLibrary = {};
}

window.customQuestionsLibrary.Heatmap = Heatmap;
import Heatmap from "./Heatmap";

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

if (window && !window.customQuestionsLibrary) {
    window.customQuestionsLibrary = {};
}

window.customQuestionsLibrary.Heatmap = Heatmap;
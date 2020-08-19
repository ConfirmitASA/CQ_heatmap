/* global register */
import Heatmap from "./Heatmap";

(function () {
    const question = Confirmit.page.questions[0];

    var areas = [{ "id": 0, "x": 26, "y": 96, "z": 0, "height": 36, "width": 146 }, { "id": 1, "x": 27, "y": 130, "z": 0, "height": 29, "width": 144 }, { "id": 2, "x": 27, "y": 158, "z": 0, "height": 27, "width": 145 }, { "id": 3, "x": 58, "y": 187, "z": 0, "height": 36, "width": 113 }, { "id": 4, "x": 39, "y": 225, "z": 0, "height": 26, "width": 133 }, { "id": 5, "x": 179, "y": 96, "z": 0, "height": 29, "width": 149 }, { "id": 6, "x": 179, "y": 123, "z": 0, "height": 26, "width": 146 }, { "id": 7, "x": 179, "y": 149, "z": 0, "height": 36, "width": 141 }, { "id": 8, "x": 181, "y": 187, "z": 0, "height": 38, "width": 139 }, { "id": 9, "x": 173, "y": 204, "z": 0, "height": 0, "width": 4 }, { "id": 10, "x": 178, "y": 225, "z": 0, "height": 24, "width": 147 }, { "id": 11, "x": 31, "y": 287, "z": 0, "height": 38, "width": 144 }, { "id": 12, "x": 179, "y": 287, "z": 0, "height": 40, "width": 124 }, { "id": 13, "x": 39, "y": 323, "z": 0, "height": 48, "width": 135 }, { "id": 14, "x": 179, "y": 326, "z": 0, "height": 45, "width": 144 }, { "id": 15, "x": 2130.3333740234375, "y": 280, "z": 0, "height": 21, "width": 139 }, { "id": 16, "x": 2131.3333740234375, "y": 301, "z": 0, "height": 21, "width": 147 }, { "id": 17, "x": 2130.3333740234375, "y": 323, "z": 0, "height": 19, "width": 107 }, { "id": 18, "x": 2130.3333740234375, "y": 342, "z": 0, "height": 21, "width": 94 }, { "id": 19, "x": 2121.3333740234375, "y": 333, "z": 0, "height": 1, "width": 7 }];

    var imageOptions = {
        src: "https://survey.euro.confirmit.com/isa/BDJPFRDMEYBPBKLVADAYFQCDAVIOEQJR/AGalaida/core.jpg",
        width: "2453px"
    };
    var answersCount = {};
    var haveScales = false;

    // var styles = {
    //   borderWidth: 0, //only int values without "px"
    //   emptyAreaHoverColor: "#fff"
    // }

    // var buttonOptions = [
    //   {
    //     type: "positive",
    //     text: "Positive",
    //     color: "red",
    //     lightColor: "#d0f0c0"
    //   },
    //   {
    //     type: "neutral",
    //     text: "Neutral",
    //     color: "#aaa",
    //     lightColor: "#eee"
    //   },
    //   {
    //     type: "negative",
    //     text: "Negative",
    //     color: "red",
    //     lightColor: "#ffcccb"
    //   }
    // ];

    var heatmap = new Heatmap({question, areas, imageOptions});
})();

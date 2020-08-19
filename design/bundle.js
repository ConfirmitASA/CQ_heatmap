/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./dev/HeatmapDesigner.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HeatmapDesigner = function HeatmapDesigner(_ref) {
  var _this = this;

  var wrapperId = _ref.wrapperId,
      _imageOptions = _ref.imageOptions,
      _predefinedAreas = _ref.predefinedAreas,
      _onAreasChanged = _ref.onAreasChanged;

  _classCallCheck(this, HeatmapDesigner);

  _defineProperty(this, "init", function () {
    return _this.render();
  });

  _defineProperty(this, "render", function () {
    var wrapper = _this.wrapper,
        imageOptions = _this.imageOptions,
        id = _this.id,
        predefinedAreas = _this.predefinedAreas,
        onAreasChanged = _this.onAreasChanged;
    var src = imageOptions.src,
        width = imageOptions.width;
    var image = document.createElement("img");
    image.src = src;
    image.style.width = width;
    wrapper.appendChild(image);
    $("#" + id + " img").selectAreas({
      allowEdit: true,
      allowMove: true,
      allowResize: true,
      allowSelect: true,
      allowDelete: true,
      allowNudge: true,
      aspectRatio: 0,
      minSize: [0, 0],
      maxSize: [0, 0],
      width: 0,
      maxAreas: 0,
      outlineOpacity: 0.5,
      overlayOpacity: 0.5,
      areas: predefinedAreas,
      onChanging: null,
      onChanged: onAreasChanged
    });
    return image;
  });

  this.id = wrapperId;
  this.imageOptions = _imageOptions;
  this.predefinedAreas = _predefinedAreas;
  this.onAreasChanged = _onAreasChanged;
  this.wrapper = document.querySelector("#" + this.id);
  this.init();
};


// CONCATENATED MODULE: ./dev/Designer.js
function Designer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Designer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Designer = function Designer(_ref) {
  var _this = this;

  var question = _ref.question;

  Designer_classCallCheck(this, Designer);

  Designer_defineProperty(this, "render", function () {
    _this.question.onSettingsReceived = _this.setValuesFromSettings;

    _this.setDefaultAttributes();

    _this.setupImageInputs();

    _this.setupImageButtons();

    _this.setupSavingElements();

    _this.setupMinMaxInputs();

    _this.connectMinMaxInputs();
  });

  Designer_defineProperty(this, "setDefaultAttributes", function () {
    var _this$elements = _this.elements,
        areasWrapper = _this$elements.areasWrapper,
        minNumberOfAnswersInput = _this$elements.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements.maxNumberOfAnswersInput,
        imageWidthInput = _this$elements.imageWidthInput;

    _this.toggleElementsVisibility({
      elements: [areasWrapper]
    });

    _this.toggleElementsDisabling({
      elements: [minNumberOfAnswersInput, maxNumberOfAnswersInput],
      shouldBeDisabled: true
    });

    minNumberOfAnswersInput.setAttribute("min", 1);
    maxNumberOfAnswersInput.setAttribute("min", 1);
    imageWidthInput.setAttribute("min", 1);
  });

  Designer_defineProperty(this, "setValuesFromSettings", function (settings) {
    var _this$elements2 = _this.elements,
        imageSrcInput = _this$elements2.imageSrcInput,
        imageWidthInput = _this$elements2.imageWidthInput,
        haveScalesInput = _this$elements2.haveScalesInput,
        activateMaxNumberInput = _this$elements2.activateMaxNumberInput,
        activateMinNumberInput = _this$elements2.activateMinNumberInput,
        maxNumberOfAnswersInput = _this$elements2.maxNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements2.minNumberOfAnswersInput,
        areasWrapper = _this$elements2.areasWrapper;
    var imageOptions = settings.imageOptions,
        haveScales = settings.haveScales,
        answersCount = settings.answersCount,
        areas = settings.areas;

    if (imageOptions) {
      imageSrcInput.value = imageOptions.src;
      imageWidthInput.value = imageOptions.width;
      haveScalesInput.checked = haveScales;

      if (answersCount.max) {
        maxNumberOfAnswersInput.value = answersCount.max;
        activateMaxNumberInput.checked = true;

        _this.toggleElementsDisabling({
          elements: [maxNumberOfAnswersInput]
        });
      }

      if (answersCount.min) {
        minNumberOfAnswersInput.value = answersCount.min;
        activateMinNumberInput.checked = true;

        _this.toggleElementsDisabling({
          elements: [minNumberOfAnswersInput]
        });
      }

      maxNumberOfAnswersInput.setAttribute("max", areas.length);

      if ($("#heatmap-wrapper img").length <= 0) {
        _this.drawImage({
          settings: settings
        });
      }
    } else {
      _this.toggleElementsVisibility({
        elements: [areasWrapper]
      });
    }
  });

  Designer_defineProperty(this, "toggleElementsVisibility", function (_ref2) {
    var elements = _ref2.elements,
        shouldBeShown = _ref2.shouldBeShown;
    elements.forEach(function (element) {
      element.style.display = shouldBeShown ? "" : "none";
    });
  });

  Designer_defineProperty(this, "drawImage", function (_ref3) {
    var settings = _ref3.settings;
    var src, width, areas;

    if (settings) {
      var imageOptions = settings.imageOptions;
      src = imageOptions.src;
      width = imageOptions.width;
      areas = settings.areas;
    } else {
      var _this$elements3 = _this.elements,
          imageSrcInput = _this$elements3.imageSrcInput,
          imageWidthInput = _this$elements3.imageWidthInput;
      src = imageSrcInput.value;
      width = imageWidthInput.value;
      areas = [];
    }

    if (src && width) {
      var _this$elements4 = _this.elements,
          minNumberOfAnswersInput = _this$elements4.minNumberOfAnswersInput,
          maxNumberOfAnswersInput = _this$elements4.maxNumberOfAnswersInput,
          imageSettingsWrapper = _this$elements4.imageSettingsWrapper,
          areasWrapper = _this$elements4.areasWrapper;

      if (settings || _this.showImage) {
        new customQuestionsLibrary.HeatmapDesigner({
          wrapperId: "heatmap-wrapper",
          imageOptions: {
            src: src,
            widthInput: width
          },
          predefinedAreas: areas,
          onAreasChanged: function onAreasChanged() {
            var areasCount = $("#heatmap-wrapper img").selectAreas('areas').length;
            var oldMaxValue = parseInt(maxNumberOfAnswersInput.value);
            maxNumberOfAnswersInput.setAttribute("max", areasCount);
            minNumberOfAnswersInput.setAttribute("max", oldMaxValue < areasCount ? oldMaxValue : areasCount);
          }
        });
      }

      _this.toggleElementsVisibility({
        elements: [imageSettingsWrapper]
      });

      _this.toggleElementsVisibility({
        elements: [areasWrapper],
        shouldBeShown: true
      });

      _this.showImage = false;
    }
  });

  Designer_defineProperty(this, "setupImageInputs", function () {
    var _this$elements5 = _this.elements,
        imageSrcInput = _this$elements5.imageSrcInput,
        imageWidthInput = _this$elements5.imageWidthInput;
    imageSrcInput.addEventListener('change', _this.onImageInputsChange);
    imageWidthInput.addEventListener('change', _this.onImageInputsChange);
  });

  Designer_defineProperty(this, "onImageInputsChange", function () {
    var heatmapWrapper = _this.elements.heatmapWrapper;
    _this.showImage = true;
    heatmapWrapper.innerHTML = "";
  });

  Designer_defineProperty(this, "setupImageButtons", function () {
    var _this$elements6 = _this.elements,
        drawImageBtn = _this$elements6.drawImageBtn,
        changeImageBtn = _this$elements6.changeImageBtn;
    drawImageBtn.addEventListener('click', _this.drawImage);
    changeImageBtn.addEventListener('click', _this.showImageSettings);
  });

  Designer_defineProperty(this, "setupSavingElements", function () {
    var _this$elements7 = _this.elements,
        saveChangesBtn = _this$elements7.saveChangesBtn,
        haveScalesInput = _this$elements7.haveScalesInput,
        minNumberOfAnswersInput = _this$elements7.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements7.maxNumberOfAnswersInput,
        activateMinNumberInput = _this$elements7.activateMinNumberInput,
        activateMaxNumberInput = _this$elements7.activateMaxNumberInput;
    saveChangesBtn.addEventListener('click', _this.saveChanges);
    haveScalesInput.addEventListener('change', _this.saveChanges);
    minNumberOfAnswersInput.addEventListener('change', _this.saveChanges);
    maxNumberOfAnswersInput.addEventListener('change', _this.saveChanges);
    activateMinNumberInput.addEventListener('change', _this.saveChanges);
    activateMaxNumberInput.addEventListener('change', _this.saveChanges);
  });

  Designer_defineProperty(this, "toggleElementsDisabling", function (_ref4) {
    var elements = _ref4.elements,
        shouldBeDisabled = _ref4.shouldBeDisabled;
    elements.forEach(function (element) {
      element.disabled = !!shouldBeDisabled;
    });
  });

  Designer_defineProperty(this, "saveChanges", function () {
    var _this$elements8 = _this.elements,
        imageSrcInput = _this$elements8.imageSrcInput,
        imageWidthInput = _this$elements8.imageWidthInput,
        activateMaxNumberInput = _this$elements8.activateMaxNumberInput,
        activateMinNumberInput = _this$elements8.activateMinNumberInput,
        maxNumberOfAnswersInput = _this$elements8.maxNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements8.minNumberOfAnswersInput,
        haveScalesInput = _this$elements8.haveScalesInput;
    var heatmapImageJQ = $("#heatmap-wrapper img");
    var settings = {
      imageOptions: {
        src: imageSrcInput.value,
        width: imageWidthInput.value
      },
      areas: heatmapImageJQ.length > 0 ? heatmapImageJQ.selectAreas('areas') : [],
      answersCount: {
        max: activateMaxNumberInput.checked ? maxNumberOfAnswersInput.value : 0,
        min: activateMinNumberInput.checked ? minNumberOfAnswersInput.value : 0
      },
      haveScales: haveScalesInput.checked
    };

    _this.question.saveChanges(settings);
  });

  Designer_defineProperty(this, "setupMinMaxInputs", function () {
    var _this$elements9 = _this.elements,
        activateMinNumberInput = _this$elements9.activateMinNumberInput,
        activateMaxNumberInput = _this$elements9.activateMaxNumberInput,
        minNumberOfAnswersInput = _this$elements9.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements9.maxNumberOfAnswersInput;
    activateMinNumberInput.addEventListener('change', function () {
      _this.toggleElementsDisabling({
        elements: [minNumberOfAnswersInput],
        shouldBeDisabled: !activateMinNumberInput.checked
      });

      var minValue = minNumberOfAnswersInput.value;
      minNumberOfAnswersInput.value = minValue ? minValue : minNumberOfAnswersInput.min;
    });
    activateMaxNumberInput.addEventListener('change', function () {
      _this.toggleElementsDisabling({
        elements: [maxNumberOfAnswersInput],
        shouldBeDisabled: !activateMaxNumberInput.checked
      });

      var maxValue = maxNumberOfAnswersInput.value;
      maxNumberOfAnswersInput.value = maxValue ? maxValue : maxNumberOfAnswersInput.min;
      minNumberOfAnswersInput.setAttribute("max", 1);
    });
  });

  Designer_defineProperty(this, "connectMinMaxInputs", function () {
    var _this$elements10 = _this.elements,
        minNumberOfAnswersInput = _this$elements10.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements10.maxNumberOfAnswersInput;
    minNumberOfAnswersInput.addEventListener('change', function () {
      var minValue = minNumberOfAnswersInput.value;
      maxNumberOfAnswersInput.setAttribute("min", minValue);
    });
    maxNumberOfAnswersInput.addEventListener('change', function () {
      var maxValue = maxNumberOfAnswersInput.value;
      minNumberOfAnswersInput.setAttribute("max", maxValue);
    });
  });

  Designer_defineProperty(this, "showImageSettings", function () {
    var _this$elements11 = _this.elements,
        imageSettingsWrapper = _this$elements11.imageSettingsWrapper,
        areasWrapper = _this$elements11.areasWrapper;

    _this.toggleElementsVisibility({
      elements: [imageSettingsWrapper],
      shouldBeShown: true
    });

    _this.toggleElementsVisibility({
      elements: [areasWrapper]
    });
  });

  this.question = question;
  this.elements = {
    imageSrcInput: document.getElementById('src'),
    imageWidthInput: document.getElementById('width'),
    haveScalesInput: document.getElementById('haveScales'),
    activateMinNumberInput: document.getElementById('activateMinNumber'),
    activateMaxNumberInput: document.getElementById('activateMaxNumber'),
    minNumberOfAnswersInput: document.getElementById('minNumberOfAnswers'),
    maxNumberOfAnswersInput: document.getElementById('maxNumberOfAnswers'),
    changeImageBtn: document.getElementById('change-image-btn'),
    drawImageBtn: document.getElementById('draw-image-btn'),
    saveChangesBtn: document.getElementById('save-changes-btn'),
    imageSettingsWrapper: document.getElementById('image-settings'),
    areasWrapper: document.getElementById('areas'),
    heatmapWrapper: document.getElementById('heatmap-wrapper')
  };
  this.showImage = false;
  this.render();
};


// CONCATENATED MODULE: ./dev/designer-entry.js



if (window && !window.customQuestionsLibrary) {
  window.customQuestionsLibrary = {};
}

window.customQuestionsLibrary.HeatmapDesigner = HeatmapDesigner;
window.customQuestionsLibrary.Designer = Designer;

/***/ })
/******/ ]);
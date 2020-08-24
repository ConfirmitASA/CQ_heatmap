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
      _onAreasChanged = _ref.onAreasChanged,
      _onImageError = _ref.onImageError;

  _classCallCheck(this, HeatmapDesigner);

  _defineProperty(this, "init", function () {
    return _this.render();
  });

  _defineProperty(this, "render", function () {
    var wrapper = _this.wrapper,
        imageOptions = _this.imageOptions,
        id = _this.id,
        predefinedAreas = _this.predefinedAreas,
        onAreasChanged = _this.onAreasChanged,
        onImageError = _this.onImageError;
    var src = imageOptions.src,
        width = imageOptions.width;
    var image = document.createElement("img");
    image.src = src;
    image.style.width = width;
    image.addEventListener('error', onImageError);
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
  this.onImageError = _onImageError;
  this.wrapper = document.querySelector("#" + this.id);
  this.init();
};


// CONCATENATED MODULE: ./dev/components/InputsWrapper.js
var InputsWrapper = function InputsWrapper(_ref) {
  var id = _ref.id,
      wrapperClass = _ref.wrapperClass,
      inputs = _ref.inputs;

  var createWrapper = function createWrapper(_ref2) {
    var id = _ref2.id,
        wrapperClass = _ref2.wrapperClass;
    var wrapper = document.createElement("div");
    wrapper.classList.add(wrapperClass);
    wrapper.classList.add("node-input-area");
    wrapper.id = id;
    var gridTemplateColumns = "";
    inputs.forEach(function () {
      gridTemplateColumns += "auto ";
    });
    wrapper.style.gridTemplateColumns = gridTemplateColumns + "minmax(0, 1fr)";
    return wrapper;
  }; // const createDeleteButton = () => {
  //     const button = document.createElement("button");
  //     button.classList.add("sd-temp-icon-button");
  //     button.classList.add("custom-scale-item__delete");
  //     button.style.paddingTop = "4px";
  //     button.innerHTML = `
  //         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="answerlist__btn-delete-answer-icon" fill="rgba(18, 24, 33, 0.6)">
  //             <path d="M7.91 23.45h9.82c.53 0 1.64-1.16 1.64-3.27v-13H4.64v13a2.93 2.93 0 0 0 3.27 3.27zm8.18-21.27L14.45.55H9.54L7.91 2.18H3v3.24h18V2.18z"></path>
  //         </svg>
  //     `;
  //     button.addEventListener('click', onDeleteButtonClick);
  //     return button;
  // };


  var createInput = function createInput(_ref3) {
    var sizeClass = _ref3.sizeClass,
        wrapperClass = _ref3.wrapperClass,
        type = _ref3.type,
        onInputsChange = _ref3.onInputsChange;
    var input = document.createElement("input");
    input.classList.add("node-input-area__input");
    input.classList.add("form-control");
    input.classList.add("form-input");
    input.classList.add(wrapperClass);
    input.classList.add(sizeClass);
    input.type = type;
    input.addEventListener('change', onInputsChange);
    return input;
  }; // const onDeleteButtonClick = () => {
  //     wrapper.remove();
  // };


  var wrapper = createWrapper({
    id: id,
    wrapperClass: wrapperClass
  }); // const button = createDeleteButton();
  // wrapper.appendChild(button);

  inputs.forEach(function (inputOptions) {
    var sizeClass = inputOptions.sizeClass,
        wrapperClass = inputOptions.wrapperClass,
        type = inputOptions.type,
        onInputsChange = inputOptions.onInputsChange,
        defaultValue = inputOptions.defaultValue;
    var input = createInput({
      sizeClass: sizeClass,
      wrapperClass: wrapperClass,
      type: type,
      onInputsChange: onInputsChange
    });

    if (defaultValue) {
      input.value = defaultValue;
    }

    wrapper.appendChild(input);
  });
  return wrapper;
};
// CONCATENATED MODULE: ./dev/components/CustomScaleItem.js

var CustomScaleItem_CustomScaleItem = function CustomScaleItem(_ref) {
  var id = _ref.id,
      onInputsChange = _ref.onInputsChange,
      defaultValue = _ref.defaultValue;
  var inputs = [{
    wrapperClass: "custom-scale-item__color",
    sizeClass: "form-input--2ch",
    type: "color",
    onInputsChange: onInputsChange,
    defaultValue: defaultValue ? defaultValue.color : undefined
  }, {
    wrapperClass: "custom-scale-item__code",
    sizeClass: "form-input--8ch",
    type: "text",
    onInputsChange: onInputsChange,
    defaultValue: defaultValue ? defaultValue.code : undefined
  }, {
    wrapperClass: "custom-scale-item__label",
    sizeClass: "form-input--40ch",
    type: "text",
    onInputsChange: onInputsChange,
    defaultValue: defaultValue ? defaultValue.label : undefined
  }];
  return new InputsWrapper({
    id: id,
    wrapperClass: "custom-scale-item",
    inputs: inputs
  });
};
// CONCATENATED MODULE: ./dev/HeatmapDesignerManager.js
function HeatmapDesignerManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function HeatmapDesignerManager_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var HeatmapDesignerManager_HeatmapDesignerManager = function HeatmapDesignerManager(_ref) {
  var _this = this;

  var question = _ref.question;

  HeatmapDesignerManager_classCallCheck(this, HeatmapDesignerManager);

  HeatmapDesignerManager_defineProperty(this, "render", function () {
    _this.question.onSettingsReceived = _this.setValuesFromSettings;

    _this.setDefaultAttributes();

    _this.setupImageInputs();

    _this.setupImageButtons();

    _this.setupSavingElements();

    _this.setupScaleElements();

    _this.setupMinMaxInputs();

    _this.connectMinMaxInputs();
  });

  HeatmapDesignerManager_defineProperty(this, "setDefaultAttributes", function () {
    var _this$elements = _this.elements,
        areasWrapper = _this$elements.areasWrapper,
        activateScalesWrapper = _this$elements.activateScalesWrapper,
        customScalesWrapper = _this$elements.customScalesWrapper,
        minNumberOfAnswersInput = _this$elements.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements.maxNumberOfAnswersInput,
        imageWidthInput = _this$elements.imageWidthInput;

    _this.toggleElementsVisibility({
      elements: [areasWrapper, activateScalesWrapper, customScalesWrapper]
    });

    _this.toggleElementsDisabling({
      elements: [maxNumberOfAnswersInput, minNumberOfAnswersInput],
      shouldBeDisabled: true
    });

    minNumberOfAnswersInput.setAttribute("min", 1);
    maxNumberOfAnswersInput.setAttribute("min", 1);
    imageWidthInput.setAttribute("min", 1);
  });

  HeatmapDesignerManager_defineProperty(this, "setValuesFromSettings", function (settings) {
    var _this$elements2 = _this.elements,
        imageSrcInput = _this$elements2.imageSrcInput,
        imageWidthInput = _this$elements2.imageWidthInput,
        haveScalesInput = _this$elements2.haveScalesInput,
        activateScalesWrapper = _this$elements2.activateScalesWrapper,
        activateDefaultScalesInput = _this$elements2.activateDefaultScalesInput,
        activateCustomScalesInput = _this$elements2.activateCustomScalesInput,
        customScalesWrapper = _this$elements2.customScalesWrapper,
        scalesNumberInput = _this$elements2.scalesNumberInput,
        activateMaxNumberInput = _this$elements2.activateMaxNumberInput,
        activateMinNumberInput = _this$elements2.activateMinNumberInput,
        maxNumberOfAnswersInput = _this$elements2.maxNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements2.minNumberOfAnswersInput,
        areasWrapper = _this$elements2.areasWrapper;
    var imageOptions = settings.imageOptions,
        haveScales = settings.haveScales,
        scaleType = settings.scaleType,
        customScales = settings.customScales,
        answersCount = settings.answersCount,
        areas = settings.areas;

    if (imageOptions) {
      imageSrcInput.value = imageOptions.src;
      imageWidthInput.value = imageOptions.width;

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

    haveScalesInput.checked = haveScales;

    _this.toggleElementsVisibility({
      elements: [activateScalesWrapper],
      shouldBeShown: haveScales
    });

    activateDefaultScalesInput.checked = scaleType === "default";
    activateCustomScalesInput.checked = scaleType === "custom";

    if (haveScales && scaleType === "custom") {
      scalesNumberInput.value = customScales.length;

      _this.createScaleItems({
        defaultValues: customScales
      });
    }

    _this.toggleElementsVisibility({
      elements: [customScalesWrapper],
      shouldBeShown: haveScales && scaleType === "custom"
    });

    if (answersCount.max) {
      maxNumberOfAnswersInput.value = answersCount.max;
      activateMaxNumberInput.checked = true;
    }

    _this.toggleElementsDisabling({
      elements: [maxNumberOfAnswersInput],
      shouldBeDisabled: !answersCount.max
    });

    if (answersCount.min) {
      minNumberOfAnswersInput.value = answersCount.min;
      activateMinNumberInput.checked = true;
    }

    _this.toggleElementsDisabling({
      elements: [minNumberOfAnswersInput],
      shouldBeDisabled: !answersCount.min
    });

    maxNumberOfAnswersInput.setAttribute("max", areas.length);
  });

  HeatmapDesignerManager_defineProperty(this, "drawImage", function (_ref2) {
    var settings = _ref2.settings;
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

    _this.hasErrors = false;

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

  HeatmapDesignerManager_defineProperty(this, "setupImageInputs", function () {
    var _this$elements5 = _this.elements,
        imageSrcInput = _this$elements5.imageSrcInput,
        imageWidthInput = _this$elements5.imageWidthInput;
    imageSrcInput.addEventListener('change', _this.onImageInputsChange);
    imageWidthInput.addEventListener('change', _this.onImageInputsChange);
  });

  HeatmapDesignerManager_defineProperty(this, "onImageInputsChange", function () {
    var heatmapWrapper = _this.elements.heatmapWrapper;
    _this.showImage = true;
    heatmapWrapper.innerHTML = "";
  });

  HeatmapDesignerManager_defineProperty(this, "setupImageButtons", function () {
    var _this$elements6 = _this.elements,
        drawImageBtn = _this$elements6.drawImageBtn,
        changeImageBtn = _this$elements6.changeImageBtn;
    drawImageBtn.addEventListener('click', _this.drawImage);
    changeImageBtn.addEventListener('click', _this.showImageSettings);
  });

  HeatmapDesignerManager_defineProperty(this, "setupSavingElements", function () {
    var _this$elements7 = _this.elements,
        saveChangesBtn = _this$elements7.saveChangesBtn,
        haveScalesInput = _this$elements7.haveScalesInput,
        activateDefaultScalesInput = _this$elements7.activateDefaultScalesInput,
        activateCustomScalesInput = _this$elements7.activateCustomScalesInput,
        minNumberOfAnswersInput = _this$elements7.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements7.maxNumberOfAnswersInput,
        activateMinNumberInput = _this$elements7.activateMinNumberInput,
        activateMaxNumberInput = _this$elements7.activateMaxNumberInput;
    saveChangesBtn.addEventListener('click', _this.saveChanges);
    haveScalesInput.addEventListener('change', _this.saveChanges);
    activateDefaultScalesInput.addEventListener('change', _this.saveChanges);
    activateCustomScalesInput.addEventListener('change', _this.saveChanges);
    minNumberOfAnswersInput.addEventListener('change', _this.saveChanges);
    maxNumberOfAnswersInput.addEventListener('change', _this.saveChanges);
    activateMinNumberInput.addEventListener('change', _this.saveChanges);
    activateMaxNumberInput.addEventListener('change', _this.saveChanges);
  });

  HeatmapDesignerManager_defineProperty(this, "saveChanges", function () {
    var _this$elements8 = _this.elements,
        imageSrcInput = _this$elements8.imageSrcInput,
        imageWidthInput = _this$elements8.imageWidthInput,
        activateMaxNumberInput = _this$elements8.activateMaxNumberInput,
        activateMinNumberInput = _this$elements8.activateMinNumberInput,
        maxNumberOfAnswersInput = _this$elements8.maxNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements8.minNumberOfAnswersInput,
        haveScalesInput = _this$elements8.haveScalesInput,
        activateCustomScalesInput = _this$elements8.activateCustomScalesInput;
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

    if (haveScalesInput.checked) {
      settings.scaleType = activateCustomScalesInput.checked ? "custom" : "default";

      if (activateCustomScalesInput.checked) {
        settings.customScales = [];
        var customScaleItems = document.querySelectorAll(".custom-scale-item");
        customScaleItems.forEach(function (item) {
          settings.customScales.push({
            color: item.querySelector(".custom-scale-item__color").value,
            code: item.querySelector(".custom-scale-item__code").value,
            type: item.querySelector(".custom-scale-item__code").value,
            label: item.querySelector(".custom-scale-item__label").value
          });
        });
      }
    }

    _this.question.saveChanges(settings, _this.hasErrors);
  });

  HeatmapDesignerManager_defineProperty(this, "setupScaleElements", function () {
    var _this$elements9 = _this.elements,
        haveScalesInput = _this$elements9.haveScalesInput,
        activateScalesWrapper = _this$elements9.activateScalesWrapper,
        activateDefaultScalesInput = _this$elements9.activateDefaultScalesInput,
        activateCustomScalesInput = _this$elements9.activateCustomScalesInput,
        customScalesWrapper = _this$elements9.customScalesWrapper,
        scalesNumberInput = _this$elements9.scalesNumberInput;
    haveScalesInput.addEventListener('change', function () {
      _this.toggleElementsVisibility({
        elements: [activateScalesWrapper],
        shouldBeShown: haveScalesInput.checked
      });

      activateDefaultScalesInput.checked = !activateDefaultScalesInput.checked && !activateCustomScalesInput.checked && haveScalesInput.checked;
    });
    activateDefaultScalesInput.addEventListener('change', function () {
      activateDefaultScalesInput.checked = true;
      activateCustomScalesInput.checked = false;

      _this.toggleElementsVisibility({
        elements: [customScalesWrapper]
      });
    });
    activateCustomScalesInput.addEventListener('change', function () {
      activateDefaultScalesInput.checked = false;
      activateCustomScalesInput.checked = true;

      _this.toggleElementsVisibility({
        elements: [customScalesWrapper],
        shouldBeShown: true
      });
    });
    scalesNumberInput.addEventListener('change', _this.createScaleItems);
  });

  HeatmapDesignerManager_defineProperty(this, "createScaleItems", function (_ref3) {
    var defaultValues = _ref3.defaultValues;
    var _this$elements10 = _this.elements,
        scalesNumberInput = _this$elements10.scalesNumberInput,
        customScaleListWrapper = _this$elements10.customScaleListWrapper;
    var scaleItems = customScaleListWrapper.querySelectorAll(".custom-scale-item");
    var scalesNumberInputValue = parseInt(scalesNumberInput.value);

    if (scaleItems.length === scalesNumberInputValue) {
      return;
    }

    if (scaleItems.length < scalesNumberInputValue) {
      for (var i = 1; i <= scalesNumberInputValue - scaleItems.length; i++) {
        customScaleListWrapper.appendChild(new CustomScaleItem_CustomScaleItem({
          id: "custom-scale-item".concat(scaleItems.length + i),
          onInputsChange: _this.saveChanges,
          defaultValue: defaultValues ? defaultValues[i - 1] : undefined
        }));
      }
    } else {
      scaleItems.forEach(function (item, index) {
        if (index + 1 > scalesNumberInputValue) {
          item.remove();
        }
      });
    }
  });

  HeatmapDesignerManager_defineProperty(this, "setupMinMaxInputs", function () {
    var _this$elements11 = _this.elements,
        activateMinNumberInput = _this$elements11.activateMinNumberInput,
        activateMaxNumberInput = _this$elements11.activateMaxNumberInput,
        minNumberOfAnswersInput = _this$elements11.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements11.maxNumberOfAnswersInput;
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

  HeatmapDesignerManager_defineProperty(this, "connectMinMaxInputs", function () {
    var _this$elements12 = _this.elements,
        minNumberOfAnswersInput = _this$elements12.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements12.maxNumberOfAnswersInput;
    minNumberOfAnswersInput.addEventListener('change', function () {
      var minValue = minNumberOfAnswersInput.value;
      maxNumberOfAnswersInput.setAttribute("min", minValue);
    });
    maxNumberOfAnswersInput.addEventListener('change', function () {
      var maxValue = maxNumberOfAnswersInput.value;
      minNumberOfAnswersInput.setAttribute("max", maxValue);
    });
  });

  HeatmapDesignerManager_defineProperty(this, "showImageSettings", function () {
    var _this$elements13 = _this.elements,
        imageSettingsWrapper = _this$elements13.imageSettingsWrapper,
        areasWrapper = _this$elements13.areasWrapper;

    _this.toggleElementsVisibility({
      elements: [imageSettingsWrapper],
      shouldBeShown: true
    });

    _this.toggleElementsVisibility({
      elements: [areasWrapper]
    });
  });

  HeatmapDesignerManager_defineProperty(this, "toggleElementsVisibility", function (_ref4) {
    var elements = _ref4.elements,
        shouldBeShown = _ref4.shouldBeShown;
    elements.forEach(function (element) {
      element.style.display = shouldBeShown ? "" : "none";
    });
  });

  HeatmapDesignerManager_defineProperty(this, "toggleElementsDisabling", function (_ref5) {
    var elements = _ref5.elements,
        shouldBeDisabled = _ref5.shouldBeDisabled;
    elements.forEach(function (element) {
      element.disabled = !!shouldBeDisabled;
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
    activateDefaultScalesInput: document.getElementById('activateDefaultScales'),
    activateCustomScalesInput: document.getElementById('activateCustomScales'),
    scalesNumberInput: document.getElementById('scalesNumber'),
    changeImageBtn: document.getElementById('change-image-btn'),
    drawImageBtn: document.getElementById('draw-image-btn'),
    saveChangesBtn: document.getElementById('save-changes-btn'),
    imageSettingsWrapper: document.getElementById('image-settings'),
    areasWrapper: document.getElementById('areas'),
    heatmapWrapper: document.getElementById('heatmap-wrapper'),
    activateScalesWrapper: document.getElementById('activateScales'),
    customScalesWrapper: document.getElementById('customScales'),
    customScaleListWrapper: document.getElementById('customScaleList')
  };
  this.showImage = false;
  this.hasErrors = false;
  this.render();
};


// CONCATENATED MODULE: ./dev/designer-entry.js



if (window && !window.customQuestionsLibrary) {
  window.customQuestionsLibrary = {};
}

window.customQuestionsLibrary.HeatmapDesigner = HeatmapDesigner;
window.customQuestionsLibrary.HeatmapDesignerManager = HeatmapDesignerManager_HeatmapDesignerManager;

/***/ })
/******/ ]);
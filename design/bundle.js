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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./dev/designer/HeatmapDesigner.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HeatmapDesigner = function HeatmapDesigner(_ref) {
  var _this = this;

  var wrapperId = _ref.wrapperId,
      _imageOptions = _ref.imageOptions,
      _predefinedAreas = _ref.predefinedAreas,
      _onAreasChanged = _ref.onAreasChanged,
      _onAreasInit = _ref.onAreasInit;

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
        onAreasInit = _this.onAreasInit;
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
      onLoaded: onAreasInit,
      onChanging: null,
      onChanged: onAreasChanged
    });
    return image;
  });

  this.id = wrapperId;
  this.imageOptions = _imageOptions;
  this.predefinedAreas = _predefinedAreas;
  this.onAreasChanged = _onAreasChanged;
  this.onAreasInit = _onAreasInit;
  this.wrapper = document.querySelector("#" + this.id);
  this.init();
};


// CONCATENATED MODULE: ./dev/components/InputWrapper.js
var InputWrapper = function InputWrapper(_ref) {
  var id = _ref.id,
      wrapperClass = _ref.wrapperClass,
      components = _ref.components;

  var createWrapper = function createWrapper(_ref2) {
    var id = _ref2.id,
        wrapperClass = _ref2.wrapperClass;
    var wrapper = document.createElement("tr");
    wrapper.classList.add(wrapperClass);
    wrapper.classList.add("inputlist__item");
    wrapper.id = id;
    return wrapper;
  };

  var createComponent = function createComponent(_ref3) {
    var tag = _ref3.tag,
        classes = _ref3.classes,
        inputType = _ref3.inputType,
        onInputChange = _ref3.onInputChange,
        inputDefaultValue = _ref3.inputDefaultValue,
        labelText = _ref3.labelText;
    var column = document.createElement("td");
    column.classList.add("inputlist__column");
    var component = document.createElement(tag);
    classes.forEach(function (className) {
      component.classList.add(className);
    });

    switch (tag) {
      case "input":
        component.type = inputType;
        component.addEventListener('change', onInputChange);

        if (inputDefaultValue) {
          component.value = inputDefaultValue;
        }

        break;

      case "label":
        if (labelText) {
          component.innerText = labelText;
        }

        break;
    }

    column.appendChild(component);
    return column;
  };

  var wrapper = createWrapper({
    id: id,
    wrapperClass: wrapperClass
  });
  components.forEach(function (options) {
    var tag = options.tag,
        classes = options.classes,
        inputType = options.inputType,
        onInputChange = options.onInputChange,
        inputDefaultValue = options.inputDefaultValue,
        labelText = options.labelText;
    var component = createComponent({
      tag: tag,
      classes: classes,
      inputType: inputType,
      onInputChange: onInputChange,
      inputDefaultValue: inputDefaultValue,
      labelText: labelText
    });
    wrapper.appendChild(component);
  });
  return wrapper;
};
// CONCATENATED MODULE: ./dev/components/CustomScaleItem.js

var CustomScaleItem_CustomScaleItem = function CustomScaleItem(_ref) {
  var id = _ref.id,
      onInputChange = _ref.onInputChange,
      defaultValue = _ref.defaultValue;
  var components = [{
    tag: "input",
    classes: ["custom-scale-item__color", "form-input", "form-input--2ch"],
    inputType: "color",
    onInputChange: onInputChange,
    inputDefaultValue: defaultValue ? defaultValue.color : undefined
  }, {
    tag: "input",
    classes: ["custom-scale-item__code", "form-input", "form-input--8ch"],
    inputType: "text",
    onInputChange: onInputChange,
    inputDefaultValue: defaultValue ? defaultValue.code : undefined
  }, {
    tag: "input",
    classes: ["custom-scale-item__label", "form-input", "form-input--40ch"],
    inputType: "text",
    onInputChange: onInputChange,
    inputDefaultValue: defaultValue ? defaultValue.label : undefined
  }];
  return new InputWrapper({
    id: id,
    wrapperClass: "custom-scale-item",
    components: components
  });
};
// CONCATENATED MODULE: ./dev/components/AreaTextItem.js

var AreaTextItem_AreaTextItem = function AreaTextItem(_ref) {
  var id = _ref.id,
      onInputChange = _ref.onInputChange,
      defaultValue = _ref.defaultValue,
      labelText = _ref.labelText;
  var components = [{
    tag: "label",
    classes: [],
    labelText: labelText
  }, {
    tag: "input",
    classes: ["area-text-item__text", "form-input", "form-input--40ch"],
    inputType: "text",
    onInputChange: onInputChange,
    inputDefaultValue: defaultValue
  }];
  return new InputWrapper({
    id: id,
    wrapperClass: "area-text-item",
    components: components
  });
};
// CONCATENATED MODULE: ./dev/designer/HeatmapDesignerManager.js
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

    _this.setupMinMaxEqualInputs();

    _this.connectMinMaxInputs();

    _this.setupAdditionalStyles();
  });

  HeatmapDesignerManager_defineProperty(this, "setDefaultAttributes", function () {
    var _this$elements = _this.elements,
        areasWrapper = _this$elements.areasWrapper,
        imageWidthInput = _this$elements.imageWidthInput,
        activateScalesWrapper = _this$elements.activateScalesWrapper,
        customScalesWrapper = _this$elements.customScalesWrapper,
        customScaleListWrapper = _this$elements.customScaleListWrapper,
        equalToNumberOfAnswersInput = _this$elements.equalToNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements.maxNumberOfAnswersInput,
        areaHoverColorInput = _this$elements.areaHoverColorInput,
        areaBorderWidthInput = _this$elements.areaBorderWidthInput,
        areaBorderColorInput = _this$elements.areaBorderColorInput;

    _this.toggleElementsVisibility({
      elements: [areasWrapper, activateScalesWrapper, customScalesWrapper, customScaleListWrapper, equalToNumberOfAnswersInput.parentNode.parentNode, areaBorderWidthInput.parentNode.parentNode, areaBorderColorInput.parentNode.parentNode]
    });

    areaHoverColorInput.value = "#ffffff";
    minNumberOfAnswersInput.setAttribute("min", 1);
    maxNumberOfAnswersInput.setAttribute("min", 1);
    imageWidthInput.setAttribute("min", 1);
  });

  HeatmapDesignerManager_defineProperty(this, "setValuesFromSettings", function (settings) {
    var _this$elements2 = _this.elements,
        answerOptionsWrapper = _this$elements2.answerOptionsWrapper,
        imageSrcInput = _this$elements2.imageSrcInput,
        imageWidthInput = _this$elements2.imageWidthInput,
        haveScalesInput = _this$elements2.haveScalesInput,
        activateScalesWrapper = _this$elements2.activateScalesWrapper,
        activateDefaultScalesInput = _this$elements2.activateDefaultScalesInput,
        activateCustomScalesInput = _this$elements2.activateCustomScalesInput,
        customScalesWrapper = _this$elements2.customScalesWrapper,
        customScaleListWrapper = _this$elements2.customScaleListWrapper,
        scalesNumberInput = _this$elements2.scalesNumberInput,
        typeForNumberOfAnswersSelector = _this$elements2.typeForNumberOfAnswersSelector,
        equalToNumberOfAnswersInput = _this$elements2.equalToNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements2.maxNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements2.minNumberOfAnswersInput,
        areasWrapper = _this$elements2.areasWrapper,
        areaHighlighterSelector = _this$elements2.areaHighlighterSelector,
        areaHoverColorInput = _this$elements2.areaHoverColorInput,
        areaBorderColorInput = _this$elements2.areaBorderColorInput,
        areaBorderWidthInput = _this$elements2.areaBorderWidthInput;
    var imageOptions = settings.imageOptions,
        areas = settings.areas,
        haveScales = settings.haveScales,
        scaleType = settings.scaleType,
        customScales = settings.customScales,
        answersCount = settings.answersCount,
        styles = settings.styles;

    if (haveScales || answersCount.type === "equal" && answersCount.equal || answersCount.type === "min-max" && (answersCount.min || answersCount.max)) {
      answerOptionsWrapper.querySelector("header").click();
    }

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

    _this.toggleElementsVisibility({
      elements: [customScaleListWrapper],
      shouldBeShown: haveScales && scaleType === "custom" && customScales.length > 0
    });

    if (answersCount.type === "equal") {
      typeForNumberOfAnswersSelector[0].selected = true;
    } else {
      typeForNumberOfAnswersSelector[1].selected = true;
    }

    _this.toggleElementsVisibility({
      elements: [equalToNumberOfAnswersInput.parentNode.parentNode],
      shouldBeShown: answersCount.type === "equal"
    });

    _this.toggleElementsVisibility({
      elements: [minNumberOfAnswersInput.parentNode.parentNode, maxNumberOfAnswersInput.parentNode.parentNode],
      shouldBeShown: answersCount.type === "min-max"
    });

    if (answersCount.equal) {
      equalToNumberOfAnswersInput.value = answersCount.equal;
    }

    if (answersCount.max) {
      maxNumberOfAnswersInput.value = answersCount.max;
    }

    if (answersCount.min) {
      minNumberOfAnswersInput.value = answersCount.min;
    }

    maxNumberOfAnswersInput.setAttribute("max", areas.length);

    if (styles && styles.areaHighlight) {
      if (styles.areaHighlight.type === "border") {
        areaHighlighterSelector[1].selected = true;
      } else {
        areaHighlighterSelector[0].selected = true;
      }

      if (styles.areaHighlight.color) {
        areaHoverColorInput.value = styles.areaHighlight.color;
      } else {
        areaHoverColorInput.value = "#ffffff";
      }

      if (styles.areaHighlight.border) {
        if (styles.areaHighlight.border.width) {
          areaBorderWidthInput.value = styles.areaHighlight.border.width;
        }

        if (styles.areaHighlight.border.color) {
          areaBorderColorInput.value = styles.areaHighlight.border.color;
        }
      }
    }

    _this.toggleElementsVisibility({
      elements: [areaHoverColorInput.parentNode.parentNode],
      shouldBeShown: !styles || !styles.areaHighlight || styles.areaHighlight.type === "color"
    });

    _this.toggleElementsVisibility({
      elements: [areaBorderWidthInput.parentNode.parentNode, areaBorderColorInput.parentNode.parentNode],
      shouldBeShown: styles && styles.areaHighlight && styles.areaHighlight.type === "border"
    });
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
            _this.createAreaTextItems({});

            _this.setAreaIndexesAndClick();

            _this.saveChanges();
          },
          onAreasInit: function onAreasInit() {
            _this.createAreaTextItems({
              defaultValues: areas.reverse().map(function (area) {
                return area.title;
              })
            });

            _this.setAreaIndexesAndClick();
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

  HeatmapDesignerManager_defineProperty(this, "createAreaTextItems", function (_ref3) {
    var defaultValues = _ref3.defaultValues;
    var areaTextListWrapper = _this.elements.areaTextListWrapper;
    var areasCount = defaultValues ? defaultValues.length : $("#heatmap-wrapper img").selectAreas('areas').length;
    var areaTextItems = areaTextListWrapper.querySelectorAll(".area-text-item");

    if (areaTextItems.length === areasCount) {
      return;
    }

    if (areaTextItems.length < areasCount) {
      for (var i = 1; i <= areasCount - areaTextItems.length; i++) {
        areaTextListWrapper.appendChild(new AreaTextItem_AreaTextItem({
          id: "area-text-item".concat(areaTextItems.length + i),
          onInputChange: _this.saveChanges,
          defaultValue: defaultValues ? defaultValues[i - 1] : undefined,
          labelText: areaTextItems.length + i
        }));
      }
    } else {
      areaTextItems.forEach(function (item, index) {
        if (index + 1 > areasCount) {
          item.remove();
        }
      });
    }
  });

  HeatmapDesignerManager_defineProperty(this, "setAreaIndexesAndClick", function () {
    var _this$elements5 = _this.elements,
        heatmapWrapper = _this$elements5.heatmapWrapper,
        areaTextListWrapper = _this$elements5.areaTextListWrapper;
    var areaNodes = Array.prototype.slice.call(heatmapWrapper.querySelectorAll(".select-areas-background-area")).reverse();
    areaNodes.forEach(function (area, index) {
      var areaIndex = index + 1;
      var areaTextInput = areaTextListWrapper.querySelector("#area-text-item".concat(areaIndex, " input"));
      areaTextInput.setAttribute("disabled", "disabled");
      area.setAttribute("area-index", areaIndex);
      area.addEventListener('click', function () {
        var deleteButton = area.nextSibling;

        if (deleteButton.style.display === "none") {
          areaTextInput.setAttribute("disabled", "disabled");
        } else {
          areaTextInput.removeAttribute("disabled");
          areaTextInput.focus();
        }
      });
    });
  });

  HeatmapDesignerManager_defineProperty(this, "setupImageInputs", function () {
    var _this$elements6 = _this.elements,
        imageSrcInput = _this$elements6.imageSrcInput,
        imageWidthInput = _this$elements6.imageWidthInput;
    imageSrcInput.addEventListener('change', _this.onImageInputsChange);
    imageWidthInput.addEventListener('change', _this.onImageInputsChange);
  });

  HeatmapDesignerManager_defineProperty(this, "onImageInputsChange", function () {
    var heatmapWrapper = _this.elements.heatmapWrapper;
    _this.showImage = true;
    heatmapWrapper.innerHTML = "";
  });

  HeatmapDesignerManager_defineProperty(this, "setupImageButtons", function () {
    var _this$elements7 = _this.elements,
        drawImageBtn = _this$elements7.drawImageBtn,
        changeImageBtn = _this$elements7.changeImageBtn;
    drawImageBtn.addEventListener('click', _this.drawImage);
    changeImageBtn.addEventListener('click', _this.showImageSettings);
  });

  HeatmapDesignerManager_defineProperty(this, "setupSavingElements", function () {
    var _this$elements8 = _this.elements,
        haveScalesInput = _this$elements8.haveScalesInput,
        activateDefaultScalesInput = _this$elements8.activateDefaultScalesInput,
        activateCustomScalesInput = _this$elements8.activateCustomScalesInput,
        typeForNumberOfAnswersSelector = _this$elements8.typeForNumberOfAnswersSelector,
        equalToNumberOfAnswersInput = _this$elements8.equalToNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements8.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements8.maxNumberOfAnswersInput,
        areaHighlighterSelector = _this$elements8.areaHighlighterSelector,
        areaHoverColorInput = _this$elements8.areaHoverColorInput,
        areaBorderWidthInput = _this$elements8.areaBorderWidthInput,
        areaBorderColorInput = _this$elements8.areaBorderColorInput;
    haveScalesInput.addEventListener('change', _this.saveChanges);
    activateDefaultScalesInput.addEventListener('change', _this.saveChanges);
    activateCustomScalesInput.addEventListener('change', _this.saveChanges);
    typeForNumberOfAnswersSelector.addEventListener('change', _this.saveChanges);
    equalToNumberOfAnswersInput.addEventListener('change', _this.saveChanges);
    minNumberOfAnswersInput.addEventListener('change', _this.saveChanges);
    maxNumberOfAnswersInput.addEventListener('change', _this.saveChanges);
    areaHighlighterSelector.addEventListener('change', _this.saveChanges);
    areaHoverColorInput.addEventListener('change', _this.saveChanges);
    areaBorderWidthInput.addEventListener('change', _this.saveChanges);
    areaBorderColorInput.addEventListener('change', _this.saveChanges);
  });

  HeatmapDesignerManager_defineProperty(this, "saveChanges", function () {
    var _this$elements9 = _this.elements,
        imageSrcInput = _this$elements9.imageSrcInput,
        imageWidthInput = _this$elements9.imageWidthInput,
        areaTextListWrapper = _this$elements9.areaTextListWrapper,
        typeForNumberOfAnswersSelector = _this$elements9.typeForNumberOfAnswersSelector,
        equalToNumberOfAnswersInput = _this$elements9.equalToNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements9.maxNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements9.minNumberOfAnswersInput,
        haveScalesInput = _this$elements9.haveScalesInput,
        activateCustomScalesInput = _this$elements9.activateCustomScalesInput,
        areaHighlighterSelector = _this$elements9.areaHighlighterSelector,
        areaHoverColorInput = _this$elements9.areaHoverColorInput,
        areaBorderWidthInput = _this$elements9.areaBorderWidthInput,
        areaBorderColorInput = _this$elements9.areaBorderColorInput;
    var heatmapImageJQ = $("#heatmap-wrapper img");
    var typeForNumberOfAnswers = typeForNumberOfAnswersSelector[0].selected ? "equal" : "min-max";
    var areaHighlighterType = areaHighlighterSelector[1].selected ? "border" : "color";
    var settings = {
      imageOptions: {
        src: imageSrcInput.value,
        width: imageWidthInput.value
      },
      areas: heatmapImageJQ.length > 0 ? heatmapImageJQ.selectAreas('areas') : [],
      answersCount: {
        type: typeForNumberOfAnswers,
        equal: typeForNumberOfAnswers === "equal" && equalToNumberOfAnswersInput.value ? equalToNumberOfAnswersInput.value : undefined,
        max: typeForNumberOfAnswers === "min-max" && maxNumberOfAnswersInput.value ? maxNumberOfAnswersInput.value : undefined,
        min: typeForNumberOfAnswers === "min-max" && minNumberOfAnswersInput.value ? minNumberOfAnswersInput.value : undefined
      },
      haveScales: haveScalesInput.checked,
      styles: areaHighlighterType && (areaHoverColorInput.value || areaBorderWidthInput.value || areaBorderColorInput.value) ? {
        areaHighlight: {
          type: areaHighlighterType,
          color: areaHighlighterType === "color" && areaHoverColorInput.value ? areaHoverColorInput.value : undefined,
          border: areaHighlighterType === "border" && (areaBorderWidthInput.value || areaBorderColorInput.value) ? {
            width: areaBorderWidthInput.value ? areaBorderWidthInput.value : undefined,
            color: areaBorderColorInput.value ? areaBorderColorInput.value : undefined
          } : undefined
        }
      } : undefined
    };
    var areaTextItems = areaTextListWrapper.querySelectorAll(".area-text-item__text");
    settings.areas.forEach(function (area, index) {
      var textIndex = areaTextItems.length - index - 1;

      if (areaTextItems[textIndex]) {
        area.title = areaTextItems[textIndex].value;
      }
    });

    if (haveScalesInput.checked) {
      settings.scaleType = activateCustomScalesInput.checked ? "custom" : "default";

      if (activateCustomScalesInput.checked) {
        settings.customScales = [];
        var customScaleItems = document.querySelectorAll(".custom-scale-item");
        customScaleItems.forEach(function (item, index) {
          var color = item.querySelector(".custom-scale-item__color").value;
          var code = item.querySelector(".custom-scale-item__code").value;
          var type = item.querySelector(".custom-scale-item__code").value;
          var label = item.querySelector(".custom-scale-item__label").value;
          settings.customScales.push({
            color: color,
            code: code ? code : index,
            type: type ? type : index,
            label: label ? label : index
          });
        });
      }
    }

    _this.question.saveChanges(settings, _this.hasErrors);
  });

  HeatmapDesignerManager_defineProperty(this, "setupScaleElements", function () {
    var _this$elements10 = _this.elements,
        haveScalesInput = _this$elements10.haveScalesInput,
        activateScalesWrapper = _this$elements10.activateScalesWrapper,
        activateDefaultScalesInput = _this$elements10.activateDefaultScalesInput,
        activateCustomScalesInput = _this$elements10.activateCustomScalesInput,
        customScalesWrapper = _this$elements10.customScalesWrapper,
        customScaleListWrapper = _this$elements10.customScaleListWrapper,
        scalesNumberInput = _this$elements10.scalesNumberInput;
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
    scalesNumberInput.addEventListener('change', function () {
      var scalesNumberInputValue = scalesNumberInput.value;

      _this.toggleElementsVisibility({
        elements: [customScaleListWrapper],
        shouldBeShown: scalesNumberInputValue
      });
    });
    scalesNumberInput.addEventListener('change', _this.createScaleItems);
  });

  HeatmapDesignerManager_defineProperty(this, "createScaleItems", function (_ref4) {
    var defaultValues = _ref4.defaultValues;
    var _this$elements11 = _this.elements,
        scalesNumberInput = _this$elements11.scalesNumberInput,
        customScaleList = _this$elements11.customScaleList;
    var scaleItems = customScaleList.querySelectorAll(".custom-scale-item");
    var scalesNumberInputValue = parseInt(scalesNumberInput.value);

    if (scaleItems.length === scalesNumberInputValue) {
      return;
    }

    if (scaleItems.length < scalesNumberInputValue) {
      for (var i = 1; i <= scalesNumberInputValue - scaleItems.length; i++) {
        customScaleList.appendChild(new CustomScaleItem_CustomScaleItem({
          id: "custom-scale-item".concat(scaleItems.length + i),
          onInputChange: _this.saveChanges,
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

  HeatmapDesignerManager_defineProperty(this, "setupMinMaxEqualInputs", function () {
    var _this$elements12 = _this.elements,
        typeForNumberOfAnswersSelector = _this$elements12.typeForNumberOfAnswersSelector,
        equalToNumberOfAnswersInput = _this$elements12.equalToNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements12.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements12.maxNumberOfAnswersInput;
    typeForNumberOfAnswersSelector.addEventListener('change', function (e) {
      var selector = e.target;

      _this.toggleElementsVisibility({
        elements: [equalToNumberOfAnswersInput.parentNode.parentNode],
        shouldBeShown: selector[0].selected
      });

      _this.toggleElementsVisibility({
        elements: [minNumberOfAnswersInput.parentNode.parentNode, maxNumberOfAnswersInput.parentNode.parentNode],
        shouldBeShown: selector[1].selected
      });
    });
  });

  HeatmapDesignerManager_defineProperty(this, "connectMinMaxInputs", function () {
    var _this$elements13 = _this.elements,
        minNumberOfAnswersInput = _this$elements13.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements13.maxNumberOfAnswersInput;
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
    var _this$elements14 = _this.elements,
        imageSettingsWrapper = _this$elements14.imageSettingsWrapper,
        areasWrapper = _this$elements14.areasWrapper;

    _this.toggleElementsVisibility({
      elements: [imageSettingsWrapper],
      shouldBeShown: true
    });

    _this.toggleElementsVisibility({
      elements: [areasWrapper]
    });
  });

  HeatmapDesignerManager_defineProperty(this, "setupAdditionalStyles", function () {
    var _this$elements15 = _this.elements,
        areaHighlighterSelector = _this$elements15.areaHighlighterSelector,
        areaHoverColorInput = _this$elements15.areaHoverColorInput,
        areaBorderWidthInput = _this$elements15.areaBorderWidthInput,
        areaBorderColorInput = _this$elements15.areaBorderColorInput;
    areaHighlighterSelector.addEventListener('change', function (e) {
      var selector = e.target;

      _this.toggleElementsVisibility({
        elements: [areaHoverColorInput.parentNode.parentNode],
        shouldBeShown: selector[0].selected
      });

      _this.toggleElementsVisibility({
        elements: [areaBorderWidthInput.parentNode.parentNode, areaBorderColorInput.parentNode.parentNode],
        shouldBeShown: selector[1].selected
      });
    });
  });

  HeatmapDesignerManager_defineProperty(this, "toggleElementsVisibility", function (_ref5) {
    var elements = _ref5.elements,
        shouldBeShown = _ref5.shouldBeShown;
    elements.forEach(function (element) {
      element.style.display = shouldBeShown ? "" : "none";
    });
  });

  HeatmapDesignerManager_defineProperty(this, "toggleElementsDisabling", function (_ref6) {
    var elements = _ref6.elements,
        shouldBeDisabled = _ref6.shouldBeDisabled;
    elements.forEach(function (element) {
      element.disabled = !!shouldBeDisabled;
    });
  });

  this.question = question;
  this.elements = {
    imageSrcInput: document.getElementById('imageSrc'),
    imageWidthInput: document.getElementById('imageWidth'),
    haveScalesInput: document.getElementById('haveScales'),
    equalToNumberOfAnswersInput: document.getElementById('number-of-responses__equal'),
    minNumberOfAnswersInput: document.getElementById('number-of-responses__min'),
    maxNumberOfAnswersInput: document.getElementById('number-of-responses__max'),
    activateDefaultScalesInput: document.getElementById('activateDefaultScales'),
    activateCustomScalesInput: document.getElementById('activateCustomScales'),
    scalesNumberInput: document.getElementById('scalesNumber'),
    areaHoverColorInput: document.getElementById('areaHoverColor'),
    areaBorderWidthInput: document.getElementById('areaBorderWidth'),
    areaBorderColorInput: document.getElementById('areaBorderColor'),
    typeForNumberOfAnswersSelector: document.getElementById('number-of-responses__type'),
    areaHighlighterSelector: document.getElementById('areaHighlighterSelector'),
    changeImageBtn: document.getElementById('change-image-btn'),
    drawImageBtn: document.getElementById('draw-image-btn'),
    imageSettingsWrapper: document.getElementById('image-settings'),
    areasWrapper: document.getElementById('areas'),
    areaTextListWrapper: document.getElementById('areaTextList'),
    heatmapWrapper: document.getElementById('heatmap-wrapper'),
    answerOptionsWrapper: document.getElementById('answerOptionsWrapper'),
    activateScalesWrapper: document.getElementById('activateScales'),
    customScalesWrapper: document.getElementById('customScales'),
    customScaleListWrapper: document.getElementById('customScaleListWrapper'),
    customScaleList: document.getElementById('customScaleList')
  };
  this.showImage = false;
  this.hasErrors = false;
  this.render();
};


// CONCATENATED MODULE: ./dev/designer/entry.js



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

window.customQuestionsLibrary.HeatmapDesigner = HeatmapDesigner;
window.customQuestionsLibrary.HeatmapDesignerManager = HeatmapDesignerManager_HeatmapDesignerManager;

/***/ })
/******/ ]);
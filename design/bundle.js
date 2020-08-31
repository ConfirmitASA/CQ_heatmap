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
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
    var _component$classList;

    var tag = _ref3.tag,
        classes = _ref3.classes,
        inputType = _ref3.inputType,
        onInputChange = _ref3.onInputChange,
        inputDefaultValue = _ref3.inputDefaultValue,
        labelText = _ref3.labelText;
    var column = document.createElement("td");
    column.classList.add("inputlist__column");
    var component = document.createElement(tag);
    classes.length > 0 && (_component$classList = component.classList).add.apply(_component$classList, _toConsumableArray(classes));

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
        maxNumberOfAnswersInput = _this$elements.maxNumberOfAnswersInput;

    _this.toggleElementsVisibility({
      elements: [areasWrapper, activateScalesWrapper, customScalesWrapper, customScaleListWrapper, equalToNumberOfAnswersInput.parentNode]
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
        customScaleListWrapper = _this$elements2.customScaleListWrapper,
        scalesNumberInput = _this$elements2.scalesNumberInput,
        typeForNumberOfAnswersInput = _this$elements2.typeForNumberOfAnswersInput,
        equalToNumberOfAnswersInput = _this$elements2.equalToNumberOfAnswersInput,
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
      elements: [customScalesWrapper, customScaleListWrapper],
      shouldBeShown: haveScales && scaleType === "custom"
    });

    if (answersCount.type === "equal") {
      typeForNumberOfAnswersInput[0].selected = true;
    } else {
      typeForNumberOfAnswersInput[1].selected = true;
    }

    _this.toggleElementsVisibility({
      elements: [equalToNumberOfAnswersInput.parentNode],
      shouldBeShown: answersCount.type === "equal"
    });

    _this.toggleElementsVisibility({
      elements: [minNumberOfAnswersInput.parentNode, maxNumberOfAnswersInput.parentNode],
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

            _this.saveChanges();
          },
          onAreasInit: function onAreasInit() {
            _this.createAreaTextItems({
              defaultValues: areas.reverse().map(function (area) {
                return area.title;
              })
            });
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
    var areasCount = $("#heatmap-wrapper img").selectAreas('areas').length;
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
        haveScalesInput = _this$elements7.haveScalesInput,
        activateDefaultScalesInput = _this$elements7.activateDefaultScalesInput,
        activateCustomScalesInput = _this$elements7.activateCustomScalesInput,
        typeForNumberOfAnswersInput = _this$elements7.typeForNumberOfAnswersInput,
        equalToNumberOfAnswersInput = _this$elements7.equalToNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements7.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements7.maxNumberOfAnswersInput;
    haveScalesInput.addEventListener('change', _this.saveChanges);
    activateDefaultScalesInput.addEventListener('change', _this.saveChanges);
    activateCustomScalesInput.addEventListener('change', _this.saveChanges);
    typeForNumberOfAnswersInput.addEventListener('change', _this.saveChanges);
    equalToNumberOfAnswersInput.addEventListener('change', _this.saveChanges);
    minNumberOfAnswersInput.addEventListener('change', _this.saveChanges);
    maxNumberOfAnswersInput.addEventListener('change', _this.saveChanges);
  });

  HeatmapDesignerManager_defineProperty(this, "saveChanges", function () {
    var _this$elements8 = _this.elements,
        imageSrcInput = _this$elements8.imageSrcInput,
        imageWidthInput = _this$elements8.imageWidthInput,
        areaTextListWrapper = _this$elements8.areaTextListWrapper,
        typeForNumberOfAnswersInput = _this$elements8.typeForNumberOfAnswersInput,
        equalToNumberOfAnswersInput = _this$elements8.equalToNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements8.maxNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements8.minNumberOfAnswersInput,
        haveScalesInput = _this$elements8.haveScalesInput,
        activateCustomScalesInput = _this$elements8.activateCustomScalesInput;
    var heatmapImageJQ = $("#heatmap-wrapper img");
    var typeForNumberOfAnswers = typeForNumberOfAnswersInput[0].selected ? "equal" : "min-max";
    var settings = {
      imageOptions: {
        src: imageSrcInput.value,
        width: imageWidthInput.value
      },
      areas: heatmapImageJQ.length > 0 ? heatmapImageJQ.selectAreas('areas') : [],
      answersCount: {
        type: typeForNumberOfAnswers,
        equal: typeForNumberOfAnswers === "equal" ? equalToNumberOfAnswersInput.value : undefined,
        max: typeForNumberOfAnswers === "min-max" ? maxNumberOfAnswersInput.value : undefined,
        min: typeForNumberOfAnswers === "min-max" ? minNumberOfAnswersInput.value : undefined
      },
      haveScales: haveScalesInput.checked
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
    var _this$elements9 = _this.elements,
        haveScalesInput = _this$elements9.haveScalesInput,
        activateScalesWrapper = _this$elements9.activateScalesWrapper,
        activateDefaultScalesInput = _this$elements9.activateDefaultScalesInput,
        activateCustomScalesInput = _this$elements9.activateCustomScalesInput,
        customScalesWrapper = _this$elements9.customScalesWrapper,
        customScaleListWrapper = _this$elements9.customScaleListWrapper,
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
    var _this$elements10 = _this.elements,
        scalesNumberInput = _this$elements10.scalesNumberInput,
        customScaleList = _this$elements10.customScaleList;
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
    var _this$elements11 = _this.elements,
        typeForNumberOfAnswersInput = _this$elements11.typeForNumberOfAnswersInput,
        equalToNumberOfAnswersInput = _this$elements11.equalToNumberOfAnswersInput,
        minNumberOfAnswersInput = _this$elements11.minNumberOfAnswersInput,
        maxNumberOfAnswersInput = _this$elements11.maxNumberOfAnswersInput;
    typeForNumberOfAnswersInput.addEventListener('change', function (e) {
      var selector = e.target;

      _this.toggleElementsVisibility({
        elements: [equalToNumberOfAnswersInput.parentNode],
        shouldBeShown: selector[0].selected
      });

      _this.toggleElementsVisibility({
        elements: [minNumberOfAnswersInput.parentNode, maxNumberOfAnswersInput.parentNode],
        shouldBeShown: selector[1].selected
      });
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
    typeForNumberOfAnswersInput: document.getElementById('number-of-responses__type'),
    equalToNumberOfAnswersInput: document.getElementById('number-of-responses__equal'),
    minNumberOfAnswersInput: document.getElementById('number-of-responses__min'),
    maxNumberOfAnswersInput: document.getElementById('number-of-responses__max'),
    activateDefaultScalesInput: document.getElementById('activateDefaultScales'),
    activateCustomScalesInput: document.getElementById('activateCustomScales'),
    scalesNumberInput: document.getElementById('scalesNumber'),
    changeImageBtn: document.getElementById('change-image-btn'),
    drawImageBtn: document.getElementById('draw-image-btn'),
    imageSettingsWrapper: document.getElementById('image-settings'),
    areasWrapper: document.getElementById('areas'),
    areaTextListWrapper: document.getElementById('areaTextList'),
    heatmapWrapper: document.getElementById('heatmap-wrapper'),
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
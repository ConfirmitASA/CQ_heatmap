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

// CONCATENATED MODULE: ./dev/components/ImageWrapper.js
var ImageWrapper = function ImageWrapper(_ref) {
  var id = _ref.id,
      imageOptions = _ref.imageOptions;

  function createWrapper(_ref2) {
    var id = _ref2.id;
    var wrapper = document.createElement("div");
    wrapper.classList.add("image-wrapper");
    wrapper.id = id;
    return wrapper;
  }

  function createImage(_ref3) {
    var imageOptions = _ref3.imageOptions;
    var image = document.createElement("img");
    var src = imageOptions.src,
        width = imageOptions.width;
    image.src = src;
    image.style.width = width;
    return image;
  }

  var wrapper = createWrapper({
    id: id
  });
  var image = createImage({
    imageOptions: imageOptions
  });
  wrapper.appendChild(image);
  return wrapper;
};
// CONCATENATED MODULE: ./dev/components/Switch.js
var Switch = function Switch(_ref) {
  var type = _ref.type,
      text = _ref.text,
      onClick = _ref.onClick;

  function createSwitchWrapper(_ref2) {
    var type = _ref2.type,
        text = _ref2.text;
    var switchWrapper = document.createElement("div");
    switchWrapper.classList.add("switch-wrapper");
    switchWrapper.classList.add("switch-wrapper-" + type);
    switchWrapper.appendChild(createSwitch({
      type: type
    }));
    switchWrapper.appendChild(createSwitchLabel({
      text: text
    }));
    return switchWrapper;
  }

  function createSwitch(_ref3) {
    var type = _ref3.type;
    var switchNode = document.createElement("label");
    switchNode.classList.add("switch");
    switchNode.appendChild(createSwitchInput());
    switchNode.appendChild(createSlider({
      type: type
    }));
    return switchNode;
  }

  function createSwitchInput() {
    var switchInput = document.createElement("input");
    switchInput.type = "checkbox";
    return switchInput;
  }

  function createSlider(_ref4) {
    var type = _ref4.type;
    var slider = document.createElement("span");
    slider.classList.add("slider");
    slider.classList.add("round");
    slider.classList.add("button-" + type);
    return slider;
  }

  function createSwitchLabel(_ref5) {
    var text = _ref5.text;
    var switchLabel = document.createElement("label");
    switchLabel.classList.add("switch-label");
    switchLabel.innerText = text;
    return switchLabel;
  }

  return createSwitchWrapper({
    type: type,
    text: text
  });
};
// CONCATENATED MODULE: ./dev/components/Tooltip.js
var Tooltip = function Tooltip(_ref) {
  var id = _ref.id,
      targetId = _ref.targetId,
      title = _ref.title,
      content = _ref.content,
      onCreated = _ref.onCreated;
  return new jBox('Tooltip', {
    id: id,
    trigger: 'mouseenter',
    attach: '#' + targetId,
    position: {
      x: 'center',
      y: 'top'
    },
    adjustPosition: true,
    adjustDistance: 5,
    title: title,
    content: content,
    closeOnMouseleave: true,
    onCreated: onCreated
  });
};
// CONCATENATED MODULE: ./dev/Heatmap.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Heatmap_Heatmap = function Heatmap(_ref) {
  var _this = this;

  var _question = _ref.question,
      _areas = _ref.areas,
      _imageOptions = _ref.imageOptions,
      _buttonOptions = _ref.buttonOptions,
      _styles = _ref.styles,
      _answersCount = _ref.answersCount,
      _haveScales = _ref.haveScales;

  _classCallCheck(this, Heatmap);

  _defineProperty(this, "init", function () {
    var wrapper = _this.render();

    _this.subscribeToQuestion();

    _this.setDynamicStyles();

    return wrapper;
  });

  _defineProperty(this, "render", function () {
    var wrapper = _this.createImageWrapper();

    _this.selectPredefinedAreas();

    return wrapper;
  });

  _defineProperty(this, "createImageWrapper", function () {
    var id = _this.id,
        questionNode = _this.questionNode,
        imageOptions = _this.imageOptions;
    var wrapper = new ImageWrapper({
      id: id + "-image-wrapper",
      imageOptions: imageOptions
    });
    questionNode.appendChild(wrapper);
    return wrapper;
  });

  _defineProperty(this, "selectPredefinedAreas", function () {
    var areas = _this.areas,
        id = _this.id;
    var self = _this;
    $("#" + id + "-image-wrapper img").selectAreas({
      allowEdit: false,
      allowMove: false,
      allowResize: false,
      allowSelect: false,
      allowDelete: false,
      allowNudge: false,
      outlineOpacity: 0,
      overlayOpacity: 0,
      areas: areas,
      // callbacks
      onLoaded: function onLoaded() {
        $(this).removeClass("blurred");
        self.onAreasLoaded();
      },
      onChanging: null,
      onChanged: null
    });
  });

  _defineProperty(this, "onAreasLoaded", function () {
    var id = _this.id;
    var areaSquares = document.querySelectorAll("#" + id + "-image-wrapper .select-areas-background-area");
    areaSquares.forEach(_this.createIndicatorAreaForAnswer);
  });

  _defineProperty(this, "createIndicatorAreaForAnswer", function (area, index, areaSquares) {
    var areaIndex = areaSquares.length - index;
    var id = _this.id,
        haveScales = _this.haveScales;

    var indicator = _this.createIndicatorNode({
      area: area,
      areaIndex: areaIndex
    });

    area.parentNode.insertBefore(indicator, area.nextSibling);
    var tooltip = new Tooltip({
      id: id + '-area-indicator-tooltip-' + areaIndex,
      targetId: indicator.id,
      //title: !haveScales ? "Food" : "",
      content: haveScales ? _this.createButtonsWrapperWithAreaAttributes({
        areaIndex: areaIndex
      }).innerHTML : "Food",
      onCreated: _this.onTooltipCreated.bind(_this, {
        areaIndex: areaIndex,
        indicator: indicator
      })
    });
  });

  _defineProperty(this, "createIndicatorNode", function (_ref2) {
    var area = _ref2.area,
        areaIndex = _ref2.areaIndex;
    var id = _this.id;
    var borderWidth = area.style.borderWidth;
    var indicator = area.cloneNode();
    indicator.id = id + "-area-indicator-" + areaIndex;
    indicator.classList.add("area-indicator");
    Object.assign(indicator.style, {
      backgroundPositionX: parseFloat(indicator.style.backgroundPositionX.replace("px", "")) - borderWidth + "px",
      backgroundPositionY: parseFloat(indicator.style.backgroundPositionY.replace("px", "")) - borderWidth + "px",
      backgroundImage: "",
      backgroundColor: ""
    });
    indicator.setAttribute("area-index", areaIndex);
    return indicator;
  });

  _defineProperty(this, "createButtonsWrapperWithAreaAttributes", function (_ref3) {
    var areaIndex = _ref3.areaIndex;
    var buttonOptions = _this.buttonOptions;
    var buttonsWrapper = document.createElement("div");
    buttonOptions.forEach(function (option) {
      var type = option.type,
          text = option.text;
      var button = new Switch({
        type: type,
        text: text
      });
      button.setAttribute("area-index", areaIndex);
      buttonsWrapper.appendChild(button);
    });
    return buttonsWrapper;
  });

  _defineProperty(this, "onTooltipCreated", function (_ref4) {
    var areaIndex = _ref4.areaIndex,
        indicator = _ref4.indicator;
    var haveScales = _this.haveScales;

    if (haveScales) {
      var buttonOptions = _this.buttonOptions;
      buttonOptions.forEach(function (option) {
        var type = option.type;
        var button = document.querySelector('.switch-wrapper-' + type + '[area-index="' + areaIndex + '"]');

        if (button) {
          button.addEventListener("click", function (e) {
            _this.onButtonClick({
              type: type,
              areaIndex: areaIndex,
              indicator: indicator
            });

            e.preventDefault();
          });
        }
      });
    } else {
      var question = _this.question;
      var questionValues = question.values;
      indicator.addEventListener("click", function () {
        if (indicator.classList.contains("area_chosen")) {
          indicator.classList.remove("area_chosen");
          delete questionValues[areaIndex];

          _this.setValues({
            question: question,
            values: questionValues
          });
        } else {
          indicator.classList.add("area_chosen");
          questionValues[areaIndex] = "1";

          _this.setValues({
            question: question,
            values: questionValues
          });
        }
      });
    }
  });

  _defineProperty(this, "onButtonClick", function (_ref5) {
    var type = _ref5.type,
        areaIndex = _ref5.areaIndex,
        indicator = _ref5.indicator;
    var question = _this.question,
        buttonOptions = _this.buttonOptions;
    var questionValues = question.values;
    var values = questionValues ? questionValues : {};
    buttonOptions.forEach(function (option) {
      var currentType = option.type;
      var input = document.querySelector('.switch-wrapper-' + currentType + '[area-index="' + areaIndex + '"] input');

      if (currentType === type) {
        if (input.checked) {
          delete values[areaIndex];
          input.checked = false;

          if (indicator.classList.contains("area_" + currentType)) {
            indicator.classList.remove("area_" + currentType);
          }
        } else {
          values[areaIndex] = currentType;
          input.checked = true;

          if (!indicator.classList.contains("area_" + currentType)) {
            indicator.classList.add("area_" + currentType);
          }
        }
      } else {
        input.checked = false;

        if (indicator.classList.contains("area_" + currentType)) {
          indicator.classList.remove("area_" + currentType);
        }
      }
    });

    _this.setValues({
      question: question,
      values: values
    });
  });

  _defineProperty(this, "setValues", function (_ref6) {
    var question = _ref6.question,
        values = _ref6.values;
    Object.keys(values).forEach(function (areaIndex) {
      if (values[areaIndex]) {
        question.setValue(areaIndex, values[areaIndex]);
      }
    });
  });

  _defineProperty(this, "subscribeToQuestion", function () {
    var id = _this.id,
        question = _this.question,
        questionNode = _this.questionNode,
        answersCount = _this.answersCount;
    var values = question.values;

    var errorBlock = _this.addErrorBlock();

    var errorList = errorBlock.querySelector(".cf-error-list");
    question.validationEvent.on(function (validationResult) {
      var valuesCount = Object.keys(_this.question.values).length; //const valuesCount = Object.keys(Confirmit.page.getQuestion(id).values).length;

      var min = answersCount.min,
          max = answersCount.max;
      errorList.innerHTML = "";

      if (values) {
        if (min && valuesCount < min) {
          var error = {
            message: 'Please provide at least ' + min + ' answer(s)'
          };
          validationResult.errors.push(error);
        }

        if (max && valuesCount > max) {
          var _error = {
            message: 'Please provide less than ' + max + ' answer(s)'
          };
          validationResult.errors.push(_error);
        }

        validationResult.errors.forEach(_this.addErrorItem);

        if (validationResult.errors.length > 0) {
          questionNode.classList.add("cf-question--error");
        } else {
          questionNode.classList.remove("cf-question--error");
        }
      }
    });
  });

  _defineProperty(this, "addErrorBlock", function () {
    var id = _this.id;
    var imageWrapper = document.querySelector("#" + id + "-image-wrapper");
    var errorBlock = document.createElement("div");
    errorBlock.id = id + "_error";
    errorBlock.classList.add("cf-question__error");
    errorBlock.classList.add("cf-error-block");
    errorBlock.setAttribute("role", "alert");
    errorBlock.setAttribute("aria-labelledby", id + "_error_list");
    var errorList = document.createElement("ul");
    errorList.id = id + "_error_list";
    errorList.classList.add("cf-error-list");
    errorBlock.appendChild(errorList);
    imageWrapper.parentNode.insertBefore(errorBlock, imageWrapper);
    return errorBlock;
  });

  _defineProperty(this, "addErrorItem", function (_ref7) {
    var message = _ref7.message;
    var id = _this.id;
    var errorList = document.querySelector("#" + id + "_error_list");
    var errorItem = document.createElement("li");
    errorItem.classList.add("cf-error-list__item");
    errorItem.innerText = message;
    errorList.appendChild(errorItem);
  });

  _defineProperty(this, "setDynamicStyles", function () {
    var buttonOptions = _this.buttonOptions,
        styles = _this.styles,
        questionNode = _this.questionNode,
        haveScales = _this.haveScales;
    var stylesElement = document.createElement("style");
    stylesElement.innerText = "";

    if (haveScales) {
      // area colors
      buttonOptions.forEach(function (option) {
        var type = option.type,
            color = option.color;
        stylesElement.innerText += ".area_" + type + "{ background-color: " + color + "; opacity: 0.5; }";
        stylesElement.innerText += ".switch-wrapper-" + type + "{ background-color: " + color + "; }";
        stylesElement.innerText += ".switch-wrapper-" + type + " input:checked + .slider:before { background-color: " + color + "; }";
      });
    } else {
      stylesElement.innerText += ".area_chosen { background-color: green !important; opacity: 0.5; }";
    } // area highlighting


    if (styles) {
      var emptyAreaHoverColor = styles.emptyAreaHoverColor,
          borderWidth = styles.borderWidth;

      if (!styles.borderWidth) {
        stylesElement.innerText += ".select-areas-background-area:hover { background-color: " + (emptyAreaHoverColor ? emptyAreaHoverColor : "#fff") + "; opacity: 0.5; }";
      } else {
        stylesElement.innerText += ".select-areas-background-area { border: " + borderWidth + "px solid black; }";
      }
    } else {
      stylesElement.innerText += ".select-areas-background-area:hover { background-color: #fff; opacity: 0.5; }";
    }

    questionNode.appendChild(stylesElement);
  });

  this.question = _question;
  this.id = _question.id;
  this.questionNode = document.querySelector("#" + this.id);
  this.areas = _areas;
  this.imageOptions = _imageOptions;
  this.styles = _styles;
  this.answersCount = _answersCount ? {
    max: _answersCount.max && _answersCount.max !== "0" ? _answersCount.max : undefined,
    min: _answersCount.min && _answersCount.min !== "0" ? _answersCount.min : undefined
  } : {};
  this.haveScales = _haveScales;
  this.buttonOptions = _buttonOptions ? _buttonOptions : [{
    type: "positive",
    text: "Positive",
    color: "green"
  }, {
    type: "neutral",
    text: "Neutral",
    color: "#aaa"
  }, {
    type: "negative",
    text: "Negative",
    color: "red"
  }];
  this.init();
};

/* harmony default export */ var dev_Heatmap = (Heatmap_Heatmap);
// CONCATENATED MODULE: ./dev/entry.js


if (window && !window.customQuestionsLibrary) {
  window.customQuestionsLibrary = {};
}

window.customQuestionsLibrary.Heatmap = dev_Heatmap;

/***/ })
/******/ ]);
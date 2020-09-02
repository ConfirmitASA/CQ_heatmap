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

// CONCATENATED MODULE: ./dev/components/ImageWrapper.js
var ImageWrapper = function ImageWrapper(_ref) {
  var id = _ref.id,
      imageOptions = _ref.imageOptions;

  var createWrapper = function createWrapper(_ref2) {
    var id = _ref2.id;
    var wrapper = document.createElement("div");
    wrapper.classList.add("image-wrapper");
    wrapper.id = id;
    return wrapper;
  };

  var createImage = function createImage(_ref3) {
    var imageOptions = _ref3.imageOptions;
    var image = document.createElement("img");
    var src = imageOptions.src,
        width = imageOptions.width;
    image.src = src;
    image.style.width = width;
    return image;
  };

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
      id = _ref.id;

  var createSwitchWrapper = function createSwitchWrapper(_ref2) {
    var type = _ref2.type,
        text = _ref2.text;
    var switchWrapper = document.createElement("div");
    switchWrapper.classList.add("switch-wrapper");
    switchWrapper.classList.add("switch-wrapper-" + type);
    switchWrapper.appendChild(createSwitch({
      type: type,
      text: text,
      id: id
    }));
    switchWrapper.appendChild(createSwitchLabel({
      text: text
    }));
    return switchWrapper;
  };

  var createSwitch = function createSwitch(_ref3) {
    var type = _ref3.type,
        text = _ref3.text,
        id = _ref3.id;
    var switchNode = document.createElement("div");
    switchNode.classList.add("switch");
    switchNode.appendChild(createSwitchInput({
      id: id
    }));
    switchNode.appendChild(createSlider({
      type: type,
      id: id
    }));

    if (!text) {
      switchNode.style.marginRight = "0";
    }

    return switchNode;
  };

  var createSwitchInput = function createSwitchInput(_ref4) {
    var id = _ref4.id;
    var switchInput = document.createElement("input");
    switchInput.type = "checkbox";
    switchInput.classList.add("switch-input");
    switchInput.id = id;
    return switchInput;
  };

  var createSlider = function createSlider(_ref5) {
    var type = _ref5.type,
        id = _ref5.id;
    var slider = document.createElement("label");
    slider.classList.add("switch-label");
    slider.classList.add("button-".concat(type));
    slider.setAttribute("for", id);
    return slider;
  };

  var createSwitchLabel = function createSwitchLabel(_ref6) {
    var text = _ref6.text;
    var switchLabel = document.createElement("label");
    switchLabel.classList.add("switch-text");

    if (text) {
      switchLabel.innerText = text;
    } else {
      switchLabel.style.display = "none";
    }

    return switchLabel;
  };

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
  return title || content ? new jBox('Tooltip', {
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
  }) : undefined;
};
// CONCATENATED MODULE: ./dev/question/Heatmap.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Heatmap_Heatmap = function Heatmap(_ref) {
  var _this = this;

  var _question = _ref.question,
      _areas = _ref.areas,
      _imageOptions = _ref.imageOptions,
      _styles = _ref.styles,
      _answersCount = _ref.answersCount,
      _haveScales = _ref.haveScales,
      scaleType = _ref.scaleType,
      _customScales = _ref.customScales;

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

  _defineProperty(this, "setExistingValues", function (_ref2) {
    var to = _ref2.to,
        areaIndex = _ref2.areaIndex;
    var question = _this.question;
    var values = question.values;

    switch (to) {
      case "tooltip":
        var button = document.querySelector(".switch-wrapper-".concat(values[areaIndex], "[area-index=\"").concat(areaIndex, "\"]"));

        if (button) {
          button.click();
        }

        break;

      case "area":
        var area = document.querySelector(".select-areas-background-area.area-indicator[area-index=\"".concat(areaIndex, "\"]"));

        if (area && !area.classList.contains("area_".concat(values[areaIndex]))) {
          area.classList.add("area_".concat(values[areaIndex]));
        }

        break;
    }
  });

  _defineProperty(this, "onAreasLoaded", function () {
    var id = _this.id;
    var areaSquares = document.querySelectorAll("#" + id + "-image-wrapper .select-areas-background-area");
    areaSquares.forEach(_this.createIndicatorAreaForAnswer);
  });

  _defineProperty(this, "createIndicatorAreaForAnswer", function (area, index, areaSquares) {
    var id = _this.id,
        question = _this.question,
        haveScales = _this.haveScales;
    var areaIndex = areaSquares.length - index;
    var areaTitle = _this.areas[index].title;

    var indicator = _this.createIndicatorNode({
      area: area,
      areaIndex: areaIndex
    });

    area.parentNode.insertBefore(indicator, area.nextSibling);

    if (question.values) {
      _this.setExistingValues({
        to: "area",
        areaIndex: areaIndex
      });
    }

    var tooltip = new Tooltip({
      id: id + '-area-indicator-tooltip-' + areaIndex,
      targetId: indicator.id,
      title: haveScales ? areaTitle : undefined,
      content: haveScales ? _this.createButtonsWrapperWithAreaAttributes({
        areaIndex: areaIndex
      }).innerHTML : areaTitle,
      onCreated: _this.onTooltipCreated.bind(_this, {
        areaIndex: areaIndex,
        indicator: indicator
      })
    });
  });

  _defineProperty(this, "createIndicatorNode", function (_ref3) {
    var area = _ref3.area,
        areaIndex = _ref3.areaIndex;
    var id = _this.id;
    var borderWidth = area.style.borderWidth;
    var indicator = area.cloneNode();
    indicator.id = id + "-area-indicator-" + areaIndex;
    indicator.classList.add("area-indicator");
    Object.assign(indicator.style, {
      backgroundPositionX: parseFloat(indicator.style.backgroundPositionX.replace("px", "")) - borderWidth + "px",
      backgroundPositionY: parseFloat(indicator.style.backgroundPositionY.replace("px", "")) - borderWidth + "px",
      backgroundImage: "",
      backgroundColor: "",
      cursor: ""
    });
    indicator.setAttribute("area-index", areaIndex);
    return indicator;
  });

  _defineProperty(this, "createButtonsWrapperWithAreaAttributes", function (_ref4) {
    var areaIndex = _ref4.areaIndex;
    var customScales = _this.customScales;
    var buttonsWrapper = document.createElement("div");
    customScales.forEach(function (option) {
      var type = option.type,
          label = option.label;
      var button = new Switch({
        type: type,
        text: label,
        id: "scale-button-".concat(type, "-").concat(areaIndex)
      });
      button.setAttribute("area-index", areaIndex);
      buttonsWrapper.appendChild(button);
    });
    return buttonsWrapper;
  });

  _defineProperty(this, "onTooltipCreated", function (_ref5) {
    var areaIndex = _ref5.areaIndex,
        indicator = _ref5.indicator;
    var question = _this.question,
        haveScales = _this.haveScales;

    if (haveScales) {
      var customScales = _this.customScales;
      customScales.forEach(function (option) {
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
      indicator.addEventListener("click", function () {
        var values = _this.question.values;

        if (indicator.classList.contains("area_chosen")) {
          indicator.classList.remove("area_chosen");
          delete values[areaIndex];

          _this.setValues({
            values: values
          });
        } else {
          indicator.classList.add("area_chosen");
          values[areaIndex] = "1";

          _this.setValues({
            values: values
          });
        }
      });
    }

    if (question.values) {
      _this.setExistingValues({
        to: "tooltip",
        areaIndex: areaIndex
      });
    }
  });

  _defineProperty(this, "onButtonClick", function (_ref6) {
    var type = _ref6.type,
        areaIndex = _ref6.areaIndex,
        indicator = _ref6.indicator;
    var customScales = _this.customScales;
    var values = _this.question.values;
    customScales.forEach(function (option) {
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
      values: values
    });
  });

  _defineProperty(this, "setValues", function (_ref7) {
    var values = _ref7.values;
    var allValues = _this.question.values;

    _this.question.answers.forEach(function (_ref8) {
      var code = _ref8.code;
      allValues[code] = undefined;
    });

    Object.keys(values).forEach(function (key) {
      allValues[key] = values[key];
    });
    Object.keys(allValues).forEach(function (key) {
      _this.question.setValue(key, allValues[key]);
    });
  });

  _defineProperty(this, "subscribeToQuestion", function () {
    var questionNode = _this.questionNode,
        answersCount = _this.answersCount;

    var errorBlock = _this.addErrorBlock();

    var errorList = errorBlock.querySelector(".cf-error-list");

    _this.question.validationEvent.on(function (validationResult) {
      var valuesCount = Object.keys(_this.question.values).length;
      var equal = parseInt(answersCount.equal);
      var min = parseInt(answersCount.min);
      var max = parseInt(answersCount.max);
      errorList.innerHTML = "";

      if (_this.question.values) {
        if (equal && valuesCount !== equal) {
          var error = {
            message: 'Please provide exactly ' + equal + ' answer(s)'
          };
          validationResult.errors.push(error);
        }

        if (min && valuesCount < min) {
          var _error = {
            message: 'Please provide at least ' + min + ' answer(s)'
          };
          validationResult.errors.push(_error);
        }

        if (max && valuesCount > max) {
          var _error2 = {
            message: 'Please provide less than ' + max + ' answer(s)'
          };
          validationResult.errors.push(_error2);
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

  _defineProperty(this, "addErrorItem", function (_ref9) {
    var message = _ref9.message;
    var id = _this.id;
    var errorList = document.querySelector("#" + id + "_error_list");
    var errorItem = document.createElement("li");
    errorItem.classList.add("cf-error-list__item");
    errorItem.innerText = message;
    errorList.appendChild(errorItem);
  });

  _defineProperty(this, "setDynamicStyles", function () {
    var customScales = _this.customScales,
        styles = _this.styles,
        questionNode = _this.questionNode,
        haveScales = _this.haveScales;
    var stylesElement = document.createElement("style");
    stylesElement.innerText = "";

    if (haveScales) {
      // area colors
      customScales.forEach(function (option) {
        var type = option.type,
            color = option.color;
        stylesElement.innerText += ".area_" + type + "{ background-color: " + color + "; opacity: 0.5; }";
        stylesElement.innerText += ".switch-wrapper-" + type + "{ background-color: " + color + "; }";
        stylesElement.innerText += ".switch-wrapper-" + type + " .switch-input:checked + .switch-label:after { background-color: " + color + "; }";
      });
    } else {
      stylesElement.innerText += ".area_chosen { background-color: green !important; opacity: 0.5; }";
      stylesElement.innerText += ".area-indicator:hover { cursor: pointer; }";
    } // area highlighting


    if (styles) {
      if (styles.areaHighlight) {
        var _styles$areaHighlight = styles.areaHighlight,
            color = _styles$areaHighlight.color,
            border = _styles$areaHighlight.border;

        if (color) {
          stylesElement.innerText += ".select-areas-background-area:hover { background-color: " + (color ? color : "#fff") + "; opacity: 0.5; }";
        }

        if (border) {
          stylesElement.innerText += ".select-areas-background-area { border: " + (border.width ? border.width : "1") + "px solid " + (border.color ? border.color : "#000") + "; }";
        }
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
    equal: _answersCount.type === "equal" && _answersCount.equal && _answersCount.equal !== "0" ? _answersCount.equal : undefined,
    max: _answersCount.type === "min-max" && _answersCount.max && _answersCount.max !== "0" ? _answersCount.max : undefined,
    min: _answersCount.type === "min-max" && _answersCount.min && _answersCount.min !== "0" ? _answersCount.min : undefined
  } : {};
  this.haveScales = _haveScales;
  var defaultScales = [{
    type: "positive",
    label: "Positive",
    color: "green"
  }, {
    type: "neutral",
    label: "Neutral",
    color: "#aaa"
  }, {
    type: "negative",
    label: "Negative",
    color: "red"
  }];
  this.customScales = scaleType === "custom" && _customScales ? _customScales : defaultScales;
  this.init();
};


// CONCATENATED MODULE: ./dev/question/entry.js


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

window.customQuestionsLibrary.Heatmap = Heatmap_Heatmap;

/***/ })
/******/ ]);
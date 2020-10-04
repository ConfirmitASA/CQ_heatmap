import {ELEMENTS} from "../Constants";

const ElementsMaker = {
    createCustomElement: ({type, elementOptions}) => {
        const {modifier, attributes, text, id, wrapperClass, events, value, children, src, width} = elementOptions;
        switch (type) {
            case ELEMENTS.CUSTOM.SWITCH:
                return ElementsMaker.createHTMLElement({
                    tag: ELEMENTS.HTML.DIV,
                    classes: ["switch", `switch--${modifier}`],
                    attributes,
                    children: [
                        ElementsMaker.createHTMLElement({
                            tag: ELEMENTS.HTML.DIV,
                            classes: ["switch__slider", "slider"],
                            children: [
                                ElementsMaker.createHTMLElement({
                                    tag: ELEMENTS.HTML.INPUT,
                                    classes: ["slider__input"],
                                    id,
                                    type: "checkbox"
                                }),
                                ElementsMaker.createHTMLElement({
                                    tag: ELEMENTS.HTML.LABEL,
                                    classes: ["slider__toggle", `button--${modifier}`],
                                    attributes: [{
                                        name: "for",
                                        value: id
                                    }]
                                })
                            ]
                        }),
                        ElementsMaker.createHTMLElement({
                            tag: ELEMENTS.HTML.LABEL,
                            classes: !text ? ["switch__text", "hidden"] : ["switch__text"],
                            innerText: text
                        })
                    ]
                });

            case ELEMENTS.CUSTOM.INPUT_WRAPPER:
                return ElementsMaker.createHTMLElement({
                    tag: ELEMENTS.HTML.TR,
                    classes: [wrapperClass, "inputlist__item"],
                    id,
                    attributes,
                    children: children.map((child) =>
                        ElementsMaker.createHTMLElement({
                            tag: ELEMENTS.HTML.TD,
                            classes: ["inputlist__column"],
                            children: [child]
                        }))
                })

            case ELEMENTS.CUSTOM.AREA_TEXT_ITEM:
                return ElementsMaker.createCustomElement({
                    type: ELEMENTS.CUSTOM.INPUT_WRAPPER, elementOptions: {
                        id,
                        wrapperClass: "area-text-item",
                        children: [
                            ElementsMaker.createHTMLElement({
                                tag: ELEMENTS.HTML.LABEL,
                                classes: ["area-text-item__index"],
                                innerText: text,
                                events: [events.find((event) => event.type === "click")]
                            }),
                            ElementsMaker.createHTMLElement({
                                tag: ELEMENTS.HTML.INPUT,
                                classes: ["area-text-item__text", "form-input", "form-input--40ch"],
                                type: "text",
                                events,
                                value
                            })
                        ]
                    }
                })

            case ELEMENTS.CUSTOM.CUSTOM_SCALE_ITEM:
                return ElementsMaker.createCustomElement({
                    type: ELEMENTS.CUSTOM.INPUT_WRAPPER, elementOptions: {
                        id,
                        wrapperClass: "custom-scale-item",
                        children: [
                            ElementsMaker.createHTMLElement({
                                tag: ELEMENTS.HTML.LABEL,
                                classes: ["custom-scale-item__code"],
                                innerText: value ? value.code : ""
                            }),
                            ElementsMaker.createHTMLElement({
                                tag: ELEMENTS.HTML.LABEL,
                                classes: ["custom-scale-item__label"],
                                innerText: value ? value.text : ""
                            }),
                            ElementsMaker.createHTMLElement({
                                tag: ELEMENTS.HTML.INPUT,
                                classes: ["custom-scale-item__color", "form-input", "form-input--2ch"],
                                type: "color",
                                events: [events.find((event) => event.type === ELEMENTS.HTML.INPUT)],
                                value: value ? value.color : "#000000"
                            })
                        ]
                    }
                })

            case ELEMENTS.CUSTOM.IMAGE_WRAPPER:
                return ElementsMaker.createHTMLElement({
                    tag: ELEMENTS.HTML.DIV,
                    classes: ["image-wrapper"],
                    id,
                    children: [
                        ElementsMaker.createHTMLElement({
                            tag: ELEMENTS.HTML.IMG,
                            src,
                            style: {
                                width: `${width}px`
                            }
                        })
                    ]
                })

            case ELEMENTS.CUSTOM.TRANSLATION_ITEM:
                return ElementsMaker.createCustomElement({
                    type: ELEMENTS.CUSTOM.INPUT_WRAPPER,
                    elementOptions: {
                        id,
                        wrapperClass: "translation-item",
                        attributes: [
                            {
                                name: "translation-type",
                                value: value ? value.type : ""
                            }
                        ],
                        children: [
                            ElementsMaker.createHTMLElement({
                                tag: ELEMENTS.HTML.LABEL,
                                classes: ["translation-item__label"],
                                innerText: value ? value.label : ""
                            }),
                            !!value.tooltip && ElementsMaker.createCustomElement({
                                type: ELEMENTS.CUSTOM.HELP_TOOLTIP,
                                elementOptions: {
                                    value: value.tooltip
                                }
                            }),
                            ElementsMaker.createHTMLElement({
                                tag: ELEMENTS.HTML.INPUT,
                                classes: ["translation-item__text", "form-input", "form-input--40ch"],
                                type: "text",
                                events: [events.find((event) => event.type === ELEMENTS.HTML.INPUT)],
                                value: value ? value.text : ""
                            })
                        ]
                    }
                })

            case ELEMENTS.CUSTOM.HELP_TOOLTIP:
                return ElementsMaker.createHTMLElement({
                    tag: ELEMENTS.HTML.DIV,
                    classes: ["sd-tooltip-help"],
                    attributes: [
                        {
                            name: "data-tooltip-text",
                            value
                        }
                    ]
                })
        }
    },

    createQuestionElement: ({type, elementOptions}) => {
        const {questionId, text, children} = elementOptions;

        switch (type) {
            case ELEMENTS.QUESTION.CONTENT:
                return ElementsMaker.createHTMLElement({
                    tag: ELEMENTS.HTML.DIV,
                    classes: ["cf-question__content"],
                    children
                });

            case ELEMENTS.QUESTION.INSTRUCTION:
                return ElementsMaker.createHTMLElement({
                    tag: ELEMENTS.HTML.DIV,
                    id: `${questionId}_instruction`,
                    classes: ["cf-question__instruction"],
                    innerText: text,
                    children
                })

            case ELEMENTS.QUESTION.TEXT:
                return ElementsMaker.createHTMLElement({
                    tag: ELEMENTS.HTML.DIV,
                    id: `${questionId}_text`,
                    classes: ["cf-question__text"],
                    innerText: text,
                    children
                })

            case ELEMENTS.QUESTION.ERROR_ITEM:
                return ElementsMaker.createHTMLElement({
                    tag: ELEMENTS.HTML.DIV,
                    classes: ["cf-error-list__item"],
                    innerText: text,
                    children
                })

            case ELEMENTS.QUESTION.ERROR_LIST:
                return ElementsMaker.createHTMLElement({
                    tag: ELEMENTS.HTML.DIV,
                    id: `${questionId}_error_list`,
                    classes: ["cf-error-list"],
                    children
                })

            case ELEMENTS.QUESTION.ERROR_BLOCK:
                return ElementsMaker.createHTMLElement({
                    tag: ELEMENTS.HTML.DIV,
                    id: `${questionId}_error`,
                    classes: ["cf-question__error", "cf-error-block"],
                    attributes: [
                        {name: "role", value: "alert"},
                        {name: "aria-labelledby", value: `${questionId}_error_list`}
                    ],
                    children: [
                        ElementsMaker.createQuestionElement({
                            type: ELEMENTS.QUESTION.ERROR_LIST,
                            elementOptions: {questionId, children}
                        })
                    ]
                })
        }
    },

    createHTMLElement: ({tag, id, classes, attributes, type, value, innerText, children, events, src, style}) => {
        const element = document.createElement(tag);

        if (id) {
            element.id = id;
        }
        if (type) {
            element.setAttribute("type", type);
        }
        if (value) {
            element.value = value;
        }
        if (innerText) {
            element.innerHTML = innerText;
        }
        if (src) {
            element.src = src;
        }
        if (style) {
            Object.keys(style).forEach((key) => element.style[key] = style[key]);
        }

        children && children.forEach((child) => {
            child && element.appendChild(child);
        });
        events && events.forEach(({type, callback}) => {
            type && callback && element.addEventListener(type, callback);
        });
        classes && classes.forEach((className) => {
            className && element.classList.add(className);
        });
        attributes && attributes.forEach(({name, value}) => {
            name && element.setAttribute(name, value);
        });

        return element;
    }
}

export default ElementsMaker;
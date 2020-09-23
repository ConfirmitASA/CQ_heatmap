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
                                tag: ELEMENTS.HTML.INPUT,
                                classes: ["custom-scale-item__color", "form-input", "form-input--2ch"],
                                type: "color",
                                events: [events.find((event) => event.type === ELEMENTS.HTML.INPUT)],
                                value: value ? value.color : undefined
                            }),
                            ElementsMaker.createHTMLElement({
                                tag: ELEMENTS.HTML.INPUT,
                                classes: ["custom-scale-item__code", "form-input", "form-input--8ch"],
                                type: "text",
                                events: [events.find((event) => event.type === ELEMENTS.HTML.INPUT)],
                                value: value ? value.code : undefined
                            }),
                            ElementsMaker.createHTMLElement({
                                tag: ELEMENTS.HTML.INPUT,
                                classes: ["custom-scale-item__label", "form-input", "form-input--40ch"],
                                type: "text",
                                events: [events.find((event) => event.type === ELEMENTS.HTML.INPUT)],
                                value: value ? value.label : undefined
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
                    classList: ["cf-question__instruction"],
                    innerText: text,
                    children
                })

            case ELEMENTS.QUESTION.TEXT:
                return ElementsMaker.createHTMLElement({
                    tag: ELEMENTS.HTML.DIV,
                    id: `${questionId}_text`,
                    classList: ["cf-question__text"],
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
                        ElementsMaker.createQuestionElement({type: ELEMENTS.QUESTION.ERROR_LIST, elementOptions: {questionId, children}})
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
            element.type = type;
        }
        if (value) {
            element.value = value;
        }
        if (innerText) {
            element.innerText = innerText;
        }
        if (src) {
            element.src = src;
        }
        if (style) {
            element.style = style;
        }

        children && children.forEach((child) => {
            element.appendChild(child);
        });
        events && events.forEach(({type, callback}) => {
            callback && element.addEventListener(type, callback);
        });
        classes && element.classList.add(...classes);
        attributes && attributes.forEach(({name, value}) => {
            element.setAttribute(name, value);
        });

        return element;
    }
}

export default ElementsMaker;
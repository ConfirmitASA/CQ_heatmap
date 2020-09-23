import CommonFunctionsUtil from "../../CommonFunctionsUtil";

export default class AbstractTab {
    constructor({elements}) {
        this.elements = elements;
    }

    setDefaultAttributes = ({elementsToChangeVisibility, elementsToSetAttribute, elementsToSetValues}) => {
        elementsToChangeVisibility && elementsToChangeVisibility.forEach((elementOptions) => {
            CommonFunctionsUtil.toggleElementsVisibility(elementOptions);
        });
        elementsToSetAttribute && elementsToSetAttribute.forEach((elementOptions) => {
            const {element, attribute} = elementOptions;
            element.setAttribute(attribute.name, attribute.value);
        });
        elementsToSetValues && elementsToSetValues.forEach((elementOptions) => {
            const {element, value} = elementOptions;
            element.value = value;
        });
    };

    raiseErrors = () => {
    };

    setValues = ({values}) => {
    };

    get value() {
    }
}

export const QuestionText = ({id, text}) => {
    const textComponent = document.createElement("div");
    textComponent.id = `${id}_text`;
    textComponent.classList.add("cf-question__text");
    textComponent.innerText = text;

    return textComponent;
};
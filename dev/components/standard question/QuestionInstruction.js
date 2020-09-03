export const QuestionInstruction = ({id, text}) => {
    const instruction = document.createElement("div");
    instruction.id = `${id}_instruction`;
    instruction.classList.add("cf-question__instruction");
    instruction.innerText = text;

    return instruction;
};
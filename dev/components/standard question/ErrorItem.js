export const ErrorItem = ({message}) => {
    const errorItem = document.createElement("li");
    errorItem.classList.add("cf-error-list__item");
    errorItem.innerText = message;

    return errorItem;
};
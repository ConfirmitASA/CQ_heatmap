export const ErrorBlock = ({id}) => {
    const errorBlock = document.createElement("div");
    errorBlock.id = id + "_error";
    errorBlock.classList.add("cf-question__error");
    errorBlock.classList.add("cf-error-block");
    errorBlock.setAttribute("role", "alert");
    errorBlock.setAttribute("aria-labelledby", id + "_error_list");

    const errorList = document.createElement("ul");
    errorList.id = id + "_error_list";
    errorList.classList.add("cf-error-list");

    errorBlock.appendChild(errorList);

    return errorBlock;
};
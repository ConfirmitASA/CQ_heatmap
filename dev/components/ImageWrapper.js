export const ImageWrapper = ({id, imageOptions}) => {
    const createWrapper = ({id}) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("image-wrapper");
        wrapper.id = id;
        return wrapper;
    };

    const createImage = ({imageOptions}) => {
        const image = document.createElement("img");
        const {src, width} = imageOptions;
        image.src = src;
        image.style.width = width;
        return image;
    };

    const wrapper = createWrapper({id});
    const image = createImage({imageOptions});
    wrapper.appendChild(image);
    return wrapper;
};
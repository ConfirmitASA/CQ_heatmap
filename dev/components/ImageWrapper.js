export const ImageWrapper = ({id, imageOptions}) => {
    function createWrapper({id}) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("image-wrapper");
        wrapper.id = id;
        return wrapper;
    }

    function createImage({imageOptions}) {
        const image = document.createElement("img");
        const {src, width} = imageOptions;
        image.src = src;
        image.style.width = width;
        return image;
    }

    const wrapper = createWrapper({id});
    const image = createImage({imageOptions});
    wrapper.appendChild(image);
    return wrapper;
};
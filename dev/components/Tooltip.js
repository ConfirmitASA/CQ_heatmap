export const Tooltip = ({id, targetId, title, content, onCreated}) => {
    return new jBox('Tooltip', {
        id,
        trigger: 'mouseenter',
        attach: '#' + targetId,
        position: {x: 'center', y: 'top'},
        adjustPosition: true,
        adjustDistance: 5,
        title,
        content,
        closeOnMouseleave: true,
        onCreated
    });
};
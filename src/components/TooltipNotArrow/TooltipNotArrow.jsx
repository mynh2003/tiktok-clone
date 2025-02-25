import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import PropType from 'prop-types';
import './TooltipNotArrow.css';

function TooltipNotArrow({ children, content, visible, className }) {
    return (
        <Tippy
            content={content}
            visible={visible}
            className={clsx('tooltip-wrapper', {
                [className]: className,
            })}
        >
            {children}
        </Tippy>
    );
}

TooltipNotArrow.prototype = {
    children: PropType.node.isRequired,
    content: PropType.string.isRequired,
    visible: PropType.bool,
    className: PropType.string,
};

export default TooltipNotArrow;

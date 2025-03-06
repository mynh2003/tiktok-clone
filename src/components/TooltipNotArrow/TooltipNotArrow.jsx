import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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

TooltipNotArrow.propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    className: PropTypes.string,
};

export default TooltipNotArrow;

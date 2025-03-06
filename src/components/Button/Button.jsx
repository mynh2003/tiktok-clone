import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

function Button({ children, primary, outline, large, rounded, disabled, to, href, onClick, className, ...passProps }) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = clsx(styles['wrapper'], {
        [className]: className,
        [styles['primary']]: primary,
        [styles['outline']]: outline,
        [styles['large']]: large,
        [styles['rounded']]: rounded,
        [styles['disabled']]: disabled,
    });

    return (
        <Comp className={classes} {...props}>
            <span>{children}</span>
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    large: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;

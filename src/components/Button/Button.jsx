import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import { forwardRef } from 'react';

const Button = forwardRef(
    (
        {
            children,
            controlItem,
            iconOnly,
            primary,
            secondary,
            mini,
            medium,
            outline,
            large,
            rounded,
            disabled,
            to,
            href,
            onClick,
            className,
            ...passProps
        },
        ref,
    ) => {
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
            [styles['controlItem']]: controlItem,
            [styles['mini']]: mini,
            [styles['iconOnly']]: iconOnly,
            [styles['primary']]: primary,
            [styles['secondary']]: secondary,
            [styles['medium']]: medium,
            [styles['outline']]: outline,
            [styles['large']]: large,
            [styles['rounded']]: rounded,
            [styles['disabled']]: disabled,
        });

        return (
            <Comp ref={ref} className={classes} {...props}>
                <span className={styles['button-content']}>{children}</span>
            </Comp>
        );
    },
);

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
    controlItem: PropTypes.bool,
    iconOnly: PropTypes.bool,
    secondary: PropTypes.bool,
    mini: PropTypes.bool,
    medium: PropTypes.bool,
};

export default Button;

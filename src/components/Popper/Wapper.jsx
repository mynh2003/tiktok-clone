import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Popper.module.scss';

function Wrapper({ children, className }) {
    return <div className={clsx(styles['wrapper'], className)}>{children}</div>;
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Wrapper;

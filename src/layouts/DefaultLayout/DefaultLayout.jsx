import PropTypes from 'prop-types';
import Header from '~/layouts/components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { useTheme } from '~/providers/ThemeProvider';

function DefaultLayout({ children }) {
    const { theme } = useTheme();
    return (
        <div className={styles.wrapper} data-theme={theme}>
            <Header />
            <div className={styles['container']}>
                <Sidebar />
                <div className={styles['content']}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;

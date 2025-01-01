import clsx from 'clsx';
import styles from './Header.module.scss';

function Header() {
    return (
        <header className={clsx(styles.wrapper)}>
            <div className={clsx(styles.inner)}>
                <div>Left container</div>
                <div>Center container</div>
                <div>Right container</div>
            </div>
        </header>
    );
}

export default Header;

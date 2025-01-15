import Button from '../Button';
import styles from '/ScrollNavigation.module.scss';

function ScrollNavigation() {
    return (
        <div className={styles['container']}>
            <div className={styles['action']}>
                <Button />
            </div>
            <div className={styles['action']}>
                <Button />
            </div>
        </div>
    );
}

export default ScrollNavigation;

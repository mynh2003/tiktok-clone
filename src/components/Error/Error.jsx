import styles from './Error.module.scss';

function Error({ icon, title, desc, notMain = false }) {
    const containerStyle = notMain ? { flex: '1 1 auto' } : {};
    const errorIconWrapper = notMain ? { display: 'flex' } : {};

    const Container = (
        <div className={styles['error-container']} style={containerStyle}>
            <div className={notMain ? '' : styles['error-icon-wrapper']} style={errorIconWrapper}>
                {icon}
            </div>
            <p className={styles['title']}>{title}</p>
            <p className={styles['desc']}>{desc}</p>
        </div>
    );

    return notMain ? Container : <main className={styles['wrapper']}>{Container}</main>;
}

export default Error;

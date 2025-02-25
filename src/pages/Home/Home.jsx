import Article from '~/components/Article';
import styles from './Home.module.scss';
import Button from '~/components/Button';
import AutoScrollProvider from '~/providers/AutoScrollProvider';

function Home() {
    return (
        <div className={styles['home-page-container']}>
            <AutoScrollProvider>
                <Article />
            </AutoScrollProvider>
            <Button rounded className={styles['button-download-app']}>
                Tải ứng dụng
            </Button>
        </div>
    );
}

export default Home;

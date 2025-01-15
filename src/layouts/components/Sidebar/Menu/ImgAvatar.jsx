import styles from './Menu.module.scss';

function ImgAvatar() {
    return (
        <img
            className={styles['img-avatar']}
            src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/1a2dda176747b41a91722aec42faa61f.jpeg?lk3s=a5d48078&nonce=79179&refresh_token=67ddd435229b2ba49bc36dee2523b4bc&x-expires=1736694000&x-signature=bA6w%2B3l6viMg9FxtiRuR8d5QZdU%3D&shp=a5d48078&shcp=81f88b70"
            alt=""
        />
    );
}

export default ImgAvatar;

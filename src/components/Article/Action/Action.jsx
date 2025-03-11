import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Action.module.scss';

import HeartIcon from '~/assets/images/heart-icon.svg?react';
import CommentIcon from '~/assets/images/comment-icon.svg?react';
import UnCollectIcon from '~/assets/images/uncollect-icon.svg?react';
import ShareIcon from '~/assets/images/share-icon.svg?react';
import PlusIcon from '~/assets/images/plus-icon.svg?react';

function Action({ article }) {
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return Math.floor(num / 100000) / 10 + 'M';
        }
        if (num >= 10000) {
            return Math.floor(num / 100) / 10 + 'K';
        }
        return num.toString();
    };

    return (
        <section className={styles['section-action-container']}>
            <div className={styles['avatar-action']}>
                <Link to={`/@${article.author.unique_id}`} className={styles['avatar-link']}>
                    <img className={styles['avatar-img']} src={article.author.avatar} alt={article.unique_id} />
                </Link>
                <button className={styles['avatar-follow-button']}>
                    <div className={styles['avatar-follow-button-content']}>
                        <PlusIcon style={{ width: '14px', height: '14px' }} />
                    </div>
                </button>
            </div>
            <button className={styles['button']}>
                <span className={styles['button-icon-wrapper']}>
                    <HeartIcon />
                </span>
                <strong className={styles['button-text']}>{formatNumber(article.digg_count)}</strong>
            </button>
            <button className={styles['button']}>
                <span className={styles['button-icon-wrapper']}>
                    <CommentIcon />
                </span>
                <strong className={styles['button-text']}>{formatNumber(article.comment_count)}</strong>
            </button>
            <button className={styles['button']}>
                <span className={styles['button-icon-wrapper']}>
                    <UnCollectIcon />
                </span>
                <strong className={styles['button-text']}>{formatNumber(article.download_count)}</strong>
            </button>
            <button className={styles['button']}>
                <span className={styles['button-icon-wrapper']}>
                    <ShareIcon />
                </span>
                <strong className={styles['button-text']}>{formatNumber(article.share_count)}</strong>
            </button>
        </section>
    );
}

Action.propTypes = {
    article: PropTypes.object.isRequired,
};

export default Action;

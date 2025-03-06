import { useEffect, useRef, useState } from 'react';

import styles from './Article.module.scss';
import * as videoListService from '~/services/videoListService';

import ArrowUpIcon from '~/assets/images/arrow-up-icon.svg?react';
import ArrowDownIcon from '~/assets/images/arrow-down-icon.svg?react';
import VolumeProvider from '~/providers/VolumeProvider';
import Action from './Action';
import Video from './Video';
import Button from '~/components/Button';

function Article() {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const articleRefs = useRef([]);
    const hasMoreArticles = useRef(true);
    const existingIds = useRef(new Set());

    useEffect(() => {
        const fetchApi = async () => {
            const result = await videoListService.videoList();
            if (result.length > 0) {
                setArticles(result);
                result.forEach((article) => existingIds.current.add(article.video_id));
            } else {
                hasMoreArticles.current = false;
            }
        };

        fetchApi();
    }, []);

    const loadMoreArticles = async () => {
        if (!hasMoreArticles.current) return;

        const result = await videoListService.videoList();
        if (result.length === 0) {
            hasMoreArticles.current = false;
            return;
        }

        const newArticles = result.filter((article) => !existingIds.current.has(article.video_id));
        if (newArticles.length > 0) {
            newArticles.forEach((article) => existingIds.current.add(article.video_id));
            setArticles((prevArticles) => [...prevArticles, ...newArticles]);
        } else {
            loadMoreArticles();
        }
    };

    const handleScrollButton = (direction) => {
        let newIndex = currentIndex;
        if (direction === 'up' && currentIndex > 0) {
            newIndex -= 1;
        } else if (direction === 'down' && currentIndex < articles.length - 1) {
            newIndex += 1;
            if (newIndex === articles.length - 4) {
                loadMoreArticles();
            }
        }

        setCurrentIndex(newIndex);
        articleRefs.current[newIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    const scrollToNext = () => {
        handleScrollButton('down');
    };

    return (
        <VolumeProvider>
            <div className={styles['wrapper']}>
                <div className={styles['slide-container']}>
                    {articles.map((article, index) => (
                        <article
                            key={index}
                            ref={(el) => (articleRefs.current[index] = el)}
                            className={styles['slide-item-container']}
                        >
                            <div className={styles['slide-item']}>
                                <Video data={article} scrollToNext={scrollToNext} />
                                <Action article={article} />
                            </div>
                        </article>
                    ))}
                </div>
                <div className={styles['feed-navigation-container']}>
                    <Button
                        className={styles['action-item-button']}
                        onClick={() => handleScrollButton('up')}
                        disabled={currentIndex === 0}
                    >
                        <ArrowUpIcon style={{ width: '24px', height: '24px' }} />
                    </Button>
                    <Button
                        className={styles['action-item-button']}
                        onClick={() => handleScrollButton('down')}
                        disabled={currentIndex === articles.length - 1}
                    >
                        <ArrowDownIcon style={{ width: '24px', height: '24px' }} />
                    </Button>
                </div>
            </div>
        </VolumeProvider>
    );
}

export default Article;

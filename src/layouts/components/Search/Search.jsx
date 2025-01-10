import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';

import * as searchService from '~/services/searchService';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import SearchIcon from '~/assets/images/search-icon.svg?react';
import ResetSearchIcon from '~/assets/images/reset-icon.svg?react';
import { useDebounce } from '~/hooks';
import clsx from 'clsx';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const debounceValue = useDebounce(searchValue, 700);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService.search(debounceValue, 'more');
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounceValue]);

    return (
        <HeadlessTippy
            interactive
            offset={[0, 8]}
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={styles['search-result']} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <ul className={styles['ul-search']}>
                            <h4 className={styles['search-title']}>Tài khoản</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </ul>
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={styles['search-container']}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm kiếm"
                    spellCheck="false"
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={styles['reset-search-btn']} onClick={handleClear}>
                        <ResetSearchIcon />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={styles['loading-icon']} icon={faSpinner} />}
                <span className={styles['span-spliter']}></span>
                <button className={styles['search-btn']}>
                    <SearchIcon
                        className={clsx(styles['search-icon'], {
                            [styles['search-icon-active']]: searchValue,
                        })}
                    />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;

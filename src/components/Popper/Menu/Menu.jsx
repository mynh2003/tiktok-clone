import HeadlessTippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';

function Menu({ children, hideOnClick = false, items = [] }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            const isFirstItem = index === 0;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        }
                    }}
                    onBack={history.length > 1 && isFirstItem && !current.isHeader ? handleBack : undefined}
                    className={current.itemClass}
                />
            );
        });
    };

    // Reset to first page when hide menu
    const hanldeResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    const renderResult = (attrs) => (
        <div className={styles['menu-item']} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                {history.length > 1 && current.isHeader && <Header title={current.title} onBack={handleBack} />}

                <ul
                    className={clsx(styles['list-item'], {
                        [styles['pad0']]: current.isHeader,
                    })}
                >
                    {renderItems()}
                </ul>
            </PopperWrapper>
        </div>
    );
    return (
        <HeadlessTippy
            interactive
            offset={[13, 12]}
            delay={[0, 700]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={renderResult}
            onHidden={hanldeResetMenu}
        >
            {children}
        </HeadlessTippy>
    );
}

Menu.prototype = {
    children: PropTypes.node.isRequired,
    hideOnClick: PropTypes.bool,
    items: PropTypes.array,
};

export default Menu;

import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AutoScrollContext = createContext();
function AutoScrollProvider({ children }) {
    const [isAutoScroll, setIsAutoScroll] = useState(false);

    const toggleSwitch = () => {
        setIsAutoScroll((prev) => !prev);
    };
    return <AutoScrollContext.Provider value={{ isAutoScroll, toggleSwitch }}>{children}</AutoScrollContext.Provider>;
}

export const useAutoScroll = () => useContext(AutoScrollContext);

AutoScrollProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AutoScrollProvider;

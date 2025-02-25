import { createContext, useContext, useState } from 'react';
import PropType from 'prop-types';

const AutoScrollContext = createContext();
function AutoScrollProvider({ children }) {
    const [isAutoScroll, setIsAutoScroll] = useState(false);

    const toggleSwitch = () => {
        setIsAutoScroll((prev) => !prev);
    };
    return <AutoScrollContext.Provider value={{ isAutoScroll, toggleSwitch }}>{children}</AutoScrollContext.Provider>;
}

export const useAutoScroll = () => useContext(AutoScrollContext);

AutoScrollProvider.prototype = {
    children: PropType.node.isRequired,
};

export default AutoScrollProvider;

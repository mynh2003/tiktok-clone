// ThemeContext.js
import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark'); // Mặc định là light mode

    const toggleTheme = (value) => {
        setTheme(value);
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;

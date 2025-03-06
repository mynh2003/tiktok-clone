import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '~/App.jsx';
import GlobalStyles from '~/components/GlobalStyles/index.jsx';
import ThemeProvider from '~/providers/ThemeProvider';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <ThemeProvider>
        <App />
    </ThemeProvider>,
    /* </StrictMode>, */
);

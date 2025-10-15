import {CssBaseline, ThemeProvider} from '@mui/material';
import {darkTheme} from './theme/theme';

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
        </ThemeProvider>
    );
}

export default App;

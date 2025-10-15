import {CssBaseline, ThemeProvider} from '@mui/material';
import {darkTheme} from './theme/theme';
import TodoBoard from "./pages/TodoBoard.tsx";

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <TodoBoard/>
        </ThemeProvider>
    );
}

export default App;

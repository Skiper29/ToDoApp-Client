import {Box, CssBaseline, ThemeProvider} from '@mui/material';
import {darkTheme} from '@theme/theme';
import TodoBoard from "@pages/TodoBoard.tsx";
import ErrorSnackbar from "@components/common/ErrorSnackbar.tsx";

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Box sx={{minHeight: '100vh', bgcolor: 'background.default'}}>
                <TodoBoard/>
                <ErrorSnackbar/>
            </Box>
        </ThemeProvider>
    );
}

export default App;

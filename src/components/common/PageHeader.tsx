import {AppBar, Toolbar, Typography} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface PageHeaderProps {
    title: string;
}

const PageHeader = ({title}: PageHeaderProps) => {
    return (
        <AppBar position="static" elevation={0} sx={{mb: 4, bgcolor: 'background.paper'}}>
            <Toolbar>
                <CheckCircleOutlineIcon sx={{mr: 2, fontSize: 32}} color="primary"/>
                <Typography variant="h5" component="h1" sx={{flexGrow: 1, fontWeight: 600}}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default PageHeader;
import {createTheme} from '@mui/material/styles';
import {Colors} from '@/utils/colors';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: Colors.background,
            paper:   Colors.surface,
        },
        text: {
            primary: Colors.textPrimary,
        },
        headerMain:        { main: Colors.headerBackground },
        headerContrastText: Colors.headerText,
    },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: Colors.headerBackground,
                    color:           Colors.headerText,
                }
            }
        }
    }
});

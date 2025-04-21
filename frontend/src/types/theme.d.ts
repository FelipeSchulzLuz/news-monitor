import type {SimplePaletteColorOptions, Theme as MuiTheme,} from '@mui/material/styles';
import 'styled-components';

declare module '@mui/material/styles' {
    interface Palette {
        primaryVariant: Palette['primary'];
        secondaryVariant: Palette['secondary'];
        surface: string;
        border: string;
        divider: string;
        hover: string;
        focus: Palette['primary'];
        headerMain: Palette['primary'];
        headerContrastText: string;
    }
    interface PaletteOptions {
        primaryVariant?: SimplePaletteColorOptions;
        secondaryVariant?: SimplePaletteColorOptions;
        surface?: string;
        border?: string;
        divider?: string;
        hover?: string;
        focus?: SimplePaletteColorOptions;
        headerMain?: SimplePaletteColorOptions;
        headerContrastText?: string;
    }
}


declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends MuiTheme {}
}

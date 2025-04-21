import styled from 'styled-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Container = styled(Box)`
    padding: ${({ theme }) => theme.spacing(4)};
    background: ${({ theme }) => theme.palette.background.paper};
    min-height: calc(100vh - 64px);
`;

export const Title = styled(Typography).attrs({ variant: 'h4' })`
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const FiltersContainer = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(2)};
    row-gap: ${({ theme }) => theme.spacing(3)};
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    align-items: flex-start;
`;

export const KeywordField = styled(TextField)`
    && {
        flex: 1 1 auto;
        min-width: 300px;
    }
`;

export const DateField = styled(TextField)`
    && {
        flex: 0 0 180px;
    }
`;

export const SourceField = styled(TextField)`
    && {
        flex: 0 0 200px;
    }
`;

export const SortField = styled(TextField)`
    && {
        flex: 0 0 220px;
    }
`;

export const FilterButton = styled(Button)`
    && {
        flex: 0 0 auto;
        white-space: nowrap;
    }
`;

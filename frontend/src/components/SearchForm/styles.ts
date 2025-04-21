import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const FormContainer = styled('form')`
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    display: flex;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing(2)};
    height: ${({ theme }) => theme.spacing(7)};
`;

export const StyledTextField = styled(TextField)`
    && {
        flex: 2;
        height: 56px;
    }
`;

export const SubmitButton = styled(Button)`
    && {
        height: 56px;
        flex: 1;
        white-space: nowrap;
    }
`;

export const ErrorText = styled(Typography)`
    && {
        color: ${({ theme }) => theme.palette.error.main};
        margin-left: ${({ theme }) => theme.spacing(1)};
        font-size: 0.875rem;
    }
`;

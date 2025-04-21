import styled from 'styled-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Container = styled(Box)`
    padding: ${({ theme }) => theme.spacing(4)};
    background: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
`;

export const Title = styled(Typography).attrs({ variant: 'h5' })`
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const Description = styled(Typography).attrs({ variant: 'body1' })`
    line-height: 1.5;
`;

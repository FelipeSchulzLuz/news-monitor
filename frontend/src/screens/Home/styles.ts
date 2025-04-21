import styled from 'styled-components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const PageContainer = styled(Box)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
  overflow-y: auto;
`;

export const ContentWrapper = styled(Container)<{ isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing(4)};
  text-align: ${({ isEmpty }) => (isEmpty ? 'center' : 'left')};
  max-width: ${({ isEmpty }) => (isEmpty ? '50rem' : 'auto')};
`;

export const LogoImage = styled('img')`
  width: 30%;
  min-width: 300px;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  object-fit: contain;
`;

export const ResultsText = styled(Typography).attrs({ variant: 'body2' })`
  && {
    color: ${({ theme }) => theme.palette.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

export const MainContainer = styled(Box)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

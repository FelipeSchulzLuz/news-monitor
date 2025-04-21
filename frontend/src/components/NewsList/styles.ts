import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const ListContainer = styled('div')`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(4)};
`;

export const EmptyMessage = styled(Typography).attrs({
    variant: 'body1',
    align: 'center',
})`
    color: ${({ theme }) => theme.palette.text.secondary};
    padding: ${({ theme }) => theme.spacing(4, 0)};
`;

export const StyledCard = styled(Card)`
    background-color: ${({ theme }) => theme.palette.background.paper};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    box-shadow: ${({ theme }) => theme.shadows[1]};
    transition: box-shadow 0.3s;

    &:hover {
        box-shadow: ${({ theme }) => theme.shadows[4]};
    }
`;

export const CardBody = styled(CardContent)`
    padding: ${({ theme }) => theme.spacing(2)};
    display: flex;
    flex-direction: column;
`;

export const Title = styled(Typography).attrs({
    variant: 'h6',
})`
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    margin: 0;
`;

export const TitleLink = styled(Link).attrs({
    underline: 'none',
})`
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};

    &:hover {
        text-decoration: underline;
    }
`;

export const PublishDate = styled(Typography).attrs({
    variant: 'caption',
})`
    color: ${({ theme }) => theme.palette.text.secondary};
    margin-top: ${({ theme }) => theme.spacing(1)};
`;

export const CardImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const Description = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin: 8px 0;
`;

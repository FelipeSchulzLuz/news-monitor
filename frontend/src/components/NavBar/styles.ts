import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Colors} from "../../utils/colors";

export const StyledAppBar = styled(AppBar)`
`;

export const StyledToolbar = styled(Toolbar)`
    display: flex;
    justify-content: center;
`;

export const NavLink = styled('a')`
  margin: ${({ theme }) => theme.spacing(0, 2)};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};

  &:hover {
    color: ${Colors.headerText};
  }
`;

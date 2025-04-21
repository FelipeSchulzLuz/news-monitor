import {NavLink, StyledAppBar, StyledToolbar} from './styles';
import {Link} from 'react-router-dom';

export function NavBar() {
    return (
        <StyledAppBar position="fixed" elevation={0}>
            <StyledToolbar>
                <NavLink as={Link} to="/">
                    Home
                </NavLink>
                <NavLink as={Link} to="/results">
                    Resultados
                </NavLink>
                <NavLink as={Link} to="/about">
                    Sobre
                </NavLink>
            </StyledToolbar>
        </StyledAppBar>
    );
}

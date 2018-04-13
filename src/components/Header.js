import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <Navbar collapseOnSelect>
            <Nav pullRight>
                <NavItem>
                    <Link to='/'>Поиск фильмов</Link>
                </NavItem>
            </Nav>
        </Navbar>
    )
}
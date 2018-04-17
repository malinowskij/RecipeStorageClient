import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const linkStyle = {
      color: 'white'
    }

    var loginLabel = "Zaloguj";
    var logout = null;
    var userActions = null;
    var register = (
      <NavItem>
        <Link style={linkStyle} to="/register">
          <NavLink>
            Zarejestruj
          </NavLink>
        </Link>
      </NavItem>
    );
    if (localStorage.getItem('isLogged') === 'true') {
      loginLabel = "Witaj, " + localStorage.getItem('userName');
      register = null;
      logout = (
        <NavItem>
          <Link style={linkStyle} to="/logout">
            <NavLink>
              Wyloguj
            </NavLink>
          </Link>
        </NavItem>
      );
      userActions = (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Moje akcje
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <Link style={{ color: "black" }} to="/recipe/add">Dodaj przepis!</Link>
            </DropdownItem>
            <DropdownItem>
              Option 2
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Reset
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">
            <Link style={linkStyle} to="/">Książka kucharska</Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link style={linkStyle} to="/login">
                  <NavLink>
                    {loginLabel}
                  </NavLink>
                </Link>
              </NavItem>
              {logout}
              {register}
              <NavItem>
                <Link style={linkStyle} to="/catalog">
                  <NavLink>
                    Katalog przepisów
                  </NavLink>
                </Link>
              </NavItem>
              {userActions}
              <NavItem>
                <Link style={linkStyle} to="/about">
                  <NavLink>
                    O mnie
                  </NavLink>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;

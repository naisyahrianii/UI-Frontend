import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

import {
    Button,
    Collapse,
    DropdownToggle,
    DropdownMenu,
    NavbarBrand,
    Navbar,
    NavbarToggler, 
    Nav,
    NavItem,
    UncontrolledDropdown
    } from 'reactstrap';

import {onLogoutUser} from '../actions/index'
    
class Header extends Component {
    constructor(props) {
        super(props);

         this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

       toggle() {
        this.setState(({
            isOpen: !this.state.isOpen
        }));
      }

    
    
    render() {
        const {user} = this.props

        if(user.name === ''){
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <div className="container">
                            <Link className="navbar-brand" to="/">ReactMongoose</Link>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Link className="nav-link" to="/">Tasks</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/register"><Button className="mx-3" color="primary">Register</Button></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/login"><Button color="success">Login</Button></Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                </div>
            )
        } return (
            <div>
                    <Navbar color="light" light expand="md">
                        <div className="container">
                            <NavbarBrand href="/">ReactMongoose</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Link className="nav-link" to="/">Tasks</Link>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret className="text-capitalize">
                                            Welcome, {user.name}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                        <Link to="/profile"><Button className="dropdown-item">
                                            Profile
                                        </Button></Link>
                                        <Link to="/login"><Button className="dropdown-item" onClick={this.props.onLogoutUser}>
                                            Log out
                                        </Button></Link>
                                        
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                </div>
          );
    }
}

const mapStateToProps = (state) => {
    return {user: state.auth}
}

export default connect (mapStateToProps, {onLogoutUser})(Header);
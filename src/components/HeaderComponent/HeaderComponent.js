import React, { Component } from 'react';
import { Navbar, NavbarToggler } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false
        }
    }

    togglerPopOver = () => {
        this.setState({ popoverOpen: !this.state.popoverOpen })
    }
    render() {
        return (
            <div>
                <Navbar color="white" light >
                    <div>
                    <NavbarToggler onClick={this.props.togglerMenu} />
                    <div className="searchbox">
                        <FontAwesomeIcon icon="search" />
                        <input type="text" className="search-input" />
                    </div>
                    
                    </div>
                    <div>
                    <div className="invite">
                        <FontAwesomeIcon icon="user" className="user-icon"/>
                        <span>INVITE TEAM MEMBER</span>
                    </div>
                    <span className="notification"><FontAwesomeIcon icon="bell"/></span>
                    <img id="Popover1" className="profilepic" src="/assets/mohanlal.jpg" alt="profile-pic" />
                    <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglerPopOver}>
                        <PopoverHeader><div>Darkmode</div><div>Profile</div></PopoverHeader>
                        <PopoverBody><div>Whats new</div><div>Help</div><div>Send feedback</div><div>Hints and Shortcuts</div><hr/><div>Logout</div></PopoverBody>
                    </Popover>
                    </div>
                </Navbar>

            </div>
        );
    }
}

export default Header
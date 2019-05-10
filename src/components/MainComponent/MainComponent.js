import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import { menuItems } from './MenuItems';
import MenuBar from './MenuBarComponent';
import ContentSection from '../ContentComponent/ContentComponent'
import './Menu.css';
import { Route, Switch,Redirect } from 'react-router-dom';
import Welcome from './welcomeComponent'
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMenu: menuItems.all
        }
    }
    selectMenu(selectedMenu) {
        this.setState({ selectedMenu: selectedMenu })
    }
    activeMenu(menuItem) {
        if (this.state.selectedMenu === menuItem) {
            return { borderBottom: '2px solid red' }
        }
        else {
            return {}
        }
    }

    render() {
        return (
            <div className="main row">
                <Collapse isOpen={this.props.isOpen} navbar className="menubar col-3" >

                    <div>
                        <div className="menu-heading">
                            <div className="menu-tabs row">
                                <div className="menu-item col-3" onClick={() => this.selectMenu(menuItems.all)} style={this.activeMenu(menuItems.all)}>
                                    {menuItems.all}
                                </div>
                                <div className="menu-item col-3" onClick={() => this.selectMenu(menuItems.board)} style={this.activeMenu(menuItems.board)}>
                                    {menuItems.board}
                                </div>
                                <div className="menu-item col-3" onClick={() => this.selectMenu(menuItems.graph)} style={this.activeMenu(menuItems.graph)}>
                                    {menuItems.graph}
                                </div>
                                <div className="menu-item col-3" onClick={() => this.selectMenu(menuItems.recent)} style={this.activeMenu(menuItems.recent)}>
                                    {menuItems.recent}
                                </div>
                            </div>
                        </div>

                        <MenuBar isOpen={this.props.isOpen} />
                    </div>

                </Collapse>
                <Switch>
                    <Route path="/:id" component={ContentSection} />
                    <Route exact path="/" component={Welcome}/>
                </Switch>

            </div>
        );
    }
}

export default Main
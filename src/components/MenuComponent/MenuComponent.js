import React,{Component} from 'react';
import {Collapse} from 'reactstrap';
import {menuItems} from './MenuItems';
import MenuBar from './MenuBarComponent'
import './Menu.css'
class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedMenu:menuItems.all
        }
    }
    selectMenu(selectedMenu){
        this.setState({selectedMenu:selectedMenu})
    }
    activeMenu(menuItem){
        if(this.state.selectedMenu===menuItem){
            return {borderBottom:'2px solid red'}
        }
        else
        {
            return {}
        }
    }

    render(){
        return(
            <div>
                <Collapse isOpen={this.props.isOpen} navbar>
                    <div className="col-3">
                        <div className="menutabs row">
                            <div className="menu-item col-3 " onClick={()=>this.selectMenu(menuItems.all)} style={this.activeMenu(menuItems.all)}>
                                {menuItems.all}
                            </div>
                            <div className="menu-item col-3" onClick={()=>this.selectMenu(menuItems.board)} style={this.activeMenu(menuItems.board)}>
                                {menuItems.board}
                            </div>
                            <div className="menu-item col-3" onClick={()=>this.selectMenu(menuItems.graph)} style={this.activeMenu(menuItems.graph)}>
                                {menuItems.graph}
                            </div>
                            <div className="menu-item col-3" onClick={()=>this.selectMenu(menuItems.recent)} style={this.activeMenu(menuItems.recent)}>
                                {menuItems.recent}
                            </div>
                        </div>
                    </div>
                        <MenuBar isOpen={this.props.isOpen}/>
              
                </Collapse>
            </div>
        );
    }
}

export default Menu
import React,{Component} from 'react';
import {Navbar,NavbarToggler} from 'reactstrap';
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';    

class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            popoverOpen:false
        }
    }
    
    togglerPopOver=()=>{
        this.setState({popoverOpen:!this.state.popoverOpen})
    }
    render(){
        return(
            <div>
                <Navbar color="light" light >
                    <NavbarToggler onClick={this.props.togglerMenu}/>
                    <input type="text" className="col-3"/>
                    <span>INVITE TEAM MEMBER</span>
                        <img id="Popover1" className="profilepic" src="assets/mohanlal.jpg" alt="profile-pic"/>
                    <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglerPopOver}>
                    <PopoverHeader>Popover Title</PopoverHeader>
                    <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                    </Popover>   
                </Navbar>
                
            </div>
        );
    }
}

export default Main
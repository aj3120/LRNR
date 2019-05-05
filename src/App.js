import React,{Component} from 'react';
import './App.css';
import Main from './components/MainComponent/MainComponent';
import Menu from './components/MenuComponent/MenuComponent';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen:false
    }
  }
  togglerMenu=()=>{
    this.setState({isOpen:!this.state.isOpen})
  }

  render(){
    return (
      <div className="App">
        <Main togglerMenu={this.togglerMenu}/>
        <Menu isOpen={this.state.isOpen}/>
      </div>
    );
  }
  
}

export default App;

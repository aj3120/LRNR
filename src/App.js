import React,{Component} from 'react';
import './App.css';
import Header from './components/HeaderComponent/HeaderComponent';
import Main from './components/MainComponent/MainComponent';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch,faUser,faPlus,faFolderPlus,faAngleRight,faAngleDown,faItalic,faBold,faPlusCircle,faBell} from '@fortawesome/free-solid-svg-icons'
library.add(faUser,faSearch,faPlus,faFolderPlus,faAngleRight,faAngleDown,faItalic,faBold,faPlusCircle,faBell)

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen:true
    }
  }
  
  togglerMenu=()=>{
    this.setState({isOpen:!this.state.isOpen})
  }

  render(){
    return (
      <div className="App">
        <Header togglerMenu={this.togglerMenu}/>
        <Main isOpen={this.state.isOpen}/>
      </div>
    );
  }
  
}

export default App;

import React, { Component } from "react";
import { Editor, EditorState, ContentState,RichUtils} from "draft-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import onClickOutside from "react-onclickoutside";
class ContentBoxHead extends Component {
    constructor(props){
        super(props);
        this.state={
            editorState:EditorState.createWithContent(
                ContentState.createFromText(props.editorState)
              ),
            editorButtonState:'hidden'
        }
    }
    onChange = (editorState) => {
      if(window.getSelection().toString()!==undefined){    
        this.setState({ editorState:editorState,editorButtonState:'visible'})
      }
    };
    _onBoldClick() {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    _onItalicClick() {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    }
    handleClickOutside=(evt)=>{
      if(this.state.editorButtonState==='visible'){
          this.setState({editorButtonState:'hidden'})
      }
    }
    render(){
        return(
          <div>
              <div className="editbox" style={{visibility:this.state.editorButtonState}}>
                    <div onClick={this._onBoldClick.bind(this)}><FontAwesomeIcon icon="bold" color="white"/></div>
                    <div onClick={this._onItalicClick.bind(this)}><FontAwesomeIcon icon="italic" color="white"/></div>
              </div>
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
              >
              </Editor>
          </div>
        )
    }
}
export default onClickOutside(ContentBoxHead)
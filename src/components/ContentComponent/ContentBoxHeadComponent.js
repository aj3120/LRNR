import React, { Component } from "react";
import { Editor, EditorState, ContentState,RichUtils} from "draft-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      if(window.getSelection().toString()!==""){
        let s = window.getSelection();
        let oRange = s.getRangeAt(0); //get the text range
        let oRect = oRange.getBoundingClientRect();
        this.setState({ editorState:editorState,editorButtonState:'visible' ,editorPosition:{x:oRect.left-this.contentbox.current.offsetLeft,y:oRect.top.y-this.contentbox.current.offsetTop}})
    
    }
    };
    _onBoldClick() {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    _onItalicClick() {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
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
export default ContentBoxHead
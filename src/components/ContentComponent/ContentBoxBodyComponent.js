import React, { Component } from "react";
import { Editor, EditorState, ContentState, RichUtils } from "draft-js";
import onClickOutside from "react-onclickoutside";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ContentBoxBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(
                ContentState.createFromText(props.editorState)
            ),
            editorButtonState:'hidden',
            editorPosition:{x:0,y:0}
        }
        this.editbox=React.createRef()
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
    render() {
        return (
            <div className="content-box" >
                <div className="editbox"  ref={this.editbox} style={{visibility:this.state.editorButtonState}}>
                    <div onClick={this._onBoldClick.bind(this)}><FontAwesomeIcon icon="bold" color="white"/></div>
                    <div onClick={this._onItalicClick.bind(this)}><FontAwesomeIcon icon="italic"  color="white"/></div>
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
export default onClickOutside(ContentBoxBody)
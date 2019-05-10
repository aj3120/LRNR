import React, { Component } from "react";
import ContentBoxHead from "./ContentBoxHeadComponent";
import ContentBoxBody from "./ContentBoxBodyComponent";
import { Media } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux'
import "./Content.css";
import { bindActionCreators } from 'redux'
import { contentUpdateAction } from '../../redux/actions/contentAction';
import {contentLoadingAction} from '../../redux/actions/contentAction'
const mapStateToProps = (state) => {
    return ({
        content_data: state.contentReducer.content_data,
    })
}
const mapDispatchToProps = (dispach) => {
    return ({
        action: bindActionCreators({ contentUpdateAction  , contentLoadingAction}, dispach)
    })
}
class ContentSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addContent: '',
            addHeading: '',
            add_flag: false
        };
    }
    addHeadingChange = (event) => {
        this.setState({ addHeading: event.target.value })
    }
    addContentChange = (event) => {
        this.setState({ addContent: event.target.value })
    }
    addContent = () => {
        this.setState({ add_flag: !this.state.add_flag })
    }
    addContentToContentArray = () => {
        if (this.state.addHeading !== "" && this.state.addContent !== "") {
            if(this.props.content_data===null){
                    this.props.action.contentUpdateAction({ id: parseInt(this.props.match.params.id) * 10 + 1, heading: this.state.addHeading, description: this.state.addContent })
            }  
            else{
                this.props.action.contentUpdateAction({ id: this.props.content_data.id * 10 + this.props.content_data.contents.length + 1, heading: this.state.addHeading, description: this.state.addContent })
            }      
            this.setState({
                add_flag: false,
                addHeading: '',
                addContent: ''
            })
        }
    }
    componentDidMount() {
        this.props.action.contentLoadingAction(parseInt(this.props.match.params.id))
    }
    componentWillReceiveProps(currentProps) {
        let query_params = this.props.match.params.id;
        if (query_params !== currentProps.match.params.id) {
            this.props.action.contentLoadingAction(parseInt(currentProps.match.params.id))
        }
    }
    render() {
        if (this.props.content_data === null ) {
            return (
                <div className="content-section container col-9">
                    <span id="content-add-button" onClick={this.addContent}><FontAwesomeIcon icon="plus-circle" size="2x" /></span>
                    <Media className="mt-1" style={{ display: this.state.add_flag ? 'block' : 'none' }}>
                        <Media body>
                            <Media heading>
                                <input className="col-12" type="text" placeholder="Add Title" value={this.state.addHeading} onChange={this.addHeadingChange} />
                            </Media>
                            <input className="col-12" type="text" placeholder="Add Description" value={this.state.addContent} onChange={this.addContentChange} />
                        </Media>
                        <input type="submit" id="add-content" value="Add Item" onClick={this.addFirstContentToContentArray} />
                    </Media>
                </div>
            )
        }
        else {
            return (
                <div className="content-section container col-9">
                    {this.props.content_data.contents.map(item => (
                        <div key={item.id}>
                            <Media className="content-item mt-1">
                                <Media body>
                                    <Media heading>
                                        <ContentBoxHead editorState={item.heading} />
                                    </Media>

                                    <ContentBoxBody editorState={item.description} />
                                </Media>
                            </Media>
                        </div>
                    ))}
                    <span id="content-add-button" onClick={this.addContent}><FontAwesomeIcon icon="plus-circle" size="2x" /></span>
                    <Media className="mt-1" style={{ display: this.state.add_flag ? 'block' : 'none' }}>
                        <Media body>
                            <Media heading>
                                <input className="col-12" type="text" placeholder="Add Title" value={this.state.addHeading} onChange={this.addHeadingChange} />
                            </Media>
                            <input className="col-12" type="text" placeholder="Add Description" value={this.state.addContent} onChange={this.addContentChange} />
                        </Media>
                        <input type="submit" id="add-content" value="Add Item" onClick={this.addContentToContentArray} />
                    </Media>
                </div>
            );

        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentSection);

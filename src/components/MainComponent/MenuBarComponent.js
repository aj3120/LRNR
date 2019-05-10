import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {changeMenuAction} from '../../redux/actions/menuAction';
import { bindActionCreators } from 'redux';
import {loadMenuAction} from '../../redux/actions/menuAction'
const mapStateToProps=(state)=>{
    return({
        data:state.menuListReducer.menuListdata,
        renderElement:state.menuListReducer.renderElement,
        flag:state.menuListReducer.flag,
    })
}
const mapDispatchToProps=(dispach)=>{
    return({
        action:bindActionCreators({changeMenuAction,loadMenuAction},dispach)
    })
}
class MenuBar extends Component {

    expandMenu = (selectedItem) => {
        this.temp = [...this.props.data];
        this.hiddenChange(selectedItem, this.temp)
        this.menu = []
        this.menuCreator(this.temp)
        this.props.action.changeMenuAction({ data: this.temp, renderElement: this.menu })
    }
    hiddenChange = (selectedItem, arr) => {
        arr.forEach((item) => {
            if (item.type === "collection" && item.id === selectedItem.id) {
                item.collection.forEach((element) => {
                    element.hidden = !element.hidden;
                })
            }
            else if (item.type === "collection") {
                this.hiddenChange(selectedItem, item.collection)
            }
            else {
                return 0
            }

        })

    }
    findItem = (item, arr, flag) => {

        arr.forEach((element) => {

            if (element.type === "collection") {
                if (item.id == element.id) {
                    if (flag === 'collection') {
                        element.collection.push({ id: item.id * 10 + item.collection.length + 1, name: 'New', type: 'collection', hidden: item.collection[0] !== undefined ? item.collection[0].hidden : false, collection: [] })
                        element.collection.forEach((item) => { item.hidden = false })
                    }
                    else {
                        element.collection.push({ id: item.id * 10 + item.collection.length + 1, name: 'New', type: 'item', hidden: item.collection[0] !== undefined ? item.collection[0].hidden : false })
                        element.collection.forEach((item) => { item.hidden = false })
                    }
                }
                this.findItem(item, element.collection, flag)
            }
        })
    }
    addCollection = (event, item) => {
        event.stopPropagation()
        var tempAdd = [...this.props.data]
        this.findItem(item, tempAdd, 'collection')
        this.menu = []
        this.menuCreator(tempAdd, 'home')
        this.props.action.changeMenuAction({ data: tempAdd, renderElement: this.menu ,flag:'change'})

    }
    addItem = (event, item) => {
        event.stopPropagation()
        var tempAdd = [...this.props.data]
        this.findItem(item, tempAdd, 'item')
        this.menu = []
        this.menuCreator(tempAdd, 'home')
        this.props.action.changeMenuAction({ data: tempAdd, renderElement: this.menu ,flag:'change'})

    }
    checkInActiveLinks = (item) => {
        if (item.type === 'collection') {
            if (item.collection[0] != undefined && item.collection[0].hidden === false)
                return 'inline-block'
            else
                return 'none'
        }
        else
            return 'none'
    }
    menuCreator = (arr, parentname) => {
        arr.forEach((item) => {
            let marginleft = item.id.toString().length
            if (item.type === "collection") {
                this.a = this.a + item.name;
                this.menu.push(<div id="collection" key={item.id} style={{ display: item.hidden ? 'none' : 'block', marginLeft: marginleft * 20 + 'px' }} className="" onClick={() => this.expandMenu(item)}>
                    <span id="right-icon" style={{ display: this.checkInActiveLinks(item) === 'inline-block' ? 'none' : 'inline-block' }}><FontAwesomeIcon icon="angle-right" /></span>
                    <span id="left-icon" style={{ display: this.checkInActiveLinks(item) }}><FontAwesomeIcon icon="angle-down" /></span>
                    {item.name}

                    <span id="addCollection" onClick={(event) => this.addCollection(event, item)}> <FontAwesomeIcon icon="folder-plus" /></span>
                    <span id="addItem" onClick={(event) => this.addItem(event, item)}> <FontAwesomeIcon icon="plus" /> </span>
                </div>)
                this.menuCreator(item.collection, item.name)

            }
            else {
                this.menu.push(<div id="item" key={item.id} className="" style={{ display: item.hidden ? 'none' : 'block', marginLeft: marginleft * 20 + 'px' }} > <span id="right-icon" style={{ display: item.hidden ? 'none' : 'inline-block' }}><FontAwesomeIcon icon="angle-right" /></span>
                    <Link to={`/${item.id}`}>{item.name}</Link></div>)
            }
        })
    }

    componentWillReceiveProps(currentProps) {
        this.menu = [];
        this.path = [];
        console.log(currentProps.flag)
        if(currentProps.flag==='nochange'){
            this.menuCreator(currentProps.data, 'home')
            this.props.action.changeMenuAction({ data: currentProps.data, renderElement: this.menu })
        }
        
    }
    componentDidMount(){
        this.props.action.loadMenuAction()
      }
    render() {
        return (
            <div className="menubar-content col-12" >
                {this.props.renderElement}
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MenuBar))
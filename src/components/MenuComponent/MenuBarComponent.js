import React,{Component} from 'react';
import {menuAllList} from './MenuItems';
import {Link} from 'react-router-dom';
class MenuBar extends Component{
    constructor(props){
        super(props);
        this.state={
            data:menuAllList.data,
        renderElement:[]
    }
    }
    expandMenu=(selectedItem)=>{
        this.temp=[...this.state.data];
        this.hiddenChange(selectedItem,this.temp)
        this.menu=[]
        this.menuCreator(this.temp)
        this.setState({data:this.temp,renderElement:this.menu})

    }



    hiddenChange=(selectedItem,arr)=>{
        arr.forEach((item)=>{
            if(item.type==="collection" && item.id===selectedItem.id){
                item.collection.forEach((element)=>{
                    element.hidden=!element.hidden;
                })
            }
            else if(item.type==="collection"){
                this.hiddenChange(selectedItem,item.collection)
            }
            else{
                return 0
            }
            
        })

    }
    
    menuCreator=(arr)=>{
        arr.forEach((item)=>{
            let marginleft=item.id.toString().length
            if(item.type==="collection"){
                this.path=[]
                this.path.push(item.name)
                this.menu.push(<div key={item.id} style={{display:item.hidden?'none':'block',marginLeft:marginleft*20+'px'}} className="" onClick={()=>this.expandMenu(item)}>{item.name}</div>)
                this.menuCreator(item.collection)
            }
            else{
                let pathname=this.path.reduce((prevValue,curentValue)=>prevValue+'/'+curentValue)
                this.menu.push(<Link to={`/${pathname}/${item.name}`} key={item.id} className="" style={{display:item.hidden?'none':'block',color:'red',marginLeft:marginleft*20+'px'}} onClick={(item)=>{this.expandMenu(item)}}>{item.name}</Link>)
            }
        })
    }

    componentDidMount(){
        this.menu=[];
        this.path=[];
        this.menuCreator(this.state.data)
        this.setState({renderElement:this.menu})
    }
    render(){
            return(
                <div className="menubar col-3" >
                    {this.state.renderElement}
                </div>
            );        
    }
}
export default MenuBar
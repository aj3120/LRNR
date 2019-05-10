import {actionTypes} from '../ActionTypes';
import { content_data } from "../../components/ContentComponent/content";
const initialState={
    content_data:null
}

function contentUpdateReducer(state = initialState, action) {
    switch (action.type) {
      case actionTypes.UPDATE_CONTENT:
        var found_flag=false;
        var temp={...state.content_data};
        var data = JSON.parse(localStorage.getItem("contents"))
        data.forEach((item)=>{
            if(item.id===state.content_data.id){
                item.contents.push(action.payload)
                found_flag=true;
            }
        })
        temp.contents.push(action.payload)
        if(found_flag===false){
            data.push(temp)
        }
        localStorage.setItem("contents", JSON.stringify(data));
        return {...state,content_data:temp}
      case actionTypes.LOADING_CONTENT:
        if(localStorage.getItem("contents")===null){
            localStorage.setItem("contents", JSON.stringify(content_data));
        }
        let filtered_data = JSON.parse(localStorage.getItem("contents")).filter(item => item.id === action.payload)[0]
        if(filtered_data===undefined){
            return({...state,id:action.payload,content_data:{id:action.payload,contents:[]}})
        }
        else{
            return({...state,content_data:filtered_data})
        }
      default:
        return state
    }
  }

export default contentUpdateReducer
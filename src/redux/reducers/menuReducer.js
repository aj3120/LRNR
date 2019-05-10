import { menuAllList } from '../../components/MainComponent/MenuItems';
import {actionTypes} from '../ActionTypes';
const initialState={
    menuListdata: [],
    renderElement: [],
    flag:'change'
}

function menuListReducer(state = initialState, action) {
    switch (action.type) {
      case actionTypes.CHANGE_MENU_LIST:
        localStorage.setItem('menu',JSON.stringify(action.payload.data))
        return {...state,menuListdata:action.payload.data,renderElement:action.payload.renderElement,flag:'change'}
      case actionTypes.LOAD_MENU:
        if(localStorage.getItem('menu')===null){
          localStorage.setItem('menu',JSON.stringify(menuAllList))
        }
        let menu_from_storage=JSON.parse(localStorage.getItem('menu'))
        console.log(menu_from_storage)
        return {...state,menuListdata:menu_from_storage,flag:'nochange'}  
      default:
        return state
    }
  }

export default menuListReducer
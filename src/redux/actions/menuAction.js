import {actionTypes} from '../ActionTypes';
export function changeMenuAction(data) {
    return {
      type: actionTypes.CHANGE_MENU_LIST,
      payload:data
    }
}
export function loadMenuAction(data) {
    return {
      type: actionTypes.LOAD_MENU,
      payload:data
    }
}
import {actionTypes} from '../ActionTypes'
export function contentUpdateAction(data) {
    return {
      type: actionTypes.UPDATE_CONTENT,
      payload:data
    }
}
export function contentLoadingAction(data) {
    return {
      type: actionTypes.LOADING_CONTENT,
      payload:data
    }
}
import * as types from '../constants/ActionType';
const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER:
            console.log(123456);
            return {...action.data};
        case types.LOGOUT_USER:{
            return null;
        }
        default:
            return state;
    }
}
export default reducer;
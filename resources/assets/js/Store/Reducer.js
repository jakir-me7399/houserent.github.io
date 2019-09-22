const initialState = {
    base_url : "http://localhost:8000/",
    user: {},
    login : false,
}
const Reducer = ( state = initialState, action ) => {
    switch(action.type){
        case 'SET_USER_DATA':
            return {
                ...state,
                login : action.login,
                user : action.user,
            }
            break;

        default:
            return state;
            break;
    }
}
export default Reducer;
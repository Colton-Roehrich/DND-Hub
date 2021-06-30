//set athlete list to action payload
const characterReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHARACTERS':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default characterReducer;

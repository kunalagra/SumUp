const commonReducer = (state, action) => {
    switch (action.type) {

        case 'ADD_SUMMARIES':
            
            return {
                ...state,
                summaries: [...state.summaries, action.payload.summ],
            };

        default:
            return state;
    }
};

export default commonReducer;
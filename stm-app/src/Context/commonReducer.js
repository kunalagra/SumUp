const commonReducer = (state, action) => {
    switch (action.type) {

        case 'ADD_SUMMARIES':
            return {
                ...state,
                summaries: [...state.summaries, action.payload.summ]
            };
        
        case 'ADD_PARA':
            return {
                ...state,
                para: action.payload.para
            };

        case 'CLEAR_SUMMARIES':
            return {
                ...state,
                summaries: []
            };

        case 'CLEAR_PARA':
            return {
                ...state,
                parag: ''
            };

        default:
            return state;
    }
};

export default commonReducer;
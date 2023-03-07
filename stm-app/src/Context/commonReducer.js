const commonReducer = (state, action) => {
    switch (action.type) {

        case 'SET_SUMMARY':
            return {
                ...state,
                gen_summary: action.payload.summ
            };
        
        case 'SET_PARA':
            return {
                ...state,
                para: action.payload.para
            };

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload.load
            }

        default:
            return state;
    }
};

export default commonReducer;
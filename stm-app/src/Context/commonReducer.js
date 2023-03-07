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

        case 'SET_LOADING_CONT':
            return {
                ...state,
                loadCont: action.payload.cont
            }
        
        case 'SET_SUMMITEM':
            return {
                ...state,
                mySummitem: action.payload.summ
            }
        
        case 'SET_TRANSCRIPT':
            return {
                ...state,
                myTranscript: action.payload.trans
            }

        default:
            return state;
    }
};

export default commonReducer;
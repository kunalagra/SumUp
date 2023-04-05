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
            localStorage.setItem("summary", JSON.stringify(action.payload.summ));
            return {
                ...state,
                mySummitem: action.payload.summ
            }
        
        case 'SET_TRANSCRIPT':
            localStorage.setItem("transcript", action.payload.trans);
            return {
                ...state,
                myTranscript: action.payload.trans
            }

        case 'SET_MY_SUMMARIES':
            return {
                ...state,
                mySummaries: action.payload.summ
            }

        case 'SET_ERROR':
            return {
                ...state,
                isError: action.payload.err
            }

        default:
            return state;
    }
};

export default commonReducer;
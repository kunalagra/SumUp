import { createContext, useReducer } from 'react';
import commonReducer from './commonReducer';

const commonContext = createContext();

const initialState = {
    summaries: [],
    para: '',
    isLoading: false
};


const CommonProvider = ({ children }) => {

    
    const [state, dispatch] = useReducer(commonReducer, initialState);

    const addSummary = (summ) => {
        return dispatch({
            type: 'ADD_SUMMARIES',
            payload: { summ }
        })
    }

    const addPara = (para) => {
        return dispatch({
            type: 'ADD_PARA',
            payload: { para }
        })
    }

    const clearSummaries = () => {
        return dispatch({
            type: 'CLEAR_SUMMARIES'
        })
    }

    const clearPara = () => {
        return dispatch({
            type: 'CLEAR_PARA'
        })
    }

    const setLoading = (load) => {
        return dispatch({
            type: 'SET_LOADING',
            payload: { load }
        })
    }

    // Context values
    const values = {
        ...state,
        addSummary,
        addPara,
        clearSummaries,
        clearPara,
        setLoading
    };

    return (
        <commonContext.Provider value={values}>
            {children}
        </commonContext.Provider>
    );
};

export default commonContext;
export { CommonProvider };
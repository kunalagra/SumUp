import { createContext, useReducer } from 'react';
import commonReducer from './commonReducer';

const commonContext = createContext();

const initialState = {
    gen_summary: null,
    para: '',
    isLoading: false
};


const CommonProvider = ({ children }) => {

    
    const [state, dispatch] = useReducer(commonReducer, initialState);

    const setSummary = (summ) => {
        return dispatch({
            type: 'SET_SUMMARY',
            payload: { summ }
        })
    }

    const setParagraph = (para) => {
        return dispatch({
            type: 'SET_PARA',
            payload: { para }
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
        setSummary,
        setParagraph,
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
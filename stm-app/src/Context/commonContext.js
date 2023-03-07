import { createContext, useReducer } from 'react';
import commonReducer from './commonReducer';

const commonContext = createContext();

const initialState = {
    gen_summary: null,
    para: '',
    isLoading: false,
    loadCont: "",
    mySummitem: null,
    myTranscript: "",
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

    const setLoadCont = (cont) => {
        return dispatch({
            type: 'SET_LOADING_CONT',
            payload: { cont }
        })
    }

    const setSummitem = (summ) => {
        return dispatch({
            type: 'SET_SUMMITEM',
            payload: { summ }
        })
    }

    const setTranscript = (trans) => {
        return dispatch({
            type: 'SET_TRANSCRIPT',
            payload: { trans }
        })
    }

    // Context values
    const values = {
        ...state,
        setSummary,
        setParagraph,
        setLoading,
        setLoadCont,
        setSummitem,
        setTranscript
    };

    return (
        <commonContext.Provider value={values}>
            {children}
        </commonContext.Provider>
    );
};

export default commonContext;
export { CommonProvider };
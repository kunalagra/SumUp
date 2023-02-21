import { createContext, useReducer } from 'react';
import commonReducer from './commonReducer';

const commonContext = createContext();

const initialState = {
    summaries: []
};


const CommonProvider = ({ children }) => {

    const [state, dispatch] = useReducer(commonReducer, initialState);

    const addSummary = (summ) => {
        return dispatch({
            type: 'ADD_SUMMARIES',
            payload: { summ }
        })
    }

    // Context values
    const values = {
        ...state,
        addSummary,
    };

    return (
        <commonContext.Provider value={values}>
            {children}
        </commonContext.Provider>
    );
};

export default commonContext;
export { CommonProvider };
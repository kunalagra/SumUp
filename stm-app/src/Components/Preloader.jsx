import React from 'react';
import { useTheme } from '@mui/material';
import { tokens } from "../theme";

const Preloader = ({cont}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <>
            <div id="preloader" style={{
                backgroundColor: theme.palette.mode==='dark'? "var(--dark-color-9)" : "var(--light-color-1)",
                color: colors.grey[100]
            }}>
                <div className="loader" style={{
                    boxShadow: `1px 8px 8px ${colors.primary[400]}`
                }}></div>
                <div className="loader_content">
                    <div className='loader_img'></div>
                    <div className='loader_text'>Loading...</div>
                </div>
                <div className='preloader-extra-content'>{cont}</div>
            </div>
        </>
    );
};

export default Preloader;
import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
    ...(mode==='dark'? {
        grey: {
            100: "#e0e0e0",
            200: "#c2c2c2",
            300: "#a3a3a3",
            400: "#858585",
            500: "#666666",
            600: "#525252",
            700: "#3d3d3d",
            800: "#292929",
            900: "#141414",
        },
        primary: {
            100: "#5b3a3a",
            200: "#7a4444",
            300: "#7a4d4d",
            400: "#cb7171",
            500: "#986060",
            600: "#986060",
            700: "#cb7171",
            800: "#d58d8d",
            900: "#e0aaaa",
        },
        light: {
            100: "#ad8080",
            200: "#c1a0a0",
            300: "#d58d8d",
            400: "#d6bfbf",
            500: "#e0aaaa",
            600: "#eac6c6",
            700: "#eadfdf",
            800: "#f5e3e3",
        },
        dark: {
            100: "#291717",
            200: "#1e1313",
            300: "#3d2626",
            400: "#512d2d",
            500: "#5b3a3a",
            600: "#7a4444",
            700: "#7a4d4d",
            800: "#a25a5a",
        }
    } : {
        grey: {
            100: "#141414",
            200: "#292929",
            300: "#3d3d3d",
            400: "#525252",
            500: "#666666",
            600: "#858585",
            700: "#a3a3a3",
            800: "#c2c2c2",
            900: "#e0e0e0",
        },
        primary : {
            100: "#e0aaaa",
            200: "#d58d8d",
            300: "#cb7171",
            400: "#986060",
            500: "#986060",
            600: "#cb7171",
            700: "#7a4d4d",
            800: "#7a4444",
            900: "#5b3a3a"
        },
        light: {
            100: "#f5e3e3",
            200: "#eadfdf",
            300: "#eac6c6",
            400: "#e0aaaa",
            500: "#d6bfbf",
            600: "#d58d8d",
            700: "#c1a0a0",
            800: "#ad8080",
        },
        dark: {
            100: "#a25a5a",
            200: "#7a4d4d",
            300: "#7a4444",
            400: "#5b3a3a",
            500: "#512d2d",
            600: "#3d2626",
            700: "#1e1313",
            800: "#291717",
        }
    }
    ),
});

// Theme Settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette : {
            mode: mode, 
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.primary[500],
                    },

                    secondary: {
                        main: colors.dark[100],
                    },

                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },

                    background: {
                        default: "#3d3d3d",
                    }
                } : {
                    primary: {
                        main: colors.primary[100],
                    },

                    secondary: {
                        main: colors.dark[800],
                    },

                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },

                    background: {
                        default: colors.light[200],
                    },
                }),
        },

        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1 : {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2 : {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3 : {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4 : {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5 : {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6 : {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        }
    };
};

// context for colormode
export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prev) => (prev==='dark'? 'light': 'dark'))
            }
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
}

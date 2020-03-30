import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { withAuthentication } from './session/index';
import SignIn from './components/Auth/SignIn';
import { SIGN_IN, HOME, ADMIN } from './constants';
import Admin from './components/Admin/index';
import './App.css';

function App() {
    const [theme, setTheme] = useState({
        palette: {
            secondary: {
                main: '#FFFFFF',
            },
            type: 'light',
        },
    });

    const muiTheme = createMuiTheme(theme);

    const toggleTheme = () => {
        const newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light';
        setTheme({
            ...theme,
            palette: {
                type: newPaletteType,
            },
        });
    };

    return (
        <BrowserRouter>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                <Navbar theme={muiTheme} handleToggleTheme={toggleTheme} />
                <Switch>
                    <Route exact path={HOME} component={Dashboard} />
                    <Route exact path={SIGN_IN} component={SignIn} />
                    <Route exact path={ADMIN} component={Admin} />
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default withAuthentication(App);

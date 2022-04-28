import React from 'react';
import  ReactDOM  from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';  
import App from './app';

//Mount function to start up the app

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath })=>{
    const history = defaultHistory || 
    createMemoryHistory({
        initialEntries:[initialPath], // initial state, initial path
    });
    if(onNavigate){
         history.listen(onNavigate);
    }
    ReactDOM.render(<App onSignIn={onSignIn} history={history}/>, el);
    return{
        onParentNavigate({pathname: nextPathName}){
            const { pathname } = history.location; 
            if (pathname !== nextPathName){
                history.push(nextPathName);
            }
        }
    };
};

//If we are in developement and in solation, 
//call mount immediately

if (process.env.NODE_ENV === 'development'){
    const devRoot = document.querySelector('#_auth-dev-root');
    if(devRoot){
        mount(devRoot, {defaultHistory : createBrowserHistory()});
    }
}

// We are running through container 
//and we should export the mount function

export { mount };
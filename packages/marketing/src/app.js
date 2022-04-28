import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import Landing from './components/Landing';
import Pricing from './components/Pricing';

const generateClassName = createGenerateClassName({
    productionPrefix: 'ma' // when we start to build the app for production it's going to generate all class names with the prefix 'ma' 
})
export default ({history})=> {
    return(
    <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
               <Switch>
                   <Route exact path="/pricing" component={Pricing}/>
                   <Route  path="/" component={Landing}/>
               </Switch>
            </Router>
        </StylesProvider>
    </div>)
}
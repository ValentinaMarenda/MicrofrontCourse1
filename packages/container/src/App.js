import React, {lazy, Suspense, useEffect, useState} from "react"; // lazy is a function and suspense is a component, this two work together to allow us to laizily load a differetns components inside of app
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { createBrowsreHistory } from 'history'
//import MarketingApp from "./components/MarketingApp"
//import AuthApp from "./components/AuthApp";
import Progress from "./components/Progress";
import Header from './components/Header';

const MarketingLazy = lazy(()=> import('./components/MarketingApp')) // this make sure that we only tried to load or import code related to marketing component when tried to show this thing on the screen
const AuthLazy = lazy(()=> import("./components/AuthApp"))
const DashboardLazy = lazy(()=> import('./components/DashboardApp') )
const generateClassName = createGenerateClassName({
    productionPrefix:'co' // when we start to build the app for production it's going to generate all class names with the prefix 'ma'
})

const history = createBrowsreHistory()

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(()=>{
        if(isSignedIn){
            history.push('/dashboard')
        }
    }, [isSignedIn])

    return (
    <Router history={history}>
        <StylesProvider  generateClassName={generateClassName}>
          <div> 
           <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
            <Suspense fallback={<Progress />}>
             <Switch>
                 <Route path="/auth" >
                 <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                 </Route>
                 <Route path="/dashboard" >
                     {!isSignedIn && <Redirect to="/"/>}
                     <DashboardLazy/>
                 </Route>
                 <Route path="/" component={MarketingLazy}/>
             </Switch>
             </Suspense>
          </div>
        </StylesProvider>
    </Router>
    )
}

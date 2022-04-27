import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import MarketingApp from "./components/MarketingApp";
import Header from './components/Header';

const generateClassName = createGenerateClassName({
    productionPrefix:'co' // when we start to build the app for production it's going to generate all class names with the prefix 'ma'
})

export default () => {
    return (
    <BrowserRouter>
        <StylesProvider  generateClassName={generateClassName}>
          <div> 
             <Header/>
             <MarketingApp/>
          </div>
        </StylesProvider>
    </BrowserRouter>
    )
}
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import { AudiobookPage } from "../pages/AudiobookPage";
import { DetailPages } from "../pages/DetailPages";

export const AppRouter = () => {

  
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/audiobook-details" component={DetailPages}/>
                    <Route  path="/" component={AudiobookPage} />
                </Switch>
            </div>
        </Router>
    )
}

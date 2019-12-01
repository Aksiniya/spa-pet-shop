import React from 'react'
import {Route, Switch} from "react-router";

import Navigation from "../navigation/navigation.jsx";
import PetsGrid from "./petsGrid.jsx";

class PetsLayout extends React.Component {
    render() {
        return (
            <div className={'pets-layout'}>
                <h1>Pets</h1>
                <Navigation
                    items = {[
                        {
                            name: 'List',
                            path: `${this.props.match.url}?displayType=list`
                        },
                        {
                            name: 'Cards',
                            path: `${this.props.match.url}?displayType=cards`
                        },
                        {
                            name: 'Groups',
                            path: `${this.props.match.url}?displayType=groups`
                        }
                    ]}
                />
                // TODO : search params
                <Switch>
                    <Route
                        path={`${this.props.match.path}`}
                        render={ props =>
                            <PetsGrid {...props.location}/>
                        }
                        // TODO: default case for switch
                    />
                </Switch>
            </div>
        )
    }
}

export default PetsLayout;
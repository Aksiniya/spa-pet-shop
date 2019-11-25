import React from 'react';
import './App.less';
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";

import TextLogo from "./app_styles/textLogo.jsx";
import Navigation from "./navigation/navigation.jsx";
import Home from "./home/home.jsx";
import PetsLayout from "./pets/petsLayout.jsx";
import CreationPanel from "./creationPanel/creationPanel.jsx";

class SiteHeader extends React.Component {
    render() {
        return (
            <div className='site-header'>
                <TextLogo />
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
                <div className='application'>
                    <SiteHeader />
                    <Navigation items={[
                        {
                            name: 'Home',
                            path: '/'
                        },
                        {
                            name: 'Find my pet',
                            path: '/pets?displayType=list'
                        },
                        {
                            name: 'Admin tools',
                            path: '/create'
                        }
                    ]}/>
                    <main>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/pets' component={PetsLayout}/>
                            <Route path='/create' component={CreationPanel}/>
                            // TODO: default case for switch

                        </Switch>
                    </main>
                </div>
        )
    }
}

export default App;
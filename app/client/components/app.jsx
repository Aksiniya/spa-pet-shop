import React from 'react';
import './App.less';
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";

import TextLogo from "./app_styles/textLogo.jsx";
import Navigation from "./navigation/navigation.jsx";
import Home from "./home/home.jsx";
import Pets from "./pets/pets.jsx";
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
            <BrowserRouter>
                <div className='application'>
                    <SiteHeader />
                    <Navigation items={[
                        {
                            name: 'Home',
                            path: '/'
                        },
                        {
                            name: 'Find my pet',
                            path: '/pets'
                        },
                        {
                            name: 'Admin tools',
                            path: '/create'
                        }
                    ]}/>
                    <main>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/pets' component={Pets}/>
                            <Route exact path={'/create'} component={CreationPanel}/>
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
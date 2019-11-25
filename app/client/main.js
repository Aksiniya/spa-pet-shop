import {BrowserRouter} from "react-router-dom";

const React = require('react');
const ReactDOM = require('react-dom');

import App from './components/App.jsx';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('mountPoint')
);

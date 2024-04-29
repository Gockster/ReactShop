// =========================================================
// * CER KIMDIS React Platform
// =========================================================

import React from 'react';
import ReactDOM from 'react-dom';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";

// core styles
import "./scss/volt.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";

import ScrollToTop from "./components/ScrollToTop";
import history from "./routing/history";
import rootStore from "./store/configureStore";
import RoutingComponent from "./routing/RoutingComponent";
import {I18nextProvider} from "react-i18next";

// Redux Store
const store = rootStore;

ReactDOM.render(
    <Provider store={store}>
        <HashRouter history={history}>
            <ScrollToTop/>
            <ReactNotifications/>
            <RoutingComponent/>
        </HashRouter>
    </Provider>,
    document.getElementById("root")
);

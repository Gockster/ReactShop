import React from 'react';
import RoutingComponent from "../../routing/RoutingComponent";
import AuthService from "../../_services/authorization/auth-service";
import Preloader from "../Preloader";

const LOCAL_STORAGE_AUTH_USER_DATA = process.env.REACT_APP_AUTH_USER_DATA;

class AuthManagerComponent extends React.Component {

    state = {
        pendingValidation: true,
    };

    componentDidMount(): void {
        AuthService.validateTokenAndGetUser(this.isTokenValidCallback);
    }

    isTokenValidCallback = (userData) => {
        if(userData !== null) {
            localStorage.setItem(LOCAL_STORAGE_AUTH_USER_DATA, JSON.stringify(userData));
        } else {
            localStorage.removeItem(LOCAL_STORAGE_AUTH_USER_DATA);
        }
        this.setPendingValidation(false);
    };

    setPendingValidation = (value) => {
        this.setState({
            pendingValidation: value,
        });
    };

    render() {
        const {
            pendingValidation
        } = this.state;

        return(
            <>
                {pendingValidation === true &&
                    <Preloader show={true}/>
                }

                {pendingValidation  === false &&
                    <RoutingComponent/>
                }
            </>
        )
    }
}

export default AuthManagerComponent;
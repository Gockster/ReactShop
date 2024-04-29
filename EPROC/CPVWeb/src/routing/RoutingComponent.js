import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import userAccessLevelUtil from "../utils/userAccessLevelUtil";
import { PROTECTED_MODE, PUBLIC_MODE, Routes } from "./routes";

// components
import { Row } from "@themesberg/react-bootstrap";
import { withTranslation } from "react-i18next";
import { BeatLoader } from "react-spinners";
import AuthService from "../_services/authorization/auth-service";
import oamService from "../_services/authorization/oamService";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NotAuthorized from "../components/NotAuthorized";
import NotFound from "../components/NotFound";
import Preloader from "../components/Preloader";
import Sidebar from "../components/Sidebar";
import NavBarMenu from "../components/navBarMenu/NavBarMenu";
import GenericFormModule from "../modules/genericFormModule/GenericFormModule";
import DeliberationFormPage from '../pages/DeliberationPage/DeliberationFormPage/DeliberationFormPage';
import DeliberationFormPageNew from '../pages/DeliberationPage/DeliberationFormPage/DeliberationFormPageNew';
import DeliberationListPage from '../pages/DeliberationPage/DeliberationListPage/DeliberationListPage';

const PublicRouteWithLoader = ({ component, ...rest }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Route {...rest} render={props => (
			<>
				<Preloader show={!loaded} />
				{React.cloneElement(component, { ...props })}
			</>
		)} />
	);
};

const ProtectedRouteWithSidebar = ({ component, permittedRoles, ...rest }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	// Get User Data from Local Storage
	const userData = AuthService.getCurrentUser();

	// Check if user data exists else send user to login screen as we are inside protected routes
	if (userData) {

		// Apply the Permitted Roles functionality to protected routes (if they exist)
		// Also make this conditionally as other protected routes may be accessible from any authenticated user)
		let userIsPermittedToSeeRouteContent = false;
		if (permittedRoles && permittedRoles.length > 0) {
			userIsPermittedToSeeRouteContent = userAccessLevelUtil.checkPermittedRolesForRouteAgainstUserRoles(permittedRoles, userData.roles);
		} else {
			userIsPermittedToSeeRouteContent = true;
		}

		if (userIsPermittedToSeeRouteContent === true) {
			return (
				<Route {...rest} render={props => (
					<>
						<Preloader show={!loaded} />

						<Sidebar />

						<main className="content">
							<Navbar />
							{React.cloneElement(component, { ...props })}
							<Footer />
						</main>
					</>
				)}
				/>
			);
		} else return (
			<Redirect to={Routes.HomePage.path} />
		);
	} else return (
		<Route {...rest} render={props => (
			<>
				{/*<SignInPage/>*/}
			</>
		)}
		/>
	);
};

const PublicRouteWithHeader = ({ component, ...rest }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Route {...rest} render={props => (
			<>
				<Preloader show={!loaded} />

				<main className="content">
					<NavBarMenu />
					<Row className={"mt-1"}>
						{React.cloneElement(component, { ...props })}
					</Row>
					{/*<Footer/>*/}
				</main>
			</>
		)}
		/>
	);
};

const ProtectedRouteWithHeader = ({ component, aclLevel, ...rest }) => {
	const [oamUser, setOamUser] = useState(null);
	const [pendingGettingOamUser, setPendingGettingOamUser] = useState(null);
	const [errorGettingOamUser, setErrorGettingOamUser] = useState(false);
	const [isAllowedBasedOnAcl, setIsAllowedBasedOnAcl] = useState(null);

	const location = useLocation();

	const urlParams = rest?.computedMatch?.params;
	const {
		action,
		secMode
	} = urlParams;

	useEffect(() => {
		checkOamFromBackend();
	}, [location]);

	const checkOamFromBackend = () => {
		setIsAllowedBasedOnAcl(null);

		if (secMode === PROTECTED_MODE) {
			setPendingGettingOamUser(true)
			oamService.validateOamRemoteUser()
				.then((res) => {
					setPendingGettingOamUser(false);
					setOamUser(res?.username);
					setErrorGettingOamUser(false);

					if (typeof res !== 'undefined' && res !== null && typeof res.username !== 'undefined' && res.username !== null) {
						setIsAllowedBasedOnAcl(checkAclLevel());
					}
				})
				.catch((error) => {
					console.log("Error checking OAM User: ", error);
					setPendingGettingOamUser(false);
					setErrorGettingOamUser(true);
					setIsAllowedBasedOnAcl(false);
				});
		} else if (secMode === PUBLIC_MODE) {
			setIsAllowedBasedOnAcl(checkAclLevel());
		} else {
			setIsAllowedBasedOnAcl(false);
		}
	}

	const checkAclLevel = () => {
		let isAllowed = false;
		if (typeof aclLevel !== 'undefined' && aclLevel !== null && aclLevel.length > 0) {
			aclLevel.forEach((obj, index) => {
				if (typeof obj.action !== 'undefined' && obj.action !== null) {
					if (secMode === obj.mode && action === obj.action) {
						isAllowed = true;
					}
				} else {
					if (secMode === obj.mode) {
						isAllowed = true;
					}
				}
			})
		}
		return isAllowed;
	}

	return (
		<Route {...rest} render={props => (
			<>

				<main className="content">
					<NavBarMenu />

					{pendingGettingOamUser === true &&
						<div className="d-flex justify-content-center pt-5">
							<BeatLoader
								size={35}
								color={"#4A5073"}
								loading={pendingGettingOamUser}
							/>
						</div>}

					{isAllowedBasedOnAcl === false && (pendingGettingOamUser === null || pendingGettingOamUser === false) &&
						<Row className={"mt-1"}>
							<NotAuthorized />
						</Row>
					}

					{isAllowedBasedOnAcl === true &&
						<Row className={"mt-1"}>
							{React.cloneElement(component, { ...props })}
						</Row>}
				</main>
			</>
		)}
		/>
	);
};

class RoutingComponent extends React.Component {

	render() {
		return (
			<Switch>

				<Route
					exact
					path="/"
					render={() => {
						return (
							<Redirect to={Routes.DeliberationListPageRouteDefault.path} />
						)
					}}
				/>

				<PublicRouteWithHeader
					exact
					path={Routes.DeliberationListPageRouteDefault.path}
					component={<DeliberationListPage />}
				/>

				<ProtectedRouteWithHeader
					exact
					path={Routes.DeliberationListPageRoute.path}
					aclLevel={Routes.DeliberationListPageRoute.aclLevel}
					component={<DeliberationListPage />}
				/>

				<ProtectedRouteWithHeader
					exact
					path={Routes.DeliberationFormRoute.path}
					aclLevel={Routes.DeliberationFormRoute.aclLevel}
					component={<GenericFormModule><DeliberationFormPage /></GenericFormModule>}
				/>

				<ProtectedRouteWithHeader
					exact
					path={Routes.DeliberationFormRouteNew.path}
					aclLevel={Routes.DeliberationFormRouteNew.aclLevel}
					component={<GenericFormModule><DeliberationFormPageNew /></GenericFormModule>}
				/>

				<PublicRouteWithHeader
					exact
					path={Routes.NotFound.path}
					component={<NotFound />}
				/>

				<Redirect to={Routes.NotFound.path} />
			</Switch>

		);
	}
}

export default withTranslation()(RoutingComponent);

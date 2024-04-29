import React from 'react';
import { Nav, Navbar, Image } from '@themesberg/react-bootstrap';
import Logo from "../../assets/img/logo/promitheusLogoDeliberationsNew.png"
import LogoEn from "../../assets/img/logo/promitheusLogoDeliberationsNew_EN.png"
import { Routes } from "../../routing/routes";
import ChooseLanguageNavComponent from "./ChooseLanguageNavComponent";
import getLanguageFromLocalStorage from '../getLanguageFromLocalStorage/ChangeImageLogo';

class NavBarMenu extends React.Component<Props> {
    render() {
        const language = getLanguageFromLocalStorage();
        return (
            <div>
                {/* <div className={"gradientBackground"}>
                    <h5>{i18next.t("generic.kimdisFull")}</h5>
                </div> */}
                <Navbar variant="light" expand="lg" bg="white" className="navbar-transparent navbar-theme-primary my-2">
                    <Navbar.Brand href={"#" + Routes.DeliberationListPageRouteDefault.path} className="me-lg-5">
                        {language === 'en' ? <Image src={LogoEn} /> : <Image src={Logo} />}
                    </Navbar.Brand>

                    {/* <Navbar.Collapse id="navbar-default-primary" className="w-100">
                        <Nav className="navbar-nav-hover align-items-lg-center m-1">
                             <Nav.Link href={"#" + Routes.RequestListPageRoute.path}>
                                {i18next.t("menu.requests")}
                            </Nav.Link>
                            <Nav.Link href={"#" + Routes.NoticeListPageRoute.path}>
                                {i18next.t("menu.notices")}
                            </Nav.Link>
                            <Nav.Link href={"#" + Routes.ContractListPageRoute.path}>
                                {i18next.t("menu.contracts")}
                            </Nav.Link>
                            <Nav.Link href={"#" + Routes.PaymentsListPageRoute.path}>
                                {i18next.t("menu.payments")}
                            </Nav.Link> 
                            <Nav.Link href={"#" + Routes.DeliberationListPageRoute.path}>
                                {i18next.t("menu.deliberation")}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse> */}


                    <div className="ms-auto">
                        <ChooseLanguageNavComponent />
                    </div>

                    {/* <Navbar.Toggle aria-controls="navbar-default-primary" /> */}

                </Navbar>
            </div >
        );
    }
}

export default NavBarMenu;
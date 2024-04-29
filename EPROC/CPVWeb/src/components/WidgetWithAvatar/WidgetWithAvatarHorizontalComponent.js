import {Card, Col, Row} from "@themesberg/react-bootstrap";
import React from "react";
import LottieAnimationComponent from "../lottieAnimationComponent/LottieAnimationComponent";
import {CounterWidget} from "../Widgets";
import {faChartLine, faGlobeEurope} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const WidgetWithAvatarHorizontalComponent = ({darkThemeEnabled=false, backgroundColor, title, subtitle, lottieAnimationSourceFile, animationWidth, animationHeight, imageSource}) => {
    return (
        <Card border="light" className="text-center p-0 mb-4 shadow-lg-hover">
            {/*<div style={{ backgroundColor: backgroundColor? backgroundColor : '#262B40'}} className="profile-cover rounded-top">*/}
            {/*    {lottieAnimationSourceFile &&*/}
            {/*    <div className="pt-4">*/}
            {/*        <LottieAnimationComponent*/}
            {/*            animationHeight={animationHeight?animationWidth:150}*/}
            {/*            animationWidth={animationWidth?animationWidth:150}*/}
            {/*            animationSourceFile={lottieAnimationSourceFile}/>*/}
            {/*    </div>}*/}
            {/*</div>*/}

            <Card.Body>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col xs={4} xl={4} className="">
                        {lottieAnimationSourceFile &&
                        <div className="pt-4">
                            <LottieAnimationComponent
                                animationHeight={animationHeight?animationWidth:150}
                                animationWidth={animationWidth?animationWidth:150}
                                animationSourceFile={lottieAnimationSourceFile}/>
                        </div>}
                    </Col>

                    <Col xs={12} xl={8} className={`text-sm-center text-xl-center d-flex align-items-center justify-content-xl-center ${darkThemeEnabled ? 'ose-widget-avatar-dark-horizontal' : 'ose-widget-avatar-light-horizontal'}`}>
                        {imageSource && <Card.Img src={imageSource} alt="avatar-source-image" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />}
                        <h6>{title}</h6>
                        <p className="fw-normal">{subtitle}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};
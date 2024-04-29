import {Card} from "@themesberg/react-bootstrap";
import React from "react";
import LottieAnimationComponent from "../lottieAnimationComponent/LottieAnimationComponent";

export const WidgetWithAvatarComponent = ({darkThemeEnabled=false, backgroundColor, title, subtitle, lottieAnimationSourceFile, animationWidth, animationHeight, imageSource}) => {
    return (
        <Card border="light" className="text-center p-0 mb-4 shadow-lg-hover">
            <div style={{ backgroundColor: backgroundColor? backgroundColor : '#262B40'}} className="profile-cover rounded-top">
                {lottieAnimationSourceFile &&
                <div className="pt-4">
                    <LottieAnimationComponent
                        animationHeight={animationHeight?animationWidth:150}
                        animationWidth={animationWidth?animationWidth:150}
                        animationSourceFile={lottieAnimationSourceFile}/>
                </div>}
            </div>
            <Card.Body className={`pt-5 pb-5 ${darkThemeEnabled ? 'ose-widget-avatar-dark' : 'ose-widget-avatar-light'}`}>
                {imageSource && <Card.Img src={imageSource} alt="avatar-source-image" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />}
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="fw-normal">{subtitle}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
};
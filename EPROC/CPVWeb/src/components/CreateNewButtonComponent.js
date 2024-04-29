import React from 'react';
import {Button} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import i18next from "../translations/i18nConfigInstance";

export const CreateNewButtonComponent = ({isDisabled=false, onPressCallback, titleWhenDisabled=null}) => {
    const goToNewScreen = () => {
        onPressCallback();
    };

    return(
        <Button
            disabled={isDisabled}
            variant="secondary"
            className="text-dark me-2"
            onClick={goToNewScreen}

        >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>{(isDisabled && titleWhenDisabled !== null) ? titleWhenDisabled : i18next.t("generic.new")}</span>
        </Button>
    )
};
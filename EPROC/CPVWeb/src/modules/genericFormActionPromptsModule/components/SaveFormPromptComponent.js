import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import i18next from "../../../translations/i18nConfigInstance";

export const SaveFormPromptComponent = ({showSaveFormPrompt, confirmActionCallback, cancelActionCallback}) => {
    return(
        <div className={"sweetAlertCustomStyles"}>
            <SweetAlert
                show={showSaveFormPrompt}
                showCancel
                confirmBtnText={i18next.t("prompts.saveFormAction.confirmButtonTitle")}
                confirmBtnBsStyle="success"
                cancelBtnText={i18next.t("prompts.saveFormAction.cancelButtonTitle")}
                //cancelBtnBsStyle="warning"
                title={i18next.t("prompts.saveFormAction.promptTitle")}
                onConfirm={confirmActionCallback}
                onCancel={cancelActionCallback}
                focusConfirmBtn
            >
                {i18next.t("prompts.saveFormAction.promptSubtitle")}
            </SweetAlert>
        </div>
    )
};

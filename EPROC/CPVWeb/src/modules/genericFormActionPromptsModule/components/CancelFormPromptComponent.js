import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import i18next from "../../../translations/i18nConfigInstance";

export const CancelFormPromptComponent = ({showCancelFormPrompt, confirmActionCallback, cancelActionCallback}) => {
    return(
        <div className={"sweetAlertCustomStyles"}>
            <SweetAlert
                show={showCancelFormPrompt}
                warning
                showCancel
                confirmBtnText={i18next.t("prompts.cancelFormAction.confirmButtonTitle")}
                confirmBtnBsStyle="white"
                cancelBtnText={i18next.t("prompts.cancelFormAction.cancelButtonTitle")}
                cancelBtnBsStyle="primary"
                title={i18next.t("prompts.cancelFormAction.promptTitle")}
                onConfirm={confirmActionCallback}
                onCancel={cancelActionCallback}
                focusCancelBtn
                reverseButtons={true}
            >
                {i18next.t("prompts.cancelFormAction.promptSubtitle")}
            </SweetAlert>
        </div>
    )
};

import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import i18next from "../../../translations/i18nConfigInstance";

export const ChangeBookingStatusFormPromptComponent = ({showChangeStatusFormPrompt, confirmActionCallback, cancelActionCallback, isApproveAction}) => {
    return(
        <div className={"sweetAlertCustomStyles"}>
            <SweetAlert
                show={showChangeStatusFormPrompt}
                warning
                showCancel
                confirmBtnText={isApproveAction ? i18next.t("prompts.changeARBookingStatusFormAction.confirmButtonTitleApprove") : i18next.t("prompts.changeARBookingStatusFormAction.confirmButtonTitleCancel")}
                confirmBtnBsStyle="white"
                cancelBtnText={i18next.t("prompts.changeARBookingStatusFormAction.cancelButtonTitle")}
                cancelBtnBsStyle="primary"
                title={i18next.t("prompts.changeARBookingStatusFormAction.promptTitle")}
                onConfirm={confirmActionCallback}
                onCancel={cancelActionCallback}
                focusCancelBtn
                reverseButtons={true}
            >
                {isApproveAction ? i18next.t("prompts.changeARBookingStatusFormAction.promptSubtitleApprove") : i18next.t("prompts.changeARBookingStatusFormAction.promptSubtitleDecline")}
            </SweetAlert>
        </div>
    )
};

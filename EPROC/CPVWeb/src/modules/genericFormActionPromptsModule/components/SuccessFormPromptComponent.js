import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import i18next from "../../../translations/i18nConfigInstance";

export const SuccessFormPromptComponent = ({ showSuccessSaveFormPrompt, confirmActionCallback, isEditMode, isCreateMode, showTitle, showReferenceNumber }) => {
    return (
        <div className={"sweetAlertCustomStyles"}>
            <SweetAlert
                show={showSuccessSaveFormPrompt}
                success
                confirmBtnText={i18next.t("prompts.successSaveFormAction.confirmButtonTitle")}
                confirmBtnBsStyle="success"
                title={i18next.t(isEditMode ? "prompts.successSaveFormAction.successUpdateTitle" : isCreateMode ? "prompts.successSaveFormAction.successCreateTitle" : '')}
                onConfirm={confirmActionCallback}
                focusConfirmBtn
            >
                {i18next.t(isEditMode ? "prompts.successSaveFormAction.successUpdateSubTitle" : isCreateMode ? "prompts.successSaveFormAction.successCreateSubTitle" : '')}
                <br></br>
                {i18next.t(isCreateMode ? "prompts.successSaveFormAction.showTitleAndReferenceNumber" : '', { showTitle, showReferenceNumber })}
            </SweetAlert>
        </div>
    )
};

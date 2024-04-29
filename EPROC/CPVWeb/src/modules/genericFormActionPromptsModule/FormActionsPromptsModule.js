import React from 'react';
import { CancelFormPromptComponent } from "./components/CancelFormPromptComponent";
import { SaveFormPromptComponent } from "./components/SaveFormPromptComponent";
import { SuccessFormPromptComponent } from "./components/SuccessFormPromptComponent";
import { PendingSaveFormPromptComponent } from "./components/PendingSaveFormPromptComponent";
import { ChangeBookingStatusFormPromptComponent } from "./components/ChangeBookingStatusFormPromptComponent";

export const FormActionsPromptsModule = ({
    showCancelFormPrompt,
    showSaveFormPrompt,
    showPendingSaveFormPrompt,
    showSuccessSaveFormPrompt,
    onClosingCancelFormPromptCallback,
    onConfirmCancelFormPromptCallback,
    onClosingSaveFormPromptCallback,
    onConfirmSaveFormPromptCallback,
    onClosingSuccessSaveFormPromptCallback,
    formIsEditMode,
    formIsCreateMode,

    showChangeBookingStatusFormPrompt,
    onConfirmChangeBookingStatusFormPromptCallback,
    onClosingChangeBookingStatusFormPromptCallback,
    isApproveChangeBookingStatusAction,
    showTitle,
    showReferenceNumber

}) => {
    return (
        <>
            <CancelFormPromptComponent
                showCancelFormPrompt={showCancelFormPrompt}
                cancelActionCallback={onClosingCancelFormPromptCallback}
                confirmActionCallback={onConfirmCancelFormPromptCallback}
            />

            <SaveFormPromptComponent
                showSaveFormPrompt={showSaveFormPrompt}
                cancelActionCallback={onClosingSaveFormPromptCallback}
                confirmActionCallback={onConfirmSaveFormPromptCallback}
            />

            <PendingSaveFormPromptComponent
                showPendingSaveFormPrompt={showPendingSaveFormPrompt}
            />

            <SuccessFormPromptComponent
                showSuccessSaveFormPrompt={showSuccessSaveFormPrompt}
                confirmActionCallback={onClosingSuccessSaveFormPromptCallback}
                isCreateMode={formIsCreateMode}
                isEditMode={formIsEditMode}
                showTitle={showTitle}
                showReferenceNumber={showReferenceNumber}
            />

            <ChangeBookingStatusFormPromptComponent
                showChangeStatusFormPrompt={showChangeBookingStatusFormPrompt}
                confirmActionCallback={onConfirmChangeBookingStatusFormPromptCallback}
                cancelActionCallback={onClosingChangeBookingStatusFormPromptCallback}
                isApproveAction={isApproveChangeBookingStatusAction}
            />
        </>
    )
};

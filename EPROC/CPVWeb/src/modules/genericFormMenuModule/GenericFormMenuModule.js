import React from 'react';
import { Button, ButtonGroup, Card, Col, Row } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSave, faTimes, faTimesCircle, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import i18next from "../../translations/i18nConfigInstance";
import { FormActionsPromptsModule } from "../genericFormActionPromptsModule/FormActionsPromptsModule";
import { withRouter } from "react-router-dom";

type Props = {
    isSaveButtonDisabled: boolean,
    onValidateCallback: Function,
    saveService: Function,
    formIsEditMode: boolean,
    formIsCreateMode: boolean,
    navigationUrl: String,
    showSaveButton: boolean,
    showSimpleBackActionBtn: boolean,
    showTitle: String,
    showReferenceNumber: String
}



class GenericFormMenuModule extends React.Component<Props> {
    state = {
        // Prompts State
        showCancelFormPrompt: false,
        showSaveFormPrompt: false,
        showPendingSaveFormPrompt: false,
        showSuccessSaveFormPrompt: false,

        showChangeBookingStatusFormPrompt: false,
        showSuccessChangeBookingStatusFormPrompt: false,
        showPendingChangeBookingStatusFormPrompt: false,
        isApproveChangeBookingStatusAction: null
    };

    /**
     * Actual Form Save Action in 2 steps
     * 1) Call the Validate Form (Make business validations, prepare data etc) and handle the promise returned
     * 2) Call the create/update service and handle the promise returned
     */
    onSaveAction = () => {
        const {
            onValidateCallback,
            saveService
        } = this.props;

        onValidateCallback()
            .then((response) => {
                this.onClosingSaveFormPrompt();
                this.pendingPromptToggle(true);

                saveService(response)
                    .then((successResponseFromRequest) => {
                        this.pendingPromptToggle(false);

                        this.openSuccessSaveFormPrompt();

                    })
                    .catch((errorResponseFromRequest) => {

                        this.pendingPromptToggle(false);

                        this.onClosingSaveFormPrompt();
                    })
            })
            .catch((error) => {
                this.onClosingSaveFormPrompt();
            })
    };

    /**
     * Just controls state to show/hide the Cancel Prompt Alert
     */
    cancelFormPromptToggle = (value) => {
        this.setState({
            showCancelFormPrompt: value,
        })
    };

    /**
     * Just controls state to show/hide the Pending Saving Prompt Alert
     */
    pendingPromptToggle = (value) => {
        this.setState({
            showPendingSaveFormPrompt: value,
        })
    };

    /**
     * Just controls state to show the Save Prompt Alert
     */
    openSaveFormPrompt = () => {
        this.setState({
            showSaveFormPrompt: true,
        })
    };

    /**
     * Closes Save Form Prompt dialog
     */
    onClosingSaveFormPrompt = () => {
        this.setState({
            showSaveFormPrompt: false,
        })
    };

    /**
     * What happens when user confirms the cancel action
     * user navigates to url passed by parent component also passing any search filter criteria back to search page
     */
    onConfirmCancelAction = () => {
        const {
            navigationUrl,
            // From withRouter HOC
            history
        } = this.props;


        this.cancelFormPromptToggle(false);
        history.goBack();
        // Navigating user to the url passing also search filter criteria with pagination data
        // history.push({
        //     pathname: navigationUrl
        // })

    };

    /**
     * Open a Dialog Modal to notify user that create/update was successful
     */
    openSuccessSaveFormPrompt = () => {
        this.setState({
            showSuccessSaveFormPrompt: true,
        })
    };

    /**
     * Closes the Success save/update modal
     */
    onClosingSuccessSaveFormPrompt = () => {
        const {
            navigationUrl,
            history
        } = this.props;

        this.setState({
            showSuccessSaveFormPrompt: false,
        });
        history.goBack();
        // Navigate to Search Page
        // history.push(navigationUrl)
    };

    onConfirmChangeBookingStatus = () => {
        const {
            changeAssistanceReservationBookingStatusService
        } = this.props;

        this.onClosingChangeBookingStatusFormPrompt();

        this.pendingPromptToggle(true);

        changeAssistanceReservationBookingStatusService()
            .then((successResponseFromRequest) => {

                this.pendingPromptToggle(false);

                this.openSuccessChangeBookingStatusFormPrompt();

            }).catch((errorResponseFromRequest) => {

                this.pendingPromptToggle(false);

                this.onClosingChangeBookingStatusFormPrompt();
            })
    };

    /**
     * Just controls state to show the Change Assistance Reservation Booking Prompt Alert
     */
    openChangeBookingStatusFormPrompt = (isApproveChangeBookingStatusAction) => {

        this.props.updateChangeBookingStatusChosenAction(isApproveChangeBookingStatusAction);

        this.setState({
            showChangeBookingStatusFormPrompt: true,
            isApproveChangeBookingStatusAction: isApproveChangeBookingStatusAction

        })
    };

    /**
     * Closes Change Assistance Reservation Booking Form Prompt dialog
     */
    onClosingChangeBookingStatusFormPrompt = () => {
        this.setState({
            showChangeBookingStatusFormPrompt: false,
            isApproveChangeBookingStatusAction: null
        })
    };

    /**
     * Open a Dialog Modal to notify user for success in Assistance Reservation Booking Status changes
     */
    openSuccessChangeBookingStatusFormPrompt = () => {
        this.setState({
            showSuccessSaveFormPrompt: true,
        })
    };


    render() {
        const {
            showTitle,
            showReferenceNumber
        } = this.props;

        const {
            showSaveButton = true,
            isSaveButtonDisabled = false,
            formIsEditMode,
            formIsCreateMode,
            showSimpleBackActionBtn = false,
            isApproveChangeStatusButtonDisabled,
            isDeclineChangeStatusButtonDisabled,
            showChangeBookingStatusButton = false,
        } = this.props;

        const {
            // Prompts State
            showCancelFormPrompt,
            showSaveFormPrompt,
            showPendingSaveFormPrompt,
            showSuccessSaveFormPrompt,

            showChangeBookingStatusFormPrompt,
            showSuccessChangeBookingStatusFormPrompt,
            showPendingChangeBookingStatusFormPrompt,
            isApproveChangeBookingStatusAction
        } = this.state;

        return (
            <>
                <Row className='hidden-print'>
                    <Col xs={12}>
                        <Card border="light" bg="primary" className="bg-white shadow-sm mb-4">
                            <Card.Body>
                                <ButtonGroup className="pull-right">
                                    {showSaveButton &&
                                        <Button
                                            disabled={isSaveButtonDisabled}
                                            onClick={this.openSaveFormPrompt}
                                            variant="primary"
                                            className="m-1"
                                        >
                                            <FontAwesomeIcon icon={faSave} className="me-2" />
                                            {i18next.t("generic.post")}
                                        </Button>}

                                    {showChangeBookingStatusButton &&
                                        <>
                                            <Button
                                                disabled={isApproveChangeStatusButtonDisabled}
                                                onClick={() => this.openChangeBookingStatusFormPrompt(true)}
                                                variant="success"
                                                className="m-1"
                                            >
                                                <FontAwesomeIcon icon={faCheck} className="me-2" />
                                                {i18next.t("generic.approve")}
                                            </Button>

                                            <Button
                                                disabled={isDeclineChangeStatusButtonDisabled}
                                                onClick={() => this.openChangeBookingStatusFormPrompt(false)}
                                                variant="danger"
                                                className="m-1"
                                            >
                                                <FontAwesomeIcon icon={faTimes} className="me-2" />
                                                {i18next.t("generic.decline")}
                                            </Button>
                                        </>}

                                    {!showSimpleBackActionBtn &&
                                        <Button
                                            onClick={() => this.cancelFormPromptToggle(true)}
                                            variant="warning"
                                            className="m-1"
                                        >
                                            <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
                                            {i18next.t("generic.cancel")}
                                        </Button>}

                                    {showSimpleBackActionBtn &&
                                        <Button
                                            onClick={this.onConfirmCancelAction}
                                            variant="warning"
                                            className="m-1"
                                        >
                                            <FontAwesomeIcon icon={faChevronCircleLeft} className="me-2" />
                                            {i18next.t("generic.back")}
                                        </Button>}

                                </ButtonGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <FormActionsPromptsModule
                    showCancelFormPrompt={showCancelFormPrompt}
                    showSaveFormPrompt={showSaveFormPrompt}
                    showSuccessSaveFormPrompt={showSuccessSaveFormPrompt}
                    showPendingSaveFormPrompt={showPendingSaveFormPrompt}
                    onClosingCancelFormPromptCallback={() => this.cancelFormPromptToggle(false)}
                    onConfirmCancelFormPromptCallback={this.onConfirmCancelAction}
                    onClosingSaveFormPromptCallback={this.onClosingSaveFormPrompt}
                    onConfirmSaveFormPromptCallback={this.onSaveAction}
                    onClosingSuccessSaveFormPromptCallback={this.onClosingSuccessSaveFormPrompt}
                    formIsEditMode={formIsEditMode}
                    formIsCreateMode={formIsCreateMode}
                    showChangeBookingStatusFormPrompt={showChangeBookingStatusFormPrompt}
                    showSuccessChangeBookingStatusFormPrompt={showSuccessSaveFormPrompt}
                    showPendingChangeBookingStatusFormPrompt={showPendingChangeBookingStatusFormPrompt}
                    onConfirmChangeBookingStatusFormPromptCallback={this.onConfirmChangeBookingStatus}
                    onClosingChangeBookingStatusFormPromptCallback={this.onClosingChangeBookingStatusFormPrompt}
                    showTitle={showTitle}
                    showReferenceNumber={showReferenceNumber}
                    isApproveChangeBookingStatusAction={isApproveChangeBookingStatusAction}
                />
            </>
        )
    }
}

export default withRouter(GenericFormMenuModule);
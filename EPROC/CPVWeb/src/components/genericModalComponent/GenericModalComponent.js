import React from 'react';
import {Modal, Button, ButtonGroup} from '@themesberg/react-bootstrap';
import i18next from "../../translations/i18nConfigInstance";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle, faCheck} from "@fortawesome/free-solid-svg-icons";

type Props = {
    showOkButton: boolean,
    isOkButtonDisabled: boolean,
    showCancelButton: boolean,
    isCancelButtonDisabled: boolean,
    modalTitle: String,
    okButtonCallback: Function,
    okModalButtonTitle: String,
    closeModalCallback: Function,
    isModalVisible: boolean,
    isModalFullScreen: boolean,
    modalSize: String
}

class GenericModalComponent extends React.Component<Props> {

    closeModal = () => {
        const {
            closeModalCallback
        } = this.props;
        closeModalCallback();
    };

    okButtonPress = () => {
        const {
            okButtonCallback
        } = this.props;
        okButtonCallback();
    };

    render() {
        const {
            showOkButton,
            isOkButtonDisabled=false,
            showCancelButton,
            isCancelButtonDisabled=false,
            okModalButtonTitle=i18next.t("generic.ok"),
            modalTitle,
            isModalVisible=false,
            isModalFullScreen=false,
            modalSize,
            children
        } = this.props;

        return (
            <Modal
                as={Modal.Dialog}
                scrollable
                size={modalSize}
                fullscreen={isModalFullScreen}
                centered
                show={isModalVisible}
                onHide={this.closeModal}
            >
                <Modal.Header className="customModalHeaderStyle">
                    <Modal.Title className="h5">{modalTitle}</Modal.Title>
                    <Button className="modalCloseButton" variant="close" aria-label={i18next.t("generic.close")} onClick={this.closeModal}/>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>

                    {showOkButton &&
                    <Button variant="secondary"
                            size="lg"
                            onClick={this.okButtonPress}
                            disabled={isOkButtonDisabled}
                    >
                        <FontAwesomeIcon icon={faCheck} className="me-2" />
                        {okModalButtonTitle}
                    </Button>}

                    {showCancelButton &&
                    <Button variant="light"
                            size="lg"
                            className="text-gray ms-auto"
                            onClick={this.closeModal}
                            disabled={isCancelButtonDisabled}
                    >
                        <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
                        {i18next.t("generic.close")}
                    </Button>}

                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default GenericModalComponent;
import React from 'react';
import {Button, ButtonGroup, Dropdown} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPaperPlane,
    faArrowAltCircleUp,
    faEdit,
    faEllipsisH,
    faEye,
    faTrashAlt, faHeart
} from "@fortawesome/free-solid-svg-icons";
import i18next from "../../translations/i18nConfigInstance";

type Props = {
    isDropDownMenu: boolean,
    isViewDisabled: boolean,
    isEditDisabled: boolean,
    isEditShown: boolean,
    isDeleteDisabled: boolean,
    viewRowItemCallback: Function,
    editRowItemCallback: Function,
    deleteRowItemCallback: Function
}

class TableFurtherActionsComponent extends React.Component<Props> {

    onClickViewAction = () => {
        const {
            viewRowItemCallback,
        } = this.props;
        viewRowItemCallback();
    };

    onClickEditAction = () => {
        const {
            editRowItemCallback,
        } = this.props;
        editRowItemCallback();
    };

    onClickSendMessageAction = (typeLocation) => {
		const {
            sendMessageRowItemCallback,
        } = this.props;
        sendMessageRowItemCallback(typeLocation);
    };

    onClickDeleteAction = () => {
        const {
            deleteRowItemCallback,
        } = this.props;
        deleteRowItemCallback();
    };

    render() {
        const {
            isDropDownMenu = true,
            isViewDisabled = false,
            isEditDisabled = false,
            isEditShown = false,
            isDeleteDisabled = false,
            viewRowItemCallback,
            editRowItemCallback,
            deleteRowItemCallback,
        } = this.props;

        return (
            <>
                {isDropDownMenu &&
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
							<span className="icon icon-sm">
								<FontAwesomeIcon icon={faEllipsisH} className="icon-dark"/>
							</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {viewRowItemCallback &&
                        <Dropdown.Item
                            as={Button}
                            onClick={this.onClickViewAction}
                            disabled={isViewDisabled}
                        >
                            <FontAwesomeIcon icon={faEye} className="me-2"/>
                            {i18next.t("generic.view")}
                        </Dropdown.Item>}
                        {isEditShown && editRowItemCallback &&
                        <Dropdown.Item
                            as={Button}
                            onClick={this.onClickEditAction}
                            disabled={isEditDisabled}
                        >
                            <FontAwesomeIcon icon={faEdit} className="me-2"/>
                            {i18next.t("generic.edit")}
                        </Dropdown.Item>}
                        
                        {deleteRowItemCallback &&
                        <Dropdown.Item
                            className="text-danger"
                            as={Button}
                            onClick={this.onClickDeleteAction}
                            disabled={isDeleteDisabled}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} className="me-2"/>
                            {i18next.t("generic.delete")}
                        </Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>}

                {!isDropDownMenu &&
                <>
                    {viewRowItemCallback &&
                    <Button
                        variant="outline-white"
                        className="m-1 text-primary"
                        disabled={isViewDisabled}
                        onClick={this.onClickViewAction}
                    >
                        <FontAwesomeIcon icon={faEye} className="m-0"/>
                    </Button>}

                    {editRowItemCallback &&
                    <Button
                        variant="primary"
                        className="m-1"
                        disabled={isEditDisabled}
                        onClick={this.onClickEditAction}
                    >
                        <FontAwesomeIcon icon={faEdit} className="m-0"/>
                    </Button>}
                    
                    {deleteRowItemCallback &&
                    <Button
                        variant="outline-white"
                        className="m-1 text-danger"
                        disabled={isDeleteDisabled}
                        onClick={this.onClickDeleteAction}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} className="m-0"/>
                    </Button>}
                </>
                }
            </>
        )
    }
}

export default TableFurtherActionsComponent;
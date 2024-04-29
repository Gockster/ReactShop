import React from "react";
import { Button, Card, Col, Form, InputGroup, Row, Alert } from "@themesberg/react-bootstrap";
import i18next from "i18next";
import { withRouter } from "react-router-dom";
import deliberationService from "_services/deliberationServices/deliberationService";
import { BeatLoader } from "react-spinners";
import SweetAlert from "react-bootstrap-sweetalert";


const initialCommentFormData = {
    comName: '',
    comEmail: '',
    comTitle: '',
    comComment: ''
}

class CommentFormComponent extends React.Component {


    state = {
        commentFormData: {
            comName: '',
            comEmail: '',
            comTitle: '',
            comComment: ''
        },
        showPrompt: false,
        successMsg: null,
        errorMsg: null,
    };


    constructor(props) {
        super(props);
        this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);

    }


    handleCommentFormSubmit = (event) => {

        if (!event.target.parentNode.checkValidity()) {
            event.target.parentNode.reportValidity();
            return;
        }

        this.setState({ showPrompt: true, successMsg: null, errorMsg: null });

        const { commentFormData } = this.state;
        const { deliberationId } = this.props;



        deliberationService.DeliberationComments(commentFormData, deliberationId)
            .then((response) => {
                this.setState({
                    successMsg: 'Form submitted successfully',
                    showPrompt: false,
                    errorMsg: null,
                    commentFormData: initialCommentFormData,
                });


            })
            .catch((error) => {
                this.setState({
                    errorMsg: 'Error submitting form',
                    showPrompt: false,
                    successMsg: null,
                });
            });

    };

    onCloseSuccessCommentPrompt = () => {

        this.props.fetchDeliberationCommentList(this.props.deliberationId);
        this.setState({ successMsg: null, showPrompt: false, errorMsg: null });

    };

    render() {


        return (

            <>
                <Form >
                    <Row className="mt-1 mb-1">
                        <Col xs={12} xl={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="required">
                                    {i18next.t("deliberationManagementPages.form.commentName")}
                                </Form.Label >
                                <InputGroup>
                                    <Form.Control
                                        name="name"
                                        as="input"
                                        type="text"
                                        value={this.state.commentFormData?.comName}
                                        onChange={(e) => this.setState({ commentFormData: { ...this.state.commentFormData, comName: e.target.value } })}
                                        required
                                        placeholder={i18next.t("deliberationManagementPages.form.commentNamePlaceholder")}

                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-1 mb-1">
                        <Col xs={12} xl={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="required">
                                    {i18next.t("deliberationManagementPages.form.commentEmail")}
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name="email"
                                        as="input"
                                        type="email"
                                        value={this.state.commentFormData?.comEmail}
                                        onChange={(e) => this.setState({ commentFormData: { ...this.state.commentFormData, comEmail: e.target.value } })}
                                        required
                                        placeholder={i18next.t("deliberationManagementPages.form.commentEmailPlaceholder")}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-1 mb-1">
                        <Col xs={12} xl={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="required">
                                    {i18next.t("deliberationManagementPages.form.commentArticle")}
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        as="input"
                                        type="text"
                                        name="title"
                                        value={this.state.commentFormData?.comTitle}
                                        onChange={(e) => this.setState({ commentFormData: { ...this.state.commentFormData, comTitle: e.target.value } })}
                                        required
                                        placeholder={i18next.t("deliberationManagementPages.form.commentArticlePlaceholder")}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-1 mb-6">
                        <Col xs={12} xl={6}>
                            <Form.Group>
                                <Form.Label className="required">
                                    {i18next.t("deliberationManagementPages.form.comments")}
                                </Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        name="comments"
                                        as="textarea"
                                        style={{ height: '100px' }}
                                        value={this.state.commentFormData?.comComment}
                                        onChange={(e) => this.setState({ commentFormData: { ...this.state.commentFormData, comComment: e.target.value } })}
                                        required
                                        placeholder={i18next.t("deliberationManagementPages.form.commentPlaceholder")}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    < div className="prompt">
                        <div className={"sweetAlertCustomStyles"}>
                            <SweetAlert
                                show={this.state.showPrompt}
                                showCancel={false}
                                showConfirm={false}
                                onConfirm={() => { }}
                                title={i18next.t("generic.pleaseWait")}
                            >
                                <div className="d-flex align-content-center justify-content-center pt-5">
                                    <BeatLoader
                                        size={35}
                                        color={"#4A5073"}
                                        loading={this.state.showPrompt}
                                    />
                                </div>
                            </SweetAlert>
                        </div>

                        <div className={"sweetAlertCustomStyles"}>
                            <SweetAlert
                                show={this.state.successMsg !== null}
                                success
                                confirmBtnText={i18next.t("prompts.successSaveFormAction.confirmButtonTitle")}
                                confirmBtnBsStyle="success"
                                title={i18next.t("prompts.successSaveFormAction.successCreateComment")}
                                onConfirm={this.onCloseSuccessCommentPrompt}
                                focusConfirmBtn

                            >
                                {i18next.t("prompts.successSaveFormAction.successCreateSubTitle")}
                            </SweetAlert>


                        </div>
                        {this.state.errorMsg &&
                            <Alert variant="danger" >{this.state.errorMsg}</Alert>
                        }
                    </div>

                    <Button variant="primary" type="button" onClick={this.handleCommentFormSubmit}>
                        {i18next.t("generic.register")}
                    </Button>
                </Form>
            </>

        )
    }
}
export default withRouter(CommentFormComponent);
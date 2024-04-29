import React from "react";
import { Button, Card, Col, Form, InputGroup, Row, Alert } from "@themesberg/react-bootstrap";
import i18next from "i18next";
import { withRouter } from "react-router-dom";
import moment from "moment";


class CommentListComponent extends React.Component {

    state = {
        comName: '',
        comEmail: '',
        comTitle: '',
        comComment: ''
    }


    render() {

        const {
            recordData,
        } = this.props;

        return (

            <>
                <Row className="mt-1 mb-1">
                    <Col xs={12} xl={4}>
                        <Form.Group>
                            <Form.Label>
                                <h5> {i18next.t("deliberationManagementPages.form.comment")}</h5>
                            </Form.Label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3 mb-3">
                    <Col xs={12} xl={4}>
                        <Form.Group>
                            <Form.Label>
                                {i18next.t("deliberationManagementPages.form.commentName")}
                            </Form.Label>

                            <Form.Control
                                as="input"
                                type="text"
                                readOnly
                                value={recordData?.comName}

                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12} xl={4}>
                        <Form.Group>
                            <Form.Label>
                                {i18next.t("deliberationManagementPages.form.commentEmail")}
                            </Form.Label>

                            <Form.Control
                                as="input"
                                type="text"
                                readOnly
                                value={recordData?.comEmail}

                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12} xl={4}>
                        <Form.Group>
                            <Form.Label>
                                {i18next.t("deliberationManagementPages.deliberation.datePosted")}
                            </Form.Label>

                            <Form.Control
                                as="input"
                                type="text"
                                readOnly
                                value={moment(recordData?.postedDate).format("DD-MM-YYYY")}

                            />
                        </Form.Group>
                    </Col>

                </Row>

                <Row className="mt-2 mb-1">
                    <Col xs={12} xl={6}>
                        <Form.Group>
                            <Form.Label>
                                {i18next.t("deliberationManagementPages.form.commentArticle")}
                            </Form.Label>
                            <InputGroup>
                                <Form.Control

                                    as="input"
                                    type="text"
                                    value={recordData?.comTitle}
                                    readOnly
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3 mb-4">
                    <Col xs={12} xl={12}>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                readOnly
                                rows={10}
                                value={recordData?.comComment}

                            />
                        </Form.Group>
                    </Col>
                </Row>


            </>

        )
    }
}
export default withRouter(CommentListComponent);
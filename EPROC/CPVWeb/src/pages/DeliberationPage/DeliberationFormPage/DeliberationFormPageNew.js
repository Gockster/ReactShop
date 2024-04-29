import { Alert, Card, Col, Form, InputGroup, Row } from "@themesberg/react-bootstrap";
import deliberationService from "_services/deliberationServices/deliberationService";
import React from "react";
import { withRouter } from "react-router-dom";
import { GenericMaterialDatePicker } from "../../../components/genericMaterialDatePicker/GenericMaterialDatePicker";
import GenericSectionHeaderComponent from "../../../components/genericSectionHeaderComponent/GenericSectionHeaderComponent";
import GenericFormMenuComponent from "../../../modules/genericFormMenuModule/GenericFormMenuModule";
import i18next from "../../../translations/i18nConfigInstance";




class DeliberationFormPageNew extends React.Component {

    state = {
        showTitle: "",
        showReferenceNumber: "",
        descriptionFormData: {
            title: '',
            endDate: null,
            description: '',
            file: null,
            dbid: '',
            errorWarningMsg: '',
            errorDangerMsg: '',
            successMsg: '',
            errorFileMsg: '',
            successFileMsg: ''
        },
        loading: false,
        isValidFile: true,
        isValidDate: true

    };

    renderLoading() {
        return this.state.loading ? <div>Loading...</div> : null;
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        if (!file) { this.setState({ errorFileMsg: `${i18next.t("generic.fileIsRequired")}`, loading: false, isValidFile: false }); return; }
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const tmpDescriptionFormdata = this.state.descriptionFormData;
            tmpDescriptionFormdata.file = file;
            tmpDescriptionFormdata.fileData = reader.result;

            if (!file.name.match(/.(pdf)$/i)) {
                // Handle error when file type is not PDF
                this.setState({ errorFileMsg: `${i18next.t("generic.ChoosePdfFile")}`, loading: false, isValidFile: false });
                return;
            }
            else {
                this.setState({ errorFileMsg: '', isValidFile: true });
            }

            const MAX_FILE_SIZE = 61440
            const MaxFileSize = MAX_FILE_SIZE / 1024
            const filesize = tmpDescriptionFormdata.file.size / 1024
            if (filesize > MAX_FILE_SIZE) {
                this.setState({ errorFileMsg: `${i18next.t("generic.MaxFileSize", { MaxFileSize })}`, loading: false, isValidFile: false });
                return;
            }

            this.setState({ descriptionFormData: tmpDescriptionFormdata });
        };

    }

    constructor(props) {
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this);

    }


    onValidateForm = async () => {
        return new Promise((resolve, reject) => {
            let validationSucceed = false;
            const { descriptionFormData } = this.state;

            if (1 === 1) {
                validationSucceed = true;
            }
            if (validationSucceed) {
                resolve(descriptionFormData);

            } else {

                reject("Deliberation Request Form Validation Failed");
            }
        });
    };

    isFormValid = () => {
        const {
            title,
            description,
            endDate,
            file

        } = this.state.descriptionFormData;

        return !!title && !!description && !!endDate && !!file;
    }

    CreateSaveForm = () => {


        return new Promise((resolve, reject) => {

            this.setState({ loading: true });

            deliberationService.DescriptionFormDeliberation(this.state.descriptionFormData)
                .then((res) => {
                    const mappedResponse = res;
                    this.setState({ showTitle: res.data.title, showReferenceNumber: res.data.referenceNumber });

                    const file = this.state.descriptionFormData.file;

                    if (!file) { this.setState({ loading: false }); return resolve(mappedResponse); }

                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('dbid', res.data.dbid);

                    this.setState({ loading: true });
                    deliberationService.uploadFile(formData)
                        .then((response) => {
                            this.setState({ successFileMsg: `${i18next.t("generic.FileUploadSuccess")}`, loading: false });

                            this.setState({
                                descriptionFormData: {
                                    file: null
                                }
                            });
                            resolve(mappedResponse);
                        }).catch((error) => {

                            this.setState({ errorFileMsg: `${i18next.t("generic.FileUploadFailure")}`, loading: false });
                        }).finally(() => {
                            this.setState({ loading: false });

                        })

                })
                .catch((error) => {
                    // alert(error);
                    console.log(error);
                    reject(error);
                });

        })
    }

    returnDate = () => {
        const startedDay = new Date();
        startedDay.setDate(startedDay.getDate() + 1);

        const futureDate = this.state.descriptionFormData.endDate;
        futureDate.setHours(23, 59, 59, 0);
        const differenceInMs = futureDate.getTime() - startedDay.getTime();

        const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

        if (differenceInDays < 15 && differenceInDays >= 0) {
            this.setState({ errorWarningMsg: `${i18next.t("generic.expireDate")}`, isValidDate: true });
        } else if (differenceInDays >= 15) {
            this.setState({ errorWarningMsg: "", isValidDate: true });
        } else {
            this.setState({ errorDangerMsg: `${i18next.t("generic.invalidDate")}`, isValidDate: false });
        }
    }

    render() {
        const {
            loading,
            isValidFile,
            isValidDate,
            showReferenceNumber,
            showTitle
        } = this.state;

        const urlParams = this.props.match.params;
        const {
            mode,
        } = urlParams;

        const {
            isCreateMode
        } = this.props;

        const requiredSymbol = '<span style="color: red">*</span>';
        const requiredFieldMsg = i18next.t('generic.RequiredFieldMsg', { requiredSymbol });

        return (

            <div>
                <>
                    <GenericSectionHeaderComponent
                        textSize={"4"}
                        title={i18next.t("deliberationManagementPages.page.newFormTitle")}
                    />

                    <div style={{ textAlign: "right" }}>
                        {isValidFile && (
                            < GenericFormMenuComponent
                                isSaveButtonDisabled={!this.isFormValid() || !isValidDate}
                                onValidateCallback={this.onValidateForm}
                                formIsCreateMode={isCreateMode}
                                showSaveButton={isCreateMode}
                                navigationUrl={null}
                                showSimpleBackActionBtn={!isCreateMode}
                                saveService={this.CreateSaveForm}
                                showTitle={showTitle}
                                showReferenceNumber={showReferenceNumber}
                            >
                                {this.renderLoading()}
                            </GenericFormMenuComponent>
                        )}

                    </div>

                </>
                <>
                    <Card border="light" className="shadow-sm mb-4 mt-1">
                        <Card.Header><h6 dangerouslySetInnerHTML={{ __html: requiredFieldMsg }} /></Card.Header>
                        <Card.Body>
                            <Form >
                                <Row className="mt-1 mb-1">
                                    <Col xs={12} xl={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                {i18next.t("deliberationManagementPages.searchCriteriaFilter.title")}
                                                <span className="text-danger">{i18next.t("generic.RequireSymbol")}</span>
                                            </Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    name="title"
                                                    as="input"
                                                    type="text"
                                                    placeholder={i18next.t("deliberationManagementPages.searchCriteriaFilter.titlePlaceholder")}
                                                    value={this.state.descriptionFormData.title}
                                                    onChange={(e) => this.setState({ descriptionFormData: { ...this.state.descriptionFormData, title: e.target.value } })}
                                                    required

                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mt-1 mb-1">
                                    <Col xs={12} xl={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                {i18next.t("deliberationManagementPages.deliberation.expirationDate")}
                                                <span className="text-danger">{i18next.t("generic.RequireSymbol")}</span>
                                            </Form.Label>
                                            <InputGroup>

                                                <GenericMaterialDatePicker
                                                    name="endDate"
                                                    outlined={true}
                                                    dateTimePicker={false}
                                                    value={this.state.descriptionFormData.endDate}
                                                    onChange={(e) => this.setState({ descriptionFormData: { ...this.state.descriptionFormData, endDate: e } },
                                                        () => { this.returnDate(); })}
                                                />
                                            </InputGroup>
                                            {this.state.errorWarningMsg && isValidDate && <Alert variant="warning">{this.state.errorWarningMsg}</Alert>}
                                            {this.state.errorDangerMsg && !isValidDate && < Alert variant="danger">{this.state.errorDangerMsg}</Alert>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mt-1 mb-6">
                                    <Col xs={12} xl={8}>
                                        <Form.Group >
                                            <Form.Label>
                                                {i18next.t("deliberationManagementPages.deliberation.descriptionD")}
                                                <span className="text-danger">{i18next.t("generic.RequireSymbol")}</span>
                                            </Form.Label>
                                            <InputGroup className="mb-3">

                                                <Form.Control
                                                    name="description"
                                                    as="textarea"
                                                    rows={10}
                                                    placeholder={i18next.t("deliberationManagementPages.searchCriteriaFilter.titlePlaceholder")}
                                                    value={this.state.descriptionFormData.description}
                                                    onChange={(e) => this.setState({ descriptionFormData: { ...this.state.descriptionFormData, description: e.target.value } })}
                                                    required
                                                />

                                            </InputGroup>
                                        </Form.Group>

                                    </Col>
                                </Row>

                                <Row className="mt-1 mb-6">
                                    <Col xs={12} xl={6}>
                                        <Form.Group controlId="file" >
                                            <Form.Label>
                                                {i18next.t("generic.ChooseFile")}
                                                <span className="text-danger">{i18next.t("generic.RequireSymbol")}</span>
                                            </Form.Label>
                                            <Form.Control type="file" name="file" aria-label="Test" onChange={this.handleFileChange} accept=".pdf" />

                                            <div className="mt-4 mb-4">{i18next.t("generic.MsgSizePdf")}</div>

                                            {this.state.successFileMsg && <Alert variant="success">{this.state.successFileMsg}</Alert>}
                                            {this.state.errorFileMsg && <Alert variant="danger">{this.state.errorFileMsg}</Alert>}

                                            {this.renderLoading()}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </>
            </div >

        )
    }

}

export default withRouter(DeliberationFormPageNew);
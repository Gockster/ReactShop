import { Alert, Button, Card, Col, Form, InputGroup, Row } from "@themesberg/react-bootstrap";
import CommentFormComponent from "components/commentForm/CommentFormComponent";
import CommentListComponent from "components/commentList/CommentListComponent";
import moment from "moment";
import React from "react";
import { withRouter } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import deliberationService from "../../../_services/deliberationServices/deliberationService";
import DownloadAttachmentComponent from "../../../components/downloadAttachmentSectionComponent/DownloadAttachmentComponent";
import { GenericMaterialDatePicker } from "../../../components/genericMaterialDatePicker/GenericMaterialDatePicker";
import GenericSectionHeaderComponent from "../../../components/genericSectionHeaderComponent/GenericSectionHeaderComponent";
import GenericFormMenuComponent from "../../../modules/genericFormMenuModule/GenericFormMenuModule";
import i18next from "../../../translations/i18nConfigInstance";

// import {
//     GoogleReCaptchaProvider,
//     GoogleReCaptcha
// } from 'react-google-recaptcha-v3';

const initialCommentFormData = {
	comName: '',
	comEmail: '',
	comTitle: '',
	comComment: ''
}

class DeliberationFormPage extends React.Component {


	state = {
		deliberationIdFromUrlParams: null,
		// Network data state
		pendingGettingRecord: false,
		errorGettingRecord: false,
		recordData: null,
		originalRecordData: null,


		pendingGettingDeliberationList: false,
		errorGettingDeliberationList: false,
		pendingGettingDeliberationComList: false,
		errorGettingDeliberationComList: false,
		requestsListData: null,
		commentFormData: {
			comName: '',
			comEmail: '',
			comTitle: '',
			comComment: '',
			captcha_key: '',
		},
		descriptionFormData: {
			file: null
		},
		refreshRecaptcha: false,
		loading: false,
		isValidFile: true,
		errorWarningMsg: "",
		errorDangerMsg: "",
		successMsg: null,
		errorFileMsg: '',
		successFileMsg: '',
		isValidDate: true,
		showPrompt: false,
		loadingComment: false,

		isProtectedMode: this.props?.location?.state?.isProtectedMode ? this.props?.location?.state?.isProtectedMode : false
	}

	constructor(props) {
		super(props);

		const urlParams = this.props.match.params;

		const {
			action,
			secMode
		} = urlParams;

		if (action === 'edit' && secMode === 'protected') {

		}
	}

	componentDidMount(): void {
		const {
			isCreateMode,
			isEditMode,
			isViewMode,
			urlParams,

		} = this.props;

		const { deliberationID } = urlParams;

		this.setState({
			deliberationIdFromUrlParams: deliberationID
		});

		if (isEditMode || isViewMode) {
			this.fetchDeliberation(deliberationID);
			this.fetchDeliberationCommentList(deliberationID);
		}
	}


	//otan kanoyme update to param apo to url 
	//kai to id einai diaforetiko apo to id pou exoyme sto state
	//kanoyme fetch to neo record
	componentDidUpdate(prevProps): void {
		const {
			isCreateMode,
			isEditMode,
			isViewMode,
			urlParams,
		} = this.props;
		const { deliberationID } = urlParams;
		if (this.state.deliberationIdFromUrlParams != deliberationID) {
			this.setState({
				deliberationIdFromUrlParams: deliberationID
			});
			if (isEditMode || isViewMode) {
				this.fetchDeliberation(deliberationID);

			}


		}
	}


	fetchDeliberation = (deliberationID) => {
		this.setState({
			pendingGettingRecord: true,

		});

		deliberationService.getSingle(deliberationID)
			.then((response) => {
				this.setState({
					pendingGettingRecord: false,
					errorGettingRecord: false,
					recordData: response,
					originalRecordData: response
				})
			}).catch((error) => {
				this.setState({
					pendingGettingRecord: false,
					errorGettingRecord: true,
				})
			});
	};

	fetchDeliberationCommentList = (deliberationID) => {
		this.setState({
			pendingGettingDeliberationComList: true,
		});
		deliberationService.getDeliberationComList(deliberationID)
			.then((response) => {
				this.setState({
					pendingGettingDeliberationComList: false,
					errorGettingDeliberationComList: false,
					requestsListData: response
				})
			}).catch((error) => {
				this.setState({
					pendingGettingDeliberationComList: false,
					errorGettingDeliberationComList: true
				})
			});
	};

	onValidateForm = async () => {
		return new Promise((resolve, reject) => {
			let validationSucceed = false;
			const { recordData } = this.state;

			if (1 === 1) {
				validationSucceed = true;
			}
			if (validationSucceed) {
				resolve(recordData);
			} else {
				reject("Deliberation Request Form Validation Failed");
			}
		});
	};

	// handleVerify = (recaptchaToken) => {
	//     this.setState({ commentFormData: { ...this.state.commentFormData, captcha_key: recaptchaToken } });
	// }


	handleFileChange = (event) => {
		const file = event.target.files[0];
		if (!file) { this.setState({ loading: false, isValidFile: true }); return; }
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
			} else {
				this.setState({ errorFileMsg: '', isValidFile: true });
			}

			const MAX_FILE_SIZE = 61440
			const MaxFileSize = MAX_FILE_SIZE / 1024
			const filesize = tmpDescriptionFormdata.file.size / 1024
			if (filesize > MAX_FILE_SIZE) {
				this.setState({ errorFileMsg: `${i18next.t("generic.MaxFileSize", { MaxFileSize })} `, loading: false, isValidFile: false });
				return;
			}

			this.setState({ descriptionFormData: tmpDescriptionFormdata });
		};

	}

	renderLoading() {
		return this.state.loading ? <div>Loading...</div> : null;
	}


	saveForm = () => {
		return new Promise((resolve, reject) => {

			deliberationService.update(this.state.recordData)
				.then((res) => {
					const mappedResponse = res;
					this.setState({ recordData: mappedResponse })


					const file = this.state.descriptionFormData.file;


					if (!file) { this.setState({ loading: false }); return resolve(mappedResponse); }


					const formData = new FormData();
					formData.append('file', file);
					formData.append('dbid', this.state.deliberationIdFromUrlParams);

					this.setState({ loading: true });
					deliberationService.uploadFile(formData)
						.then((response) => {
							this.setState({ successFileMsg: `${i18next.t("generic.FileUploadSuccess")}`, loading: false });
							console.log(response);

							this.setState({
								descriptionFormData: {
									file: null
								}
							});
							resolve(mappedResponse);
						}).catch((error) => {

							if (typeof error.response !== 'undefined' &&
								error.response !== null &&
								typeof error.response.data !== 'undefined' &&
								error.response.data !== null &&
								typeof error.response.data.errorCode !== 'undefined' &&
								error.response.data.errorCode === 4005) {
								this.setState({ errorFileMsg: i18next.t("generic.lockedFile"), loading: false });
							} else {
								this.setState({ errorFileMsg: i18next.t("generic.FileUploadFailure"), loading: false });
							}
							reject(error);
						}).finally(() => {
							this.setState({ loading: false });

						})

				})
				.catch((error) => {
					//alert(error);
					reject(error);
				});
		});

	}



	returnDate = () => {
		const startedDay = new Date(this.state.recordData?.publicationDate);
		startedDay.setDate(startedDay.getDate() + 1);

		const futureDate = this.state.recordData?.endDate;
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

	handleReject = (index) => {
		const commentId = this.state.requestsListData[index].comDbId;
		this.setState(prevState => ({
			requestsListData: prevState.requestsListData.map((comment, i) => {
				if (i === index) {
					return {
						...comment,
						isRejected: 1
					};
				}
				return comment;
			})
		}), () => {
			this.setState({ loadingComment: true });
			deliberationService.updateComments(commentId, 1)
				.then(response => {
					//console.log(response);
				})
				.catch(error => {
					console.log(error);
				})
				.finally(() => {
					this.setState({ loadingComment: false });
				});
		});

	}

	handleAccept = (index) => {
		const commentId = this.state.requestsListData[index].comDbId;
		this.setState(prevState => ({
			requestsListData: prevState.requestsListData.map((comment, i) => {
				if (i === index) {
					return {
						...comment,
						isRejected: 0
					};
				}
				return comment;
			})
		}), () => {
			this.setState({ loadingComment: true });
			deliberationService.updateComments(commentId, 0)
				.then(response => {
					//console.log(response);
				})
				.catch(error => {
					console.log(error);
				})
				.finally(() => {
					this.setState({ loadingComment: false });
				});
		});

	}

	render() {
		const {
			deliberationIdFromUrlParams,
			// Network data state
			recordData,
			pendingGettingRecord,
			pendingGettingDeliberationComList,
			errorGettingDeliberationComList,
			errorGettingRecord,
			requestsListData,
			isValidDate,
			loadingComment
		} = this.state;
		const {
			isCreateMode,
			isEditMode,
			isViewMode,
			isProtectedMode,
			isPublicMode
		} = this.props;

		const { loading, isValidFile } = this.state;

		return (

			<div>

				{/*<GoogleReCaptchaProvider reCaptchaKey="6LeQweUkAAAAAD3vtuefKGCjIN61kaXWtmNO6Evo">*/}
				{/*    <GoogleReCaptcha onVerify={this.handleVerify}*/}
				{/*        refreshReCaptcha={this.state.refreshRecaptcha} />*/}
				{/*</GoogleReCaptchaProvider>*/}
				<>
					<GenericSectionHeaderComponent
						textSize={"4"}
						title={
							isEditMode
								? i18next.t("deliberationManagementPages.page.editFormTitle")
								: isViewMode
									? i18next.t("deliberationManagementPages.page.viewFormTitle")
									: i18next.t("deliberationManagementPages.page.newFormTitle")
						}
					/>
					{pendingGettingRecord && (
						<Row>
							<Col xs={12}>
								<Card border="light" className="bg-white shadow-sm mb-4">
									<Card.Body>
										<div className="d-flex align-content-center justify-content-center pt-5">
											<BeatLoader
												size={35}
												color={"#4A5073"}
												loading={pendingGettingRecord}
											/>
										</div>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					)}

					<div style={{ textAlign: "right" }}>
						{isValidFile &&
							<GenericFormMenuComponent
								isSaveButtonDisabled={isViewMode || pendingGettingRecord || !isValidDate}
								onValidateCallback={this.onValidateForm}
								formIsEditMode={isEditMode}
								showSaveButton={isEditMode}
								navigationUrl={null}
								showSimpleBackActionBtn={isViewMode}
								saveService={this.saveForm}
							/>
						}

					</div>
				</>

				{!pendingGettingRecord && recordData && (
					<>
						<Row>
							<Col xs={12}>
								<Card border="light" className="shadow-sm mb-4 mt-1">
									<Card.Header>
										<h5> {recordData?.title}</h5>
									</Card.Header>
									<Card.Body>
										<Row className="mt-1 mb-1">
											<Col xs={12} xl={6}>
												<Form.Group>
													<Form.Label>{i18next.t("deliberationManagementPages.deliberation.datePosted")}</Form.Label>
													<InputGroup >
														<Form.Control
															readOnly
															type="date"
															style={{ fontWeight: "bolder" }}
															value={recordData?.publicationDate ? moment(recordData?.publicationDate).format("YYYY-MM-DD") : ""}
														/>

													</InputGroup>
												</Form.Group >
											</Col>

											<Col xs={12} xl={6}>
												<Form.Group>
													<Form.Label>{i18next.t("deliberationManagementPages.deliberation.lastUpdate")}</Form.Label>
													<InputGroup>
														<Form.Control
															readOnly
															type="date"
															style={{ fontWeight: "bolder" }}
															value={recordData?.lastUpdateDate ? moment(recordData?.lastUpdateDate).format("YYYY-MM-DD") : ""}
														/>
													</InputGroup>
												</Form.Group>
											</Col>
										</Row>
										<Row className="mt-3 mb-1">
											<Col xs={12} xl={6}>
												<Form.Group>
													<Form.Label>{i18next.t("deliberationManagementPages.deliberation.referenceNumber")}</Form.Label>
													<InputGroup>
														<Form.Control
															readOnly
															type="text"
															style={{ fontWeight: "bolder" }}
															value={recordData?.referenceNumber}
														/>
													</InputGroup>
												</Form.Group>
											</Col>
											<Col xs={12} xl={6}>
												<Form.Group>
													<Form.Label>{i18next.t("deliberationManagementPages.deliberation.expirationDate")}</Form.Label>
													<InputGroup>
														{isViewMode &&
															<Form.Control

																readOnly={!isEditMode}
																type="date"
																style={{ fontWeight: "bolder" }}
																value={recordData?.endDate ? moment(recordData?.endDate).format("YYYY-MM-DD") : ""}
																onChange={(e) => { if (isEditMode) this.setState({ recordData: { ...recordData, endDate: e.target.value } }) }}
															/>
														}
														{isEditMode &&
															<div className="mw-100">

																<GenericMaterialDatePicker className="mw-100"
																	name="endDate"
																	outlined={true}
																	dateTimePicker={false}
																	value={recordData?.endDate}
																	onChange={(e) => this.setState({ recordData: { ...recordData, endDate: e } },
																		() => { this.returnDate(); })}
																/>
																{this.state.errorWarningMsg && isValidDate && <Alert variant="warning">{this.state.errorWarningMsg}</Alert>}
																{this.state.errorDangerMsg && !isValidDate && <Alert variant="danger">{this.state.errorDangerMsg}</Alert>}
															</div>
														}
													</InputGroup>
												</Form.Group>
											</Col>
										</Row>
									</Card.Body>
								</Card>
								<Card>
									<Card.Body>
										<Row className="mt-1 mb-1">
											<Col xs={12} xl={12}>
												<Form.Group>
													<Form.Control
														className="print-description"
														as="textarea"
														readOnly={!isEditMode}
														rows={10}
														value={recordData?.description}
														// value={recordData?.description ?
														//     new TextDecoder().decode(new Uint8Array(window.atob(recordData?.description).split("").map((c) => c.charCodeAt(0)))) : ""}
														onChange={(e) => { if (isEditMode) this.setState({ recordData: { ...recordData, description: e.target.value } }) }}
													>
													</Form.Control>
												</Form.Group>
											</Col>
										</Row>

										{
											isEditMode &&
											<Row className="mt-4 mb-4">
												<Col xs={12} xl={6}>

													<Form.Group controlId="file">
														<Form.Label>{i18next.t("generic.ChooseFile")}</Form.Label>
														<Form.Control type="file" name="file"
															onChange={this.handleFileChange} accept=".pdf" />
														{this.renderLoading()}
														{this.state.successFileMsg && <Alert
															variant="success">{this.state.successFileMsg}</Alert>}
														{this.state.errorFileMsg &&
															<Alert variant="danger">{this.state.errorFileMsg}</Alert>}
													</Form.Group>

												</Col>
											</Row>
										}

										{
											recordData?.hasFile && (
												<DownloadAttachmentComponent
													isDisabledDownloadButton={pendingGettingRecord}
													fileId={recordData?.dbid}
												/>
											)
										}

									</Card.Body >

								</Card >


								{!pendingGettingDeliberationComList && (

									<Card border="light" className="shadow-sm mb-4 mt-1">
										<Card.Header>
											<h5>{i18next.t("deliberationManagementPages.form.comments")}</h5>
										</Card.Header>

										{isEditMode && requestsListData && requestsListData.map((recordData, index) => (

											<Card.Body key={index} style={{ borderBlockEnd: "6px solid 	#F5F5F5" }} >
												<div className="d-flex align-content-center justify-content-center pt-3">
													<BeatLoader
														size={35}
														color={"#4A5073"}
														loading={!requestsListData}
													/>
												</div>

												<div>
													{loadingComment && (
														<BeatLoader
															size={20}
															color={"#4A5073"}
															loading={true}
														/>
													)}

													<Row className="mt-1 mb-1">

														<Col>
															<Button variant="success" onClick={() => this.handleAccept(index)}>
																{i18next.t("generic.AcceptedComment")}
															</Button>{' '}

															<Button variant="danger" onClick={() => this.handleReject(index)}>
																{i18next.t("generic.RejectedComment")}
															</Button>

														</Col>

														<Col className="d-flex align-items-center justify-content-end">
															{recordData.isRejected === 1 && (
																<Alert variant="danger">{i18next.t("generic.CommentRejection")}</Alert>
															)}

															{recordData.isRejected === 0 && (
																<Alert variant="success">{i18next.t("generic.CommentApproval")}</Alert>
															)}
														</Col>

													</Row>
												</div>

												<CommentListComponent recordData={recordData} />
											</Card.Body >
										))}

										{isViewMode && requestsListData && requestsListData.filter(recordData => recordData.isRejected === 0).map((recordData, index) => (
											<Card.Body key={index} style={{ borderBlockEnd: "6px solid 	#F5F5F5" }} >
												<div className="d-flex align-content-center justify-content-center pt-3">
													<BeatLoader
														size={35}
														color={"#4A5073"}
														loading={!requestsListData}
													/>
												</div>
												<CommentListComponent recordData={recordData} />
											</Card.Body>
										))}

									</Card >
								)
								}

								{
									!isProtectedMode && isViewMode && recordData && !recordData?.closed && (

										< Card border="light" className="shadow-sm mb-4 mt-1 hidden-print">
											<Card.Header>
												<h5>{i18next.t("deliberationManagementPages.form.commentEntry")}</h5>
											</Card.Header>
											<Card.Body>
												<CommentFormComponent
													deliberationId={deliberationIdFromUrlParams}
													fetchDeliberationCommentList={this.fetchDeliberationCommentList}
												/>
											</Card.Body>

										</Card>

									)
								}

							</Col>
						</Row >
					</>
				)
				}

			</div >

		)

	}
}

export default withRouter(DeliberationFormPage);
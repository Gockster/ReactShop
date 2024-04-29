import { Button, Card, Col, Form, InputGroup, Row } from "@themesberg/react-bootstrap";
import React from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import deliberationService from "../../../_services/deliberationServices/deliberationService";
import { GenericMaterialDatePicker } from "../../../components/genericMaterialDatePicker/GenericMaterialDatePicker";
import GenericSectionHeaderComponent from "../../../components/genericSectionHeaderComponent/GenericSectionHeaderComponent";
import DelibGenericTableComponent from "../../../components/genericTableComponent/GenericTableComponent";
import { PROTECTED_MODE } from "../../../routing/routes";
import i18next from "../../../translations/i18nConfigInstance";
import DeliberationTableRowComponent from "./components/DeliberationTableRowComponent";

class DeliberationListPage extends React.Component {

	state = {
		searchFormData: {
			referenceNumber: "",
			dateFrom: null,
			dateTill: null,
			title: "",
		},
		recordsData: {},
		mappedResponse: {},
		pendingGettingRecordsData: false,
		errorGettingRecordsData: false,
		totalItemsPerPage: 10,
		currentPage: 0,
		paginatedData: undefined,


	}


	componentDidMount() {
		var pd = deliberationService.paginationStorage.get();
		if (pd) {
			this.setState({ totalItemsPerPage: pd.size });
			this.setState({ currentPage: pd.page });
		}
		else
			pd = { page: 0, size: 10 };

		var returning = deliberationService.paginationStorage.getReturning();

		if (returning) {
			var data = deliberationService.paginationStorage.get();
			this.setState({
				searchFormData: {
					...this.state.searchFormData,
					referenceNumber: data.rf,
					dateFrom: data.dateFrom,
					dateTill: data.dateTill,
					title: data.title
				}
			})
			this.fetchDeliberationList(pd.page, pd.size, data.title, data.rf, data.dateFrom, data.dateTill);
		}
		else {
			deliberationService.paginationStorage.save(0, 10, null, null, null, null);
			this.setState({ totalItemsPerPage: 10 });
			this.setState({ currentPage: 0 });

		}


		//var state = new URLSearchParams(this.props.location.search).get("state");
		//if (state == "1") {
		//	this.fetchDeliberationList(pd.page, pd.size);
		//}
		//else {
		//	deliberationService.paginationStorage.save(0, 10);
		//	this.setState({ totalItemsPerPage: 10 });
		//	this.setState({ currentPage: 0 });
		//
		//}

	}
	serverSidePaginationServiceCallback = (eventData) => {
		this.fetchDeliberationList(eventData.pageNumber, eventData.pageSize);
	}

	fetchDeliberationList = (pageNumber, pageSize, t = null, rf = null, dt = null, tf = null) => {
		this.setState({ pendingGettingRecordsData: true });
		deliberationService.DeliberationList(t == null ? {
			referenceNumber: this.state.searchFormData.referenceNumber,
			dateFrom: this.state.searchFormData.dateFrom,
			dateTill: this.state.searchFormData.dateTill,
			title: this.state.searchFormData.title
		}: {
			referenceNumber: rf,
			dateFrom: dt,
			dateTill: tf,
			title: t
		}, pageNumber, pageSize)
			.then((response) => {
				this.setState({ recordsData: response.data.content });

				this.setState({
					paginatedData: {
						totalElements: response.data.totalElements,
						totalPages: response.data.totalPages,
						currentPage: response.data.pageable.pageNumber,

					}
				});
			})
			.catch((error) => {
				this.setState({ errorGettingRecordsData: false });

			})
			.then(() => {
				this.setState({ pendingGettingRecordsData: false });
			});
	}

	filterSearchRequestCallback = () => {
		this.fetchDeliberationList(this.state.currentPage, this.state.totalItemsPerPage);
	}

	setTotalItemsPerPage = (itemsPerPage) => {
		this.setState({ totalItemsPerPage: itemsPerPage });
	}


	handleNewDeliberationButton = () => {

		const {

			history
		} = this.props;


		history.push({
			pathname: ('/deliberation/' + PROTECTED_MODE + '/new')
		})

	}

	render() {

		const urlParams = this.props.match.params;

		const {
			secMode,
		} = urlParams;

		const {
			isEditMode,
			isViewMode
		} = this.props;

		return (


			<div>

				<GenericSectionHeaderComponent
					textSize={"4"}
					title={i18next.t("deliberationManagementPages.searchPageTitle")} />

				{(<>
					<Row>
						<Col xs={12}>
							<Card border="light" className="shadow-sm mb-4 mt-1">
								<Card.Header>
									<h5>{i18next.t("generic.searchFiltersTitle")}</h5>
								</Card.Header>
								<Card.Body>
									<Form>
										<Row className="mt-3 mb-1">
											<Col xs={12} xl={3}>
												<Form.Group>
													<Form.Label>
														{i18next.t("deliberationManagementPages.searchCriteriaFilter.referenceNumber")}
													</Form.Label>
													<InputGroup>
														<Form.Control
															name="referenceNumber"
															as="input"
															type="text"
															placeholder={i18next.t("deliberationManagementPages.searchCriteriaFilter.referenceNumberPlaceholder")}
															value={this.state.searchFormData.referenceNumber}
															onChange={(e) => this.setState({
																searchFormData: {
																	...this.state.searchFormData,
																	referenceNumber: e.target.value
																}
															})}
														/>
													</InputGroup>
													<Form.Text>{i18next.t("deliberationManagementPages.searchCriteriaFilter.referenNumberSubscript")}</Form.Text>
												</Form.Group>
											</Col>
										</Row>

										<Row className="mt-3 mb-1">
											<Col xs={12} xl={3}>
												<Form.Group>
													<Form.Label>
														{i18next.t("deliberationManagementPages.searchCriteriaFilter.dateFrom")}
													</Form.Label>
													<InputGroup>
														<GenericMaterialDatePicker
															name="dateFrom"
															outlined={true}
															dateTimePicker={false}
															value={this.state.searchFormData.dateFrom}
															onChange={(e) => this.setState({ searchFormData: { ...this.state.searchFormData, dateFrom: e } },
																() => { this.state.searchFormData?.dateFrom.setHours(0, 0, 1, 0); })}
														/>
													</InputGroup>

												</Form.Group>
											</Col>

											<Col xs={12} xl={3}>
												<Form.Group>
													<Form.Label>
														{i18next.t("deliberationManagementPages.searchCriteriaFilter.dateTill")}
													</Form.Label>
													<InputGroup>

														<GenericMaterialDatePicker
															name="dateTill"
															outlined={true}
															dateTimePicker={false}
															value={this.state.searchFormData.dateTill}
															onChange={(e) => this.setState({ searchFormData: { ...this.state.searchFormData, dateTill: e } },
																() => { this.state.searchFormData?.dateTill.setHours(23, 59, 59, 0); })}
														>
														</GenericMaterialDatePicker>

													</InputGroup>
												</Form.Group>
											</Col>
										</Row>

										<Row className="mt-3 mb-1">
											<Col xs={12} xl={6}>
												<Form.Group>
													<Form.Label>
														{i18next.t("deliberationManagementPages.searchCriteriaFilter.title")}
													</Form.Label>
													<InputGroup>
														<Form.Control
															as="input"
															type="text"
															name="title"
															placeholder={i18next.t("deliberationManagementPages.searchCriteriaFilter.titlePlaceholder")}
															value={this.state.searchFormData.title}
															onChange={(e) => this.setState({
																searchFormData: {
																	...this.state.searchFormData,
																	title: e.target.value
																}
															})}
														/>


													</InputGroup>
													<Form.Text> {i18next.t("deliberationManagementPages.searchCriteriaFilter.titleSubscript")}</Form.Text>
												</Form.Group>
											</Col>
										</Row>


										<Row className="mt-3 mb-1">
											<Col>
												<Button variant="primary" type="button"
													onClick={this.filterSearchRequestCallback}>
													{i18next.t("generic.search")}
												</Button>

												{secMode === PROTECTED_MODE &&
													<Button variant="primary" type="button" className="btn-float-right"
														style={{ float: "right" }}
														onClick={this.handleNewDeliberationButton}>
														{i18next.t("deliberationManagementPages.page.newFormTitle")}
													</Button>
												}
											</Col>

										</Row>
									</Form>
								</Card.Body>
							</Card>
						</Col>
					</Row>

					<div className={"mt-1 mb-1"}>

						<DelibGenericTableComponent
							stickyLastColumn={true}
							tableHeaderTitles={[
								i18next.t("deliberationManagementPages.searchCriteriaFilter.title"),
								i18next.t("deliberationManagementPages.deliberation.datePosted"),
								i18next.t("deliberationManagementPages.deliberation.lastUpdate"),
								i18next.t("deliberationManagementPages.deliberation.expirationDate"),
								i18next.t("deliberationManagementPages.deliberation.referenceNumber"),
								i18next.t("deliberationManagementPages.deliberation.CountComments"),
								i18next.t("deliberationManagementPages.deliberation.CountAcceptedComments"),
								i18next.t("generic.actions"),

							]}

							tableRowComponent={<DeliberationTableRowComponent
								isProtectedMode={secMode === PROTECTED_MODE}
								isEditShown={secMode !== PROTECTED_MODE}
								isEditDisabled={secMode !== PROTECTED_MODE} />}
							serverSidePaginationEnabled={true}
							totalItemsPerPage={this.state.totalItemsPerPage}
							setTotalItemsPerPageCallback={this.setTotalItemsPerPage}
							paginatedData={this.state.paginatedData}
							recordsData={this.state.recordsData}
							pendingGettingRecordsData={this.state.pendingGettingRecordsData}
							errorGettingRecordsData={this.state.errorGettingRecordsData}
							serverSidePaginationServiceCallback={this.serverSidePaginationServiceCallback}
						/>

					</div>
				</>)}
			</div>

		)
	}

}

export default withRouter(withTranslation()(DeliberationListPage));


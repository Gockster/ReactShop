import React from 'react';
import {Button, Col, Form, FormControl, FormGroup, InputGroup, Row} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import GenericModalComponent from "../genericModalComponent/GenericModalComponent";
import GenericTableComponent from "../genericTableComponent/GenericTableComponent";
import i18next from "i18next";

const initialPaginationData = {
    pageNumber: 0,
    pageSize: 10
}

type Props = {
    fieldValue: any,
    fieldDescription: any,
    fieldLabel: string,
    disabled: boolean,
    searchButtonDisabled: boolean,
    placeholder: string,
    isModalOpen: boolean,
    modalToggleCallback: string,
    searchModalTitle: string,
    modalSize: string,
    serviceToFetchPagedTableData: Function,
    datatableColumnsNames: Array,
    tableRowComponent: any,
    isInvalid: boolean,
    errorMessage: string,
    initialPageItemsPerPage: number,
    updateParentCallback: Function,
    searchFilterComponent: any,
    recordDateRowPropNameToCheckUniqueness: string
}

class GenericInputFieldWithSearchModalComponent extends React.Component<Props> {

    state = {
        paginationData: null,
        pendingGettingPaginationData: false,
        errorGettingPaginationData: false,
        totalItemsPerPage: this.props.initialPageItemsPerPage,
        searchFilters: null,
        selectedTableRowData: null,
    };

    fetchPaginatedDataFromService = (dataToBePassed) => {
        if (typeof dataToBePassed == 'undefined' || dataToBePassed === null) {
            const tmpData = Object.assign({}, initialPaginationData);

            if( this.props.initialPageItemsPerPage !== 'undefined' && this.props.initialPageItemsPerPage !== null) {
                tmpData.pageSize = this.props.initialPageItemsPerPage;
            }

            dataToBePassed = tmpData;
        }

        if(this.state.searchFilters) {
            dataToBePassed.searchFilters = this.state.searchFilters;
        }

        const {
            serviceToFetchPagedTableData
        } = this.props;

        this.setState({
            paginationData: null,
            pendingGettingPaginationData: true,
            errorGettingPaginationData: false
        });

        serviceToFetchPagedTableData(dataToBePassed)
            .then((response) => {
                this.setState({
                    paginationData: response,
                    pendingGettingPaginationData: false,
                    errorGettingPaginationData: false
                });
            }).catch((error) => {
            console.log("Error getting Pagination Data from service: ", error);
            this.setState({
                pendingGettingPaginationData: false,
                errorGettingPaginationData: true
            });
        });
    };

    // Controls the status of modal is open by calling the parent callback
    // in order to change the isModalOpen param from props fetched from parent component
    modalToggle = (toggleValue) => {
        const {
            modalToggleCallback
        } = this.props;

        if(toggleValue === true) {
            this.setState({
                selectedTableRowData: null
            })
            this.fetchPaginatedDataFromService();
        }

        modalToggleCallback(toggleValue);
    };

    setTotalItemsPerPage = (totalItemsNo) => {
        this.setState({
            totalItemsPerPage: totalItemsNo
        });
    };

    updateLocalStateComponentWithSelectedValueChosen = (data) => {
        this.setState({
            selectedTableRowData: data
        })
    }

    updateParentComponentWithSelectedValueChosen = () => {
        const {
            selectedTableRowData
        } = this.state;

        const {
            updateParentCallback
        } = this.props;

        updateParentCallback(selectedTableRowData);
    }

    clearInputField = () => {
        const {
            updateParentCallback
        } = this.props;
        updateParentCallback(null);
    }

    updateSearchCriteriaFilters = (data) => {
        this.setState({
            searchFilters: data
        })
    }

    render() {
        const {
            fieldValue = "",
            fieldDescription,
            fieldLabel,
            disabled,
            searchButtonDisabled=false,
            placeholder,
            isModalOpen,
            searchModalTitle,
            modalSize = 'lg',
            datatableColumnsNames,
            tableRowComponent,
            isInvalid,
            errorMessage,
            searchFilterComponent,
            recordDateRowPropNameToCheckUniqueness
        } = this.props;

        const {
            paginationData,
            pendingGettingPaginationData,
            errorGettingPaginationData,
            totalItemsPerPage,
            searchFilters,
            selectedTableRowData
        } = this.state;

        return (
            <>
                <Row>
                    <Col xs={12}>
                        <Form.Group>
                            <Form.Label> {fieldLabel}</Form.Label>

                            <InputGroup>
                                <FormControl
                                    type="text"
                                    placeholder={placeholder}
                                    value={fieldValue}
                                    disabled={disabled}
                                    isInvalid={isInvalid}
                                />
                                <Button
                                    disabled={searchButtonDisabled}
                                    variant="secondary"
                                    onClick={this.clearInputField}
                                >
                                    <FontAwesomeIcon icon={faTimesCircle} className="m-0"/>
                                </Button>
                                <Button
                                    disabled={searchButtonDisabled}
                                    variant="primary"
                                    onClick={() => this.modalToggle(true)}
                                >
                                    <FontAwesomeIcon icon={faSearch} className="m-0"/>
                                </Button>

                                {/*<Form.Control.Feedback type="invalid">{errorMessage ? errorMessage : null}</Form.Control.Feedback>*/}
                            </InputGroup>

                            {isInvalid &&
                            <label className={"text-danger pt-1 pb-1"} style={{
                                fontSize: '0.875em'
                            }}>
                                {errorMessage ? errorMessage : null}
                            </label>}

                        </Form.Group>
                    </Col>
                </Row>

                <GenericModalComponent
                    isOkButtonDisabled={selectedTableRowData === null}
                    showOkButton={true}
                    showCancelButton={false}
                    okModalButtonTitle={i18next.t("generic.ok")}
                    okButtonCallback={this.updateParentComponentWithSelectedValueChosen}
                    closeModalCallback={() => this.modalToggle(false)}
                    isModalVisible={isModalOpen}
                    modalTitle={searchModalTitle}
                    isModalFullScreen={false}
                    modalSize={modalSize}
                >
                    {searchFilterComponent &&
                        <Row>
                            <Col xs={12}>
                                {React.cloneElement(searchFilterComponent, {
                                    pendingGettingRecords: pendingGettingPaginationData,
                                    filterSearchRequestCallback: this.fetchPaginatedDataFromService,
                                    paginationData: paginationData,
                                    totalItemsPerPage: totalItemsPerPage,
                                    updateSearchCriteriaFiltersCallback: this.updateSearchCriteriaFilters
                                })}
                            </Col>
                        </Row>}

                    <Row>
                        <Col xs={12}>
                            <GenericTableComponent
                                recordsData={paginationData?.elements}
                                stickyLastColumn={false}
                                pendingGettingRecordsData={pendingGettingPaginationData}
                                errorGettingRecordsData={errorGettingPaginationData}
                                tableHeaderTitles={datatableColumnsNames}
                                tableRowComponent={tableRowComponent}
                                serverSidePaginationEnabled
                                totalItemsPerPage={totalItemsPerPage}
                                setTotalItemsPerPageCallback={this.setTotalItemsPerPage}
                                paginatedData={paginationData}
                                serverSidePaginationServiceCallback={this.fetchPaginatedDataFromService}
                                onClickingTableRowCallback={this.updateLocalStateComponentWithSelectedValueChosen}
                                recordDateRowPropNameToCheckUniqueness={recordDateRowPropNameToCheckUniqueness}
                            />
                        </Col>
                    </Row>

                </GenericModalComponent>
            </>
        )
    }
}

export default GenericInputFieldWithSearchModalComponent;
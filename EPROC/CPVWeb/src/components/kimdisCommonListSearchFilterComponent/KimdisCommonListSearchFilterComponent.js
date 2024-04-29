import React from 'react';
import {Button, ButtonGroup, Col, Form, InputGroup, Row, Card} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimesCircle, faEuroSign, faCalendar, faUserTag} from "@fortawesome/free-solid-svg-icons";
import i18next from "../../translations/i18nConfigInstance";
import {withTranslation} from "react-i18next";

const initialKimdisCommonListsSearchFilters = {
    cliKey: '',
    cliVal: ''
}
type Props = {
    pendingGettingRecords: boolean,
    filterSearchRequestCallback: Function,
    totalItemsPerPage: number,
    updateSearchCriteriaFiltersCallback: Function
}

class KimdisCommonListSearchFilterComponent extends React.Component<Props> {

    state = {
        searchFilters: initialKimdisCommonListsSearchFilters
    };

    doTheSearchFilterRequest = () => {
        const {
            searchFilters
        } = this.state;

        const {
            paginatedData,
            filterSearchRequestCallback,
            totalItemsPerPage
        } = this.props;

        const tmp = {};
        tmp.searchFilters = searchFilters
        tmp.pageNumber = typeof paginatedData !== 'undefined' && paginatedData !== null  ? paginatedData?.currentPage : 0
        tmp.pageSize = totalItemsPerPage

        filterSearchRequestCallback(tmp);
    }

    onClearingSearchFilters = () => {
        this.setState({
            searchFilters: initialKimdisCommonListsSearchFilters
        })

        // Update the parent component with new search filters updates
        this.props.updateSearchCriteriaFiltersCallback(initialKimdisCommonListsSearchFilters);
    };

    onChangeCliKeyInput = (event) => {
        const {
            searchFilters,
        } = this.state;

        const tmp = Object.assign({}, searchFilters);
        tmp.cliKey = event.target.value;

        this.setState({
            searchFilters: tmp
        })

        // Update the parent component with new search filters updates
        this.props.updateSearchCriteriaFiltersCallback(tmp);
    };

    onChangeCliValInput = (event) => {
        const {
            searchFilters,
        } = this.state;

        const tmp = Object.assign({}, searchFilters);
        tmp.cliVal = event.target.value;

        this.setState({
            searchFilters: tmp
        })

        // Update the parent component with new search filters updates
        this.props.updateSearchCriteriaFiltersCallback(tmp);
    };

    render() {

        // Search Inputs state
        const {
            searchFilters: {
                cliKey,
                cliVal
            }
        } = this.state;

        const {
            pendingGettingRecords,
        } = this.props;

        return (
            <Card border="light" className="bg-white shadow-sm mb-4 mt-1">
                <Card.Body>

                    <div className="justify-content-center align-items-center">

                        <Row>
                            <Col xs={12} md={12}>
                                <h5 style={{color: "#283d61"}}>{i18next.t("generic.searchFiltersTitle")}</h5>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={4} md={4}>
                                <Form.Group>
                                    <Form.Label>{i18next.t("commonLists.cliKey")}</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faSearch}/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            disabled={pendingGettingRecords}
                                            type="text"
                                            value={cliKey}
                                            onChange={this.onChangeCliKeyInput}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col xs={4} md={4}>
                                <Form.Group>
                                    <Form.Label>{i18next.t("commonLists.cliVal")}</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faSearch}/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            disabled={pendingGettingRecords}
                                            type="text"
                                            value={cliVal}
                                            onChange={this.onChangeCliValInput}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>

                    <div className=" h-100 justify-content-center align-items-center mt-4">
                        <Row>
                            <Col xs={12}>
                                <ButtonGroup>
                                    <Button
                                        disabled={pendingGettingRecords}
                                        variant="warning"
                                        className="text-white"
                                        onClick={this.onClearingSearchFilters}

                                    >
                                        <FontAwesomeIcon icon={faTimesCircle} className="me-2"/>
                                        <span>{i18next.t("generic.clearSearchFilter")}</span>
                                    </Button>

                                    <Button
                                        disabled={pendingGettingRecords}
                                        variant="primary"
                                        className="text-white"
                                        onClick={this.doTheSearchFilterRequest}

                                    >
                                        <FontAwesomeIcon icon={faSearch} className="me-2"/>
                                        <span>{i18next.t("generic.search")}</span>
                                    </Button>

                                </ButtonGroup>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default withTranslation()(KimdisCommonListSearchFilterComponent);

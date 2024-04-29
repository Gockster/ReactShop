import React from 'react';
import {Row, Card, Table, Nav, Pagination, InputGroup, Form} from "@themesberg/react-bootstrap";
import {BeatLoader} from "react-spinners";
import LottieAnimationComponent from "../lottieAnimationComponent/LottieAnimationComponent";
import lottieAnimationSourceFile from '../../assets/lottieAnimations/notFoundAnimations/629-empty-box'
import i18next from "../../translations/i18nConfigInstance";
import GenericMaxRecordsPerPageComponent from "./GenericMaxRecordsPerPageComponent";
import paginationUtils from "../../utils/paginationUtils";

const constructTableHeaderTitles = (tableHeaderTitles) => {
    return tableHeaderTitles.map((value, index) => {
        return (
            <th className="border-bottom" style={{fontSize: 13, fontWeight: 900,}} key={`row-${index}`}>{value}</th>
        )
    })
};

type Props = {
    recordsData: Array,
    stickyLastColumn: boolean,
    tableHeaderTitles: Array,
    tableRowComponent: any,
    pendingGettingRecordsData: boolean,
    errorGettingRecordsData: boolean,
    serverSidePaginationEnabled: boolean,
    paginatedData: any,
    serverSidePaginationServiceCallback: Function,
    totalItemsPerPage: number,
    setTotalItemsPerPageCallback: Function,
    onClickingTableRowCallback: Function,
    recordDateRowPropNameToCheckUniqueness: string
}

class GenericTableComponent extends React.Component<Props> {
    state = {
        selectedTableRowData: null
    }

    onSelectingTableRowComponent = (data) => {
        const {
            onClickingTableRowCallback
        } = this.props;

        this.setState({
            selectedTableRowData: data
        })

        onClickingTableRowCallback(data)
    }

    checkIsSelected = (rowRecordData) => {
        const {
            selectedTableRowData
        } = this.state;

        const {
            recordDateRowPropNameToCheckUniqueness
        } = this.props;

        let isSelected = false;

        if(recordDateRowPropNameToCheckUniqueness
            && selectedTableRowData !== null
            && selectedTableRowData[recordDateRowPropNameToCheckUniqueness] !== null
            && rowRecordData[recordDateRowPropNameToCheckUniqueness] !== null
            && selectedTableRowData[recordDateRowPropNameToCheckUniqueness] === rowRecordData[recordDateRowPropNameToCheckUniqueness]) {
            isSelected = true;
        }

        return isSelected;
    }

    render() {
        const {
            pendingGettingRecordsData,
            errorGettingRecordsData,
            recordsData,
            tableHeaderTitles,
            tableRowComponent,
            stickyLastColumn = true,
            serverSidePaginationEnabled = false,
            paginatedData,
            serverSidePaginationServiceCallback,
            setTotalItemsPerPageCallback,
            totalItemsPerPage,
        } = this.props;

        return (
            <>
                <Card border="light" className="table-wrapper table-responsive shadow-sm">
                    <Card.Body
                        className={"pt-0 stickyLastColumn " + (stickyLastColumn === true ? "" : "nonActionDatatable")}>

                        <>

                            <Table hover className="user-table align-items-center">

                                <thead className="thead-light">
                                <tr>
                                    {constructTableHeaderTitles(tableHeaderTitles)}
                                </tr>
                                </thead>

                                {!pendingGettingRecordsData && !errorGettingRecordsData && recordsData && recordsData.length > 0 &&
                                    <tbody>
                                    {recordsData.map((rowRecordData, index) =>
                                        React.cloneElement(tableRowComponent, {
                                            key: index,
                                            recordData: rowRecordData,
                                            rowIndex: index,
                                            isSelected: this.checkIsSelected(rowRecordData),
                                            onClickingTableRowCallback: this.onSelectingTableRowComponent
                                        })
                                    )}
                                    </tbody>
                                }
                            </Table>

                            {pendingGettingRecordsData &&
                                <div className="d-flex justify-content-center pt-5">
                                    <BeatLoader
                                        size={35}
                                        color={"#4A5073"}
                                        loading={pendingGettingRecordsData}
                                    />
                                </div>}

                            {!pendingGettingRecordsData && (errorGettingRecordsData || (recordsData && recordsData.length === 0)) &&
                                <div className={"centerContent"}>
                                    <Row>
                                        {!pendingGettingRecordsData && (errorGettingRecordsData || (recordsData && recordsData.length === 0)) &&
                                            <div className="pt-1">
                                                <Row>
                                                    <LottieAnimationComponent
                                                        animationHeight={150}
                                                        animationWidth={150}
                                                        animationSourceFile={lottieAnimationSourceFile}/>
                                                </Row>

                                                <Row>
                                                    <div className={'customBadgeError'}>
                                                        {i18next.t("generic.noDataFound")}
                                                    </div>
                                                </Row>
                                            </div>}
                                    </Row>
                                </div>}

                        </>
                    </Card.Body>
                </Card>

                {serverSidePaginationEnabled &&
                    <Card>
                        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                            <Nav>
                                <GenericMaxRecordsPerPageComponent
                                    isDisabled={pendingGettingRecordsData || !recordsData || recordsData.length < 1}
                                    totalItemsPerPage={totalItemsPerPage}
                                    setTotalItemsPerPageCallback={setTotalItemsPerPageCallback}
                                    serverSidePaginationServiceCallback={serverSidePaginationServiceCallback}
                                    totalItemsSelectionList={paginationUtils.paginationTotalItemsPerPage()}
                                />
                            </Nav>
                            <Nav>
                                <Pagination className="mb-2 mb-lg-0">

                                    <Pagination.First
                                        disabled={paginatedData?.currentPage === 0 || pendingGettingRecordsData || !recordsData || recordsData.length < 1}
                                        onClick={() => serverSidePaginationServiceCallback({
                                            pageNumber: 0,
                                            pageSize: totalItemsPerPage
                                        })}
                                    >
                                        {i18next.t("generic.pagination.first")}
                                    </Pagination.First>

                                    <Pagination.Prev
                                        disabled={paginatedData?.currentPage === 0 || pendingGettingRecordsData || !recordsData || recordsData.length < 1}
                                        onClick={() => serverSidePaginationServiceCallback({
                                            pageNumber: paginatedData?.currentPage > 0 ? paginatedData?.currentPage - 1 : 0,
                                            pageSize: totalItemsPerPage
                                        })}
                                    >
                                        {i18next.t("generic.pagination.previous")}
                                    </Pagination.Prev>

                                    {[...Array(paginatedData?.totalPages)].map((x, index) => {

                                        if (index >= paginatedData?.currentPage - 5 && index < paginatedData?.currentPage + 6) {
                                            return (
                                                <Pagination.Item
                                                    key={index}
                                                    disabled={pendingGettingRecordsData || !recordsData || recordsData.length < 1}
                                                    active={paginatedData?.currentPage === index}
                                                    onClick={() => serverSidePaginationServiceCallback({ pageNumber: index, pageSize: totalItemsPerPage })}
                                                >
                                                    {index + 1}
                                                </Pagination.Item>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })}

                                    <Pagination.Next
                                        disabled={paginatedData?.currentPage === paginatedData?.totalPages - 1 || pendingGettingRecordsData || !recordsData || recordsData.length < 1}
                                        onClick={() => serverSidePaginationServiceCallback({
                                            pageNumber: paginatedData?.currentPage < paginatedData?.totalPages ? paginatedData?.currentPage + 1 : 1,
                                            pageSize: totalItemsPerPage
                                        })}
                                    >
                                        {i18next.t("generic.pagination.next")}
                                    </Pagination.Next>

                                    <Pagination.Last
                                        disabled={paginatedData?.currentPage === paginatedData?.totalPages - 1 || pendingGettingRecordsData || !recordsData || recordsData.length < 1}
                                        onClick={() => serverSidePaginationServiceCallback({
                                            pageNumber: paginatedData?.totalPages - 1,
                                            pageSize: totalItemsPerPage
                                        })}
                                    >
                                        {i18next.t("generic.pagination.last")}
                                    </Pagination.Last>

                                </Pagination>
                            </Nav>
                            <small className="fw-bold">
                                {i18next.t("generic.pagination.totalElements", {
                                    totalElements: paginatedData?.totalElements
                                })}
                            </small>

                            <small className="fw-bold">
                                {i18next.t("generic.pagination.pageIndicatorOfTotalPages", {
                                    currentPageNumber: paginatedData?.currentPage + 1,
                                    totalPagesNumber: paginatedData?.totalPages
                                })}
                            </small>
                        </Card.Footer>
                    </Card>}

            </>
        )
    }
}

export default GenericTableComponent;

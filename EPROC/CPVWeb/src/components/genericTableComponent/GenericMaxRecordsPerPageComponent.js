import React from 'react';
import {Form, InputGroup} from "@themesberg/react-bootstrap";
import i18next from "../../translations/i18nConfigInstance";
import paginationUtils from "../../utils/paginationUtils";

type Props = {
    isDisabled: boolean,
    totalItemsPerPage: number,
    totalItemsSelectionList: Array,
    setTotalItemsPerPageCallback: Function,
    serverSidePaginationServiceCallback: Function
}

class GenericMaxRecordsPerPageComponent extends React.Component<Props> {

    setTotalItemsPerPageHandler = (event) => {
        const chosenValue = event.target.value;

        // Calls parent component to update the total items per page
        this.props.setTotalItemsPerPageCallback(chosenValue);

        this.props.serverSidePaginationServiceCallback({
            pageNumber: 0,
            pageSize: chosenValue
        });
    };

    render() {
        const {
            isDisabled,
            totalItemsPerPage,
            totalItemsSelectionList
        } = this.props;

        return (
            <InputGroup>
                <InputGroup.Text>{i18next.t("generic.pagination.totalItemsPerPage")}</InputGroup.Text>
                <Form.Select
                    disabled={isDisabled}
                    value={totalItemsPerPage}

                    onChange={event => this.setTotalItemsPerPageHandler(event)}>
                    {totalItemsSelectionList.map((item) => {
                        return (
                            <option
                                key={item}
                                value={item}
                                label={item}
                            >
                                {item}
                            </option>
                        );
                    })}
                </Form.Select>
            </InputGroup>
        )
    }
}

export default GenericMaxRecordsPerPageComponent;
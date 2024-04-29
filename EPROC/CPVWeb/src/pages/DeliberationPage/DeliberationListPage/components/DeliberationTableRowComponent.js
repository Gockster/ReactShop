import deliberationService from '_services/deliberationServices/deliberationService';
import React from 'react';
import { withRouter } from "react-router-dom";
import { convertDateToLocaleDateTime } from 'utils/dateTimeUtils';
import TableFurtherActionsComponent from "../../../../components/genericTableComponent/TableFurtherActionsComponent";
import { PROTECTED_MODE, PUBLIC_MODE } from "../../../../routing/routes";

type dto = {
    dbid: number,
    closed: number,
    endDate: Date,
    lastUpdateDate: Date,
    organization: string,
    publicationDate: Date,
    referenceNumber: string,
    title: string,
    commentsCount: number,
    description: string,
    hasFile: boolean,
    isEditDisabled: boolean,
    isEditShown: boolean,
    commentsAcceptedCount: number
}

type Props = {
    recordData: dto,
    mode: string
}

class DeliberationTableRowComponent extends React.Component<Props> {

    onViewActionPress = (deliberationId) => {
        const {
            history,
            isProtectedMode
        } = this.props;
        const pathname = '/deliberation/' + (isProtectedMode ? PROTECTED_MODE : PUBLIC_MODE) + '/view/' + deliberationId;

        deliberationService.paginationStorage.setReturning(true);
        //history.push({
        //    pathname: "deliberation-search?state=1"
        //
        //})
        //
        history.push({
            pathname: pathname
        })

    };

    onEditActionPress = (deliberationId) => {
        const {
            history
        } = this.props;
        history.push({
            pathname: '/deliberation/' + PROTECTED_MODE + '/edit/' + deliberationId
        })
    };

    render() {
        return (
            <tr>
                <td>
                    <span className="fw-normal">
                        {this.props.recordData.title}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {convertDateToLocaleDateTime(this.props.recordData.publicationDate)}

                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {this.props.recordData.lastUpdateDate ? convertDateToLocaleDateTime(this.props.recordData.lastUpdateDate) : "-"}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {convertDateToLocaleDateTime(this.props.recordData.endDate)}

                    </span>
                </td>

                <td>
                    <span className="fw-normal">
                        {this.props.recordData.referenceNumber}

                    </span>
                </td>

                <td>
                    <span className="fw-normal">
                        {this.props.recordData.commentsCount}
                    </span>


                </td>

                <td>
                    <span className="fw-normal">
                        {this.props.recordData.commentsAcceptedCount}
                    </span>
                </td>



                <td>
                    <TableFurtherActionsComponent
                        isViewDisabled={false}
                        isEditDisabled={this.props.isEditDisabled}
                        isEditShown={!this.props.isEditShown}
                        isDeleteDisabled={false}
                        isSendMessageActionDisabled={true}
                        viewRowItemCallback={() => this.onViewActionPress(this.props.recordData.dbid)}
                        editRowItemCallback={() => this.onEditActionPress(this.props.recordData.dbid)}
                        sendMessageRowItemCallback={null}
                        deleteRowItemCallback={null} />
                </td>
            </tr>
        )
    }
}

export default withRouter(DeliberationTableRowComponent);

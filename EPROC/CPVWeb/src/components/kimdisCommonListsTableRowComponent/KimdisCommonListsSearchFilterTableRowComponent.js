import React from 'react';
import {withRouter} from "react-router-dom";

type Props = {
    onUpdateParentComponent: Function
}

class KimdisCommonListsSearchFilterTableRowComponent extends React.Component<Props> {

    onChooseRowItem = () => {
        const {
            onClickingTableRowCallback,
            recordData,
            rowIndex
        } = this.props;
        onClickingTableRowCallback(recordData);
    };

    render() {
        const {
            recordData: {
                cliKey,
                cliVal,
                cliId
            },
            isSelected
        } = this.props;

        return (
            <tr onClick={this.onChooseRowItem} className={isSelected ? "selectedTableRow" : ""}>
                <td>
                    <span className="fw-normal">
                      {cliId}
                    </span>
                </td>
                <td>
                  <span className="fw-normal">
                      {cliKey}
                  </span>
                </td>
                <td>
                  <span className="fw-normal">
                      {cliVal}
                  </span>
                </td>
            </tr>
        )
    }
}

export default withRouter(KimdisCommonListsSearchFilterTableRowComponent);

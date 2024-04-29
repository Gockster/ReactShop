import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import i18next from "../../../translations/i18nConfigInstance";
import {BeatLoader} from "react-spinners";

export const PendingSaveFormPromptComponent = ({showPendingSaveFormPrompt}) => {
    return(
        <div className={"sweetAlertCustomStyles"}>
            <SweetAlert
                show={showPendingSaveFormPrompt}
                showCancel={false}
                showConfirm={false}
                onConfirm={() => {}}
                title={i18next.t("generic.pleaseWait")}
            >
                <div className="d-flex align-content-center justify-content-center pt-5">
                    <BeatLoader
                        size={35}
                        color={"#4A5073"}
                        loading={showPendingSaveFormPrompt}
                    />
                </div>
            </SweetAlert>
        </div>
    )
};

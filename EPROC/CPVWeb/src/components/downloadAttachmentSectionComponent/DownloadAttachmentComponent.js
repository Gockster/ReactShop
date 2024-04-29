import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import React from 'react';
import i18next from "../../translations/i18nConfigInstance";

type Props = {
	isDisabledDownloadButton: boolean,
	base64EncodedFile: string,
	fileId: BigInteger
}

class DownloadAttachmentComponent extends React.Component<Props> {

	downloadFile = () => {

	}

	render() {
		const {
			isDisabledDownloadButton,
			type,
			fileId
		} = this.props;

		return (
			<Row>
				<Col xs={12}>
					<Card border="light" className="shadow-sm mb-4 mt-1">

						<Card.Header>
							<h4>{i18next.t('generic.attachment')}</h4>
						</Card.Header>

						<Card.Body>
							<div className=" h-100 justify-content-center align-items-center mt-4">

								<Row>
									<Col xs={12} xl={8}>

										<Button
											disabled={isDisabledDownloadButton}
											// variant="primary"
											className="primary"
											onClick={this.downloadFile}

										>
											<FontAwesomeIcon icon={faDownload} className="me-2" />
											<a href={
													process.env.REACT_APP_WEB_API_BASE+"/file/" + fileId
												} rel="noreferrer" target="_blank" download>

												<span>{i18next.t("generic.download")}</span>
											</a>
										</Button>

									</Col>
								</Row>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		);
	}

}

export default DownloadAttachmentComponent;
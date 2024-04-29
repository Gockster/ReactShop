import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Dropdown } from "@themesberg/react-bootstrap";
import React from "react";
import i18next from "../../translations/i18nConfigInstance";
import NavBarMenu from "./NavBarMenu";

class ChooseLanguageNavComponent extends React.Component<Props> {
	state = {
		language: localStorage.setItem('language', "el")
	}

	componentDidMount() {
		const storedLanguage = localStorage.getItem('language');
		if (storedLanguage) {
			this.setState({
				language: storedLanguage
			});
		}
	}

	handleLangChange = (lang) => {
		this.setState({
			language: lang
		});
		localStorage.setItem('language', lang);
		i18next.changeLanguage(lang);
	};

	render() {
		const {
			language
		} = this.state;

		return (
			<Dropdown drop={"down"} as={ButtonGroup} className="me-2 mb-2 hidden-print">
				<Button disabled size="md" variant="tertiary">
					{language === 'en' ? i18next.t("lang.english") : language === 'el' ? i18next.t("lang.greek") : i18next.t("lang.english")}
				</Button>

				<Dropdown.Toggle split variant="tertiary">
					<FontAwesomeIcon icon={faAngleDown} className="dropdown-arrow" />
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item disabled={language === 'el'}
						onClick={() => this.handleLangChange('el')}>
						{i18next.t("lang.greek")}
					</Dropdown.Item>
					<Dropdown.Item disabled={language === 'en'}
						onClick={() => this.handleLangChange('en')}>
						{i18next.t("lang.english")}
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

		)
	}

}

export default ChooseLanguageNavComponent;
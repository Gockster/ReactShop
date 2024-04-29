import DateFnsUtils from '@date-io/date-fns';
import { createTheme } from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import { KeyboardDatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from "@material-ui/styles";
import { el, enUS } from "date-fns/locale";
import i18next from 'i18next';
import React from 'react';

const defaultMaterialTheme = createTheme({
	palette: {
		primary: indigo,
	},
	overrides: {
		MuiFormControl: {
			root: {
				border: 0,
				margin: 0,
				display: 'inline-flex',
				padding: 0,
				position: "inherit",
				minWidth: 0,
				flexDirection: 'column',
				verticalAlign: 'top',
			}
		},
		MuiInputBase: {
			input: {
				height: "inherit",
			}
		},
		MuiOutlinedInput: {
			root: {
				display: '',
				width: '100%',
				// padding:'0.55rem 0.75rem',
				fontSize: '1rem',
				fontWeight: 400,
				lineHeight: 1.5,
				//border: '0.0625rem solid #d1d7e0',
				borderRadius: '0.5rem'
			},
			input: {
				fontSize: '1rem',
				fontWeight: 400,
				lineHeight: 1.5,
				padding: '0.55rem 0.75rem',
				// border: '0.0625rem solid #d1d7e0',
				// borderRadius: '0.5rem'
			}
		}

	}
});

/**
 * Generic component for Date time picker using Material <br/>
 * parameters onChange, value, label
 * @param {any} props 
 * @returns 
 */
export function GenericMaterialDatePicker(props) {

	const {
		label,
		value,
		onChange,
		showInlineError,
		errorMessage,
		disabled,
		readOnly,
		outlined = true,
		dateTimePicker = false
	} = props;

	return (
		<MuiPickersUtilsProvider locale={i18next.language === "el" ? el : enUS} utils={DateFnsUtils} >
			<ThemeProvider theme={defaultMaterialTheme}>
				<div className={"pt-0 pb-0"}>

					<label className={`${errorMessage ? 'text-danger' : 'text-primary'} pt-0 pb-1`}>
						{label ? label : null}
					</label>
					{dateTimePicker === true &&
						<KeyboardDateTimePicker
							shrink={0}
							readOnly={readOnly}
							disabled={disabled}
							inputVariant={outlined ? "outlined" : "standard"}
							showTodayButton
							value={value}
							onChange={(value) => {
								onChange(value)
							}}
							format="dd/MM/yyyy HH:mm"
						/>}
					{dateTimePicker === false &&
						<KeyboardDatePicker
							shrink={0}
							readOnly={readOnly}
							disabled={disabled}
							inputVariant={outlined ? "outlined" : "standard"}
							showTodayButton={false}
							value={value}
							onChange={(value) => {
								onChange(value)
							}}
							format="dd/MM/yyyy HH:mm:ss"
						/>}
					{showInlineError &&
						<label className={"text-danger pt-1 pb-1"} style={{
							fontSize: '0.875em'
						}}>
							{errorMessage ? errorMessage : null}
						</label>}
				</div>
			</ThemeProvider>
		</MuiPickersUtilsProvider>
	);
}

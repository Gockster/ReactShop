import Ajv from 'ajv';
import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';
import i18next from "../translations/i18nConfigInstance";

const ajv = new Ajv({allErrors: true, useDefaults: true, $data: true});
ajv.addKeyword('uniforms');


/**
 * Convert any field typeof Date into String
 * @param body
 * @returns {*}
 */
export function handleDatesToStrings(body: any) {
    if (body === null || body === undefined || typeof body !== "object")
        return body;

    for (const key of Object.keys(body)) {
        let value = body[key];

        if(Object.prototype.toString.call(body[key]) === '[object Date]') {
            body[key] = body[key].toISOString();
        } else if (typeof value === "object") {
            handleDatesToStrings(value);
        }
    }
    return body;
}

function createValidator(schema) {
    const validator = ajv.compile(schema);

    return (model) => {

        // Convert any Date fields into String
        let tempModel = Object.assign({}, model);
        tempModel = handleDatesToStrings(tempModel);

        validator(tempModel);

        if(validator.errors?.length) {
            const validatorError = {
                details: validator.errors
            };
            return validatorError;
        } else {
            return null;
        }
    };
}

const schemaValidator = (schema) => {
    return createValidator(schema);
};

export const createUniformSchema = (schema) => {
    return new JSONSchemaBridge(schema, schemaValidator(schema));
};
import {connectField} from "uniforms/es6";
import {GenericMaterialDatePicker} from "./GenericMaterialDatePicker";

/**
 * Uniforms custom date picker to be used in date fields (if chosen)
 * In order to fetch AuthField properties onto custom component
 * we have to use the connectField HOC in order to pass these props
 * and always be available for us (like validation errors, onChange, value etc)
 * @type {ConnectedField<any, Props["value"]>}
 */
export const UniformsMaterialDatePicker = connectField(GenericMaterialDatePicker);
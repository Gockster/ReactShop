/**
 * Finds an object of array when meeting the condition provided
 * Props provided as string and looked up as object[key]
 * @param arrayToLookUp The array to look up for data
 * @param arrayPropToBeChecked The array object prop to match criteria
 * @param arrayPropToBeReturned The array prop to be returned
 * @param propToLookUpFor The property to be checked against array object prop
 * @returns {*}
 */
export const mapType = (arrayToLookUp, arrayPropToBeChecked, arrayPropToBeReturned, propToLookUpFor) => {
    const found = arrayToLookUp.find(element => element[arrayPropToBeChecked] === propToLookUpFor);
    if(found) {
        const valueToBeReturned = found[arrayPropToBeReturned];
        if(valueToBeReturned) {
            return valueToBeReturned;
        } else {
            return null;
        }
    } else {
        return null;
    }
};
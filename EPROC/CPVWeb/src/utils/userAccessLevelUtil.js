const LOCAL_STORAGE_AUTH_USER_DATA = process.env.REACT_APP_AUTH_USER_DATA;
const ROLE_USER = process.env.REACT_APP_AUTH_ROLE_USER;
const ROLE_ADMIN = process.env.REACT_APP_AUTH_ROLE_ADMIN;

/**
 * Retrieves user data from local storage
 * @returns {any}
 */
const getUserDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER_DATA))
};

/**
 * Checks if a Role exists in User Roles from local storage
 * @param roleToBeChecked
 * @returns {boolean}
 */
const checkUserRolesForSpecificRole = (roleToBeChecked) => {
    const userDataFromLocalStorage = getUserDataFromLocalStorage();
    if(userDataFromLocalStorage.roles && userDataFromLocalStorage.roles.length > 0) {
        const found = userDataFromLocalStorage.roles.findIndex(item => item.name === roleToBeChecked);
        return found !== -1;
    } else {
        return false;
    }
};

/**
 * Checks is at least one Route Permitted Role exists in a User's Roles from localstorage
 * @param permittedRouteRolesArray
 * @param userRolesArray
 * @returns {boolean}
 */
const checkPermittedRolesForRouteAgainstUserRoles = (permittedRouteRolesArray, userRolesArray) => {
    let userIsPermittedToSeeRouteContent = false;
    permittedRouteRolesArray.forEach((permittedRouteRoleItem, permittedRouteRoleIndex) => {
        userRolesArray.forEach((userRoleItem, userRoleIndex) => {
            if(permittedRouteRoleItem === userRoleItem.name) {
                userIsPermittedToSeeRouteContent = true;
            }
        })
    });
    return userIsPermittedToSeeRouteContent;
};

const userAccessLevelUtil = {

    // Checks if simple User only if ROLE_USER is assigned AND NOT the ROLE_ADMIN
    isUser: function() {
        const isUser = checkUserRolesForSpecificRole(ROLE_USER);
        //const isAdmin = checkUserRolesForSpecificRole(ROLE_ADMIN);
        return isUser;
    },

    // Checks if Admin only if ROLE_ADMIN is assigned
    isAdmin: function() {
        const isAdmin = checkUserRolesForSpecificRole(ROLE_ADMIN);
        return isAdmin;
    },

    checkPermittedRolesForRouteAgainstUserRoles,
    getUserDataFromLocalStorage
};

export default userAccessLevelUtil;

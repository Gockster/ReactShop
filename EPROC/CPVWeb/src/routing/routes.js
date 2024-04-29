
export const PUBLIC_MODE = 'public';
export const PROTECTED_MODE = 'protected';
export const VIEW_ACTION = 'view';
export const EDIT_ACTION = 'edit';
export const CREATE_ACTION = 'new';


export const Routes = {
    // Home Page
    HomePage: { path: "/" },
    
    //Deliberation Pages
    DeliberationListPageRouteDefault: { path: '/deliberation-search' },
    DeliberationListPageRoute: { path: '/deliberation-search/:secMode?', aclLevel: [{mode: PROTECTED_MODE}] },
    DeliberationFormRoute: { path: '/deliberation/:secMode/:action/:deliberationID', aclLevel: [{action: VIEW_ACTION, mode: PUBLIC_MODE}, {action: VIEW_ACTION, mode: PROTECTED_MODE}, {action: EDIT_ACTION, mode: PROTECTED_MODE}] },
    DeliberationFormRouteNew: { path: '/deliberation/:secMode/:action', aclLevel: [{action: CREATE_ACTION, mode: PROTECTED_MODE}] },
    NotFound: { path: "/404" },
    
};
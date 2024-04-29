import React from 'react';
import {PROTECTED_MODE, PUBLIC_MODE} from "../../routing/routes";

class GenericFormModule extends React.Component {
    render() {
        const urlParams = this.props.match.params;

        const {
            action,
            secMode
        } = urlParams;

        const childrenWithProps = React.Children.map(this.props.children, child => {
            // checking isValidElement is the safe way and avoids a typescript error too
            if (React.isValidElement(child)) {
                return React.cloneElement(
                    child,
                    {
                        isCreateMode: action === 'new',
                        isEditMode: action === 'edit',
                        isViewMode: action === 'view',
                        isPublicMode: secMode === PUBLIC_MODE,
                        isProtectedMode: secMode === PROTECTED_MODE,
                        urlParams: urlParams,
                });
            }
            return child;
        });

        return childrenWithProps;
    }
}

export default GenericFormModule;
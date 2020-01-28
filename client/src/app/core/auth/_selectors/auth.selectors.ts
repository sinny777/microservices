// NGRX
import { createSelector } from '@ngrx/store';
// Lodash
import { each, find, some } from 'lodash';
// Selectors
// import { selectAllRoles } from './role.selectors';
import { selectAllPermissions } from './permission.selectors';
// Models
import { Role } from '../_models/role.model';
import { Permission } from '../_models/permission.model';

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
    selectAuthState,
    auth => auth.loggedIn
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);


export const currentAuthToken = createSelector(
    selectAuthState,
    auth => auth.authToken
);

export const isUserLoaded = createSelector(
    selectAuthState,
    auth => {
      return auth.isUserLoaded;
    }
);

export const currentUser = createSelector(
    selectAuthState,
    auth => auth.user
);

export const currentUserRoles = createSelector(
    currentUser,
    user => {
        if (!user) {
            return [];
        }
        return user.roles;
    }
);

export const currentUserPermissionsIds = createSelector(
    currentUserRoles,
    (userRoles: Role[]) => {
        const result = getPermissionsIdsFrom(userRoles);
        return result;
    }
);

export const checkHasUserPermission = (permissionId: string) => createSelector(
    currentUserPermissionsIds,
    (ids: string[]) => {
        return ids.some(id => id === permissionId);
    }
);

export const checkHasUserPermissionByName = (permissionName: string) => createSelector(
    currentUserPermissions,
    (permissions: Permission[]) => {
        const userPermission = find(permissions, elem => elem.name === permissionName);
        if (userPermission) {
            return true;
        } else {
          return false;
        }
    }
);

export const currentUserPermissions = createSelector(
    currentUserPermissionsIds,
    selectAllPermissions,
    (permissionIds: string[], allPermissions: Permission[]) => {
        const result: Permission[] = [];
        each(permissionIds, id => {
            const userPermission = find(allPermissions, elem => elem.id === id);
            if (userPermission) {
                result.push(userPermission);
            }
        });
        return result;
    }
);

function getPermissionsIdsFrom(userRoles: Role[] = []): string[] {
    const result: string[] = [];
    each(userRoles, (_role: Role) => {
        each(_role.permissions, id => {
            if (!some(result, _id => _id === id)) {
                result.push(id);
            }
        });
    });
    return result;
}

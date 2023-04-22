/* tslint:disable */
/* eslint-disable */
/**
 * Codebook Api
 * A simple api
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';

/**
 * 
 * @export
 * @interface AuthorizationUser
 */
export interface AuthorizationUser {
    /**
     * 
     * @type {number}
     * @memberof AuthorizationUser
     */
    readonly id: number;
    /**
     * 
     * @type {Date}
     * @memberof AuthorizationUser
     */
    lastLogin?: Date | null;
    /**
     * Designates that this user has all permissions without explicitly assigning them.
     * @type {boolean}
     * @memberof AuthorizationUser
     */
    isSuperuser?: boolean;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @type {string}
     * @memberof AuthorizationUser
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof AuthorizationUser
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthorizationUser
     */
    lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthorizationUser
     */
    email?: string;
    /**
     * Designates whether the user can log into this admin site.
     * @type {boolean}
     * @memberof AuthorizationUser
     */
    isStaff?: boolean;
    /**
     * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
     * @type {boolean}
     * @memberof AuthorizationUser
     */
    isActive?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof AuthorizationUser
     */
    dateJoined?: Date;
    /**
     * The groups this user belongs to. A user will get all permissions granted to each of their groups.
     * @type {Array<number>}
     * @memberof AuthorizationUser
     */
    groups?: Array<number>;
    /**
     * Specific permissions for this user.
     * @type {Array<number>}
     * @memberof AuthorizationUser
     */
    userPermissions?: Array<number>;
}

/**
 * Check if a given object implements the AuthorizationUser interface.
 */
export function instanceOfAuthorizationUser(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "username" in value;

    return isInstance;
}

export function AuthorizationUserFromJSON(json: any): AuthorizationUser {
    return AuthorizationUserFromJSONTyped(json, false);
}

export function AuthorizationUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthorizationUser {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'lastLogin': !exists(json, 'last_login') ? undefined : (json['last_login'] === null ? null : new Date(json['last_login'])),
        'isSuperuser': !exists(json, 'is_superuser') ? undefined : json['is_superuser'],
        'username': json['username'],
        'firstName': !exists(json, 'first_name') ? undefined : json['first_name'],
        'lastName': !exists(json, 'last_name') ? undefined : json['last_name'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'isStaff': !exists(json, 'is_staff') ? undefined : json['is_staff'],
        'isActive': !exists(json, 'is_active') ? undefined : json['is_active'],
        'dateJoined': !exists(json, 'date_joined') ? undefined : (new Date(json['date_joined'])),
        'groups': !exists(json, 'groups') ? undefined : json['groups'],
        'userPermissions': !exists(json, 'user_permissions') ? undefined : json['user_permissions'],
    };
}

export function AuthorizationUserToJSON(value?: AuthorizationUser | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'last_login': value.lastLogin === undefined ? undefined : (value.lastLogin === null ? null : value.lastLogin.toISOString()),
        'is_superuser': value.isSuperuser,
        'username': value.username,
        'first_name': value.firstName,
        'last_name': value.lastName,
        'email': value.email,
        'is_staff': value.isStaff,
        'is_active': value.isActive,
        'date_joined': value.dateJoined === undefined ? undefined : (value.dateJoined.toISOString()),
        'groups': value.groups,
        'user_permissions': value.userPermissions,
    };
}

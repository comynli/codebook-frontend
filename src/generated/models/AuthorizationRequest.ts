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
/**
 * 
 * @export
 * @interface AuthorizationRequest
 */
export interface AuthorizationRequest {
    /**
     * 
     * @type {string}
     * @memberof AuthorizationRequest
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof AuthorizationRequest
     */
    password: string;
}

/**
 * Check if a given object implements the AuthorizationRequest interface.
 */
export function instanceOfAuthorizationRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function AuthorizationRequestFromJSON(json: any): AuthorizationRequest {
    return AuthorizationRequestFromJSONTyped(json, false);
}

export function AuthorizationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthorizationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': json['username'],
        'password': json['password'],
    };
}

export function AuthorizationRequestToJSON(value?: AuthorizationRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
        'password': value.password,
    };
}


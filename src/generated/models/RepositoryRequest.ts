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
 * @interface RepositoryRequest
 */
export interface RepositoryRequest {
    /**
     * 
     * @type {string}
     * @memberof RepositoryRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof RepositoryRequest
     */
    gitUrl?: string;
}

/**
 * Check if a given object implements the RepositoryRequest interface.
 */
export function instanceOfRepositoryRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function RepositoryRequestFromJSON(json: any): RepositoryRequest {
    return RepositoryRequestFromJSONTyped(json, false);
}

export function RepositoryRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): RepositoryRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'gitUrl': !exists(json, 'git_url') ? undefined : json['git_url'],
    };
}

export function RepositoryRequestToJSON(value?: RepositoryRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'git_url': value.gitUrl,
    };
}


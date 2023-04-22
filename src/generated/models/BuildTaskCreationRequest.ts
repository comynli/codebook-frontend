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
 * @interface BuildTaskCreationRequest
 */
export interface BuildTaskCreationRequest {
    /**
     * 
     * @type {string}
     * @memberof BuildTaskCreationRequest
     */
    version: string;
    /**
     * 
     * @type {string}
     * @memberof BuildTaskCreationRequest
     */
    commitSha: string;
}

/**
 * Check if a given object implements the BuildTaskCreationRequest interface.
 */
export function instanceOfBuildTaskCreationRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "version" in value;
    isInstance = isInstance && "commitSha" in value;

    return isInstance;
}

export function BuildTaskCreationRequestFromJSON(json: any): BuildTaskCreationRequest {
    return BuildTaskCreationRequestFromJSONTyped(json, false);
}

export function BuildTaskCreationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): BuildTaskCreationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': json['version'],
        'commitSha': json['commit_sha'],
    };
}

export function BuildTaskCreationRequestToJSON(value?: BuildTaskCreationRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
        'commit_sha': value.commitSha,
    };
}


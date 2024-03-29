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
 * @interface BuildSettingRequest
 */
export interface BuildSettingRequest {
    /**
     * 
     * @type {string}
     * @memberof BuildSettingRequest
     */
    repository: string;
    /**
     * 
     * @type {string}
     * @memberof BuildSettingRequest
     */
    dockerfilePath?: string;
    /**
     * 
     * @type {number}
     * @memberof BuildSettingRequest
     */
    cpuLimit?: number;
    /**
     * 
     * @type {number}
     * @memberof BuildSettingRequest
     */
    memoryLimit?: number;
    /**
     * 
     * @type {number}
     * @memberof BuildSettingRequest
     */
    cpuRequest?: number;
    /**
     * 
     * @type {number}
     * @memberof BuildSettingRequest
     */
    memoryRequest?: number;
    /**
     * 
     * @type {number}
     * @memberof BuildSettingRequest
     */
    activeDeadline?: number;
}

/**
 * Check if a given object implements the BuildSettingRequest interface.
 */
export function instanceOfBuildSettingRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "repository" in value;

    return isInstance;
}

export function BuildSettingRequestFromJSON(json: any): BuildSettingRequest {
    return BuildSettingRequestFromJSONTyped(json, false);
}

export function BuildSettingRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): BuildSettingRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'repository': json['repository'],
        'dockerfilePath': !exists(json, 'dockerfile_path') ? undefined : json['dockerfile_path'],
        'cpuLimit': !exists(json, 'cpu_limit') ? undefined : json['cpu_limit'],
        'memoryLimit': !exists(json, 'memory_limit') ? undefined : json['memory_limit'],
        'cpuRequest': !exists(json, 'cpu_request') ? undefined : json['cpu_request'],
        'memoryRequest': !exists(json, 'memory_request') ? undefined : json['memory_request'],
        'activeDeadline': !exists(json, 'active_deadline') ? undefined : json['active_deadline'],
    };
}

export function BuildSettingRequestToJSON(value?: BuildSettingRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'repository': value.repository,
        'dockerfile_path': value.dockerfilePath,
        'cpu_limit': value.cpuLimit,
        'memory_limit': value.memoryLimit,
        'cpu_request': value.cpuRequest,
        'memory_request': value.memoryRequest,
        'active_deadline': value.activeDeadline,
    };
}


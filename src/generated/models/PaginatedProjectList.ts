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
import type { Project } from './Project';
import {
    ProjectFromJSON,
    ProjectFromJSONTyped,
    ProjectToJSON,
} from './Project';

/**
 * 
 * @export
 * @interface PaginatedProjectList
 */
export interface PaginatedProjectList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedProjectList
     */
    count?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedProjectList
     */
    current?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedProjectList
     */
    size?: number;
    /**
     * 
     * @type {Array<Project>}
     * @memberof PaginatedProjectList
     */
    results?: Array<Project>;
}

/**
 * Check if a given object implements the PaginatedProjectList interface.
 */
export function instanceOfPaginatedProjectList(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedProjectListFromJSON(json: any): PaginatedProjectList {
    return PaginatedProjectListFromJSONTyped(json, false);
}

export function PaginatedProjectListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedProjectList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'current': !exists(json, 'current') ? undefined : json['current'],
        'size': !exists(json, 'size') ? undefined : json['size'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(ProjectFromJSON)),
    };
}

export function PaginatedProjectListToJSON(value?: PaginatedProjectList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'current': value.current,
        'size': value.size,
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(ProjectToJSON)),
    };
}


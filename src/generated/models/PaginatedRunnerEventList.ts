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
import type { RunnerEvent } from './RunnerEvent';
import {
    RunnerEventFromJSON,
    RunnerEventFromJSONTyped,
    RunnerEventToJSON,
} from './RunnerEvent';

/**
 * 
 * @export
 * @interface PaginatedRunnerEventList
 */
export interface PaginatedRunnerEventList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedRunnerEventList
     */
    count?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedRunnerEventList
     */
    current?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedRunnerEventList
     */
    size?: number;
    /**
     * 
     * @type {Array<RunnerEvent>}
     * @memberof PaginatedRunnerEventList
     */
    results?: Array<RunnerEvent>;
}

/**
 * Check if a given object implements the PaginatedRunnerEventList interface.
 */
export function instanceOfPaginatedRunnerEventList(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedRunnerEventListFromJSON(json: any): PaginatedRunnerEventList {
    return PaginatedRunnerEventListFromJSONTyped(json, false);
}

export function PaginatedRunnerEventListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedRunnerEventList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'current': !exists(json, 'current') ? undefined : json['current'],
        'size': !exists(json, 'size') ? undefined : json['size'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(RunnerEventFromJSON)),
    };
}

export function PaginatedRunnerEventListToJSON(value?: PaginatedRunnerEventList | null): any {
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
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(RunnerEventToJSON)),
    };
}


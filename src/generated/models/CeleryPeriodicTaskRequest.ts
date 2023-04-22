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
import type { CrontabScheduleRequest } from './CrontabScheduleRequest';
import {
    CrontabScheduleRequestFromJSON,
    CrontabScheduleRequestFromJSONTyped,
    CrontabScheduleRequestToJSON,
} from './CrontabScheduleRequest';

/**
 * 
 * @export
 * @interface CeleryPeriodicTaskRequest
 */
export interface CeleryPeriodicTaskRequest {
    /**
     * 
     * @type {CrontabScheduleRequest}
     * @memberof CeleryPeriodicTaskRequest
     */
    crontab: CrontabScheduleRequest;
    /**
     * If True, the schedule will only run the task a single time
     * @type {boolean}
     * @memberof CeleryPeriodicTaskRequest
     */
    oneOff?: boolean;
    /**
     * Set to False to disable the schedule
     * @type {boolean}
     * @memberof CeleryPeriodicTaskRequest
     */
    enabled?: boolean;
}

/**
 * Check if a given object implements the CeleryPeriodicTaskRequest interface.
 */
export function instanceOfCeleryPeriodicTaskRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "crontab" in value;

    return isInstance;
}

export function CeleryPeriodicTaskRequestFromJSON(json: any): CeleryPeriodicTaskRequest {
    return CeleryPeriodicTaskRequestFromJSONTyped(json, false);
}

export function CeleryPeriodicTaskRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CeleryPeriodicTaskRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'crontab': CrontabScheduleRequestFromJSON(json['crontab']),
        'oneOff': !exists(json, 'one_off') ? undefined : json['one_off'],
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
    };
}

export function CeleryPeriodicTaskRequestToJSON(value?: CeleryPeriodicTaskRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'crontab': CrontabScheduleRequestToJSON(value.crontab),
        'one_off': value.oneOff,
        'enabled': value.enabled,
    };
}

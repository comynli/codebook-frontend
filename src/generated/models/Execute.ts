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

import { exists, mapValues } from "../runtime";
/**
 *
 * @export
 * @interface Execute
 */
export interface Execute {
    /**
     *
     * @type {string}
     * @memberof Execute
     */
    repository: string;
    /**
     *
     * @type {string}
     * @memberof Execute
     */
    playbook?: string;
}

/**
 * Check if a given object implements the Execute interface.
 */
export function instanceOfExecute(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "repository" in value;

    return isInstance;
}

export function ExecuteFromJSON(json: any): Execute {
    return ExecuteFromJSONTyped(json, false);
}

export function ExecuteFromJSONTyped(json: any, ignoreDiscriminator: boolean): Execute {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        repository: json["repository"],
        playbook: !exists(json, "playbook") ? undefined : json["playbook"],
    };
}

export function ExecuteToJSON(value?: Execute | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        repository: value.repository,
        playbook: value.playbook,
    };
}

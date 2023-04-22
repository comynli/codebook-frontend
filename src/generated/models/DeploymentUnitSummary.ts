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
 * @interface DeploymentUnitSummary
 */
export interface DeploymentUnitSummary {
    /**
     * 
     * @type {number}
     * @memberof DeploymentUnitSummary
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof DeploymentUnitSummary
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof DeploymentUnitSummary
     */
    readonly stage: string;
    /**
     * 
     * @type {string}
     * @memberof DeploymentUnitSummary
     */
    readonly cluster: string;
    /**
     * 
     * @type {string}
     * @memberof DeploymentUnitSummary
     */
    readonly lane: string;
    /**
     * 
     * @type {string}
     * @memberof DeploymentUnitSummary
     */
    namespace: string;
}

/**
 * Check if a given object implements the DeploymentUnitSummary interface.
 */
export function instanceOfDeploymentUnitSummary(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "stage" in value;
    isInstance = isInstance && "cluster" in value;
    isInstance = isInstance && "lane" in value;
    isInstance = isInstance && "namespace" in value;

    return isInstance;
}

export function DeploymentUnitSummaryFromJSON(json: any): DeploymentUnitSummary {
    return DeploymentUnitSummaryFromJSONTyped(json, false);
}

export function DeploymentUnitSummaryFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeploymentUnitSummary {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'stage': json['stage'],
        'cluster': json['cluster'],
        'lane': json['lane'],
        'namespace': json['namespace'],
    };
}

export function DeploymentUnitSummaryToJSON(value?: DeploymentUnitSummary | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'namespace': value.namespace,
    };
}

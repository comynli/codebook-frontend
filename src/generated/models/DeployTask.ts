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
import type { BuildSettingCreatedBy } from './BuildSettingCreatedBy';
import {
    BuildSettingCreatedByFromJSON,
    BuildSettingCreatedByFromJSONTyped,
    BuildSettingCreatedByToJSON,
} from './BuildSettingCreatedBy';
import type { DeployTaskDeploymentUnit } from './DeployTaskDeploymentUnit';
import {
    DeployTaskDeploymentUnitFromJSON,
    DeployTaskDeploymentUnitFromJSONTyped,
    DeployTaskDeploymentUnitToJSON,
} from './DeployTaskDeploymentUnit';
import type { StateEnum } from './StateEnum';
import {
    StateEnumFromJSON,
    StateEnumFromJSONTyped,
    StateEnumToJSON,
} from './StateEnum';

/**
 * 
 * @export
 * @interface DeployTask
 */
export interface DeployTask {
    /**
     * 
     * @type {number}
     * @memberof DeployTask
     */
    readonly id: number;
    /**
     * 
     * @type {Date}
     * @memberof DeployTask
     */
    readonly createdAt: Date;
    /**
     * 
     * @type {BuildSettingCreatedBy}
     * @memberof DeployTask
     */
    createdBy: BuildSettingCreatedBy;
    /**
     * 
     * @type {Date}
     * @memberof DeployTask
     */
    readonly updatedAt: Date;
    /**
     * 
     * @type {BuildSettingCreatedBy}
     * @memberof DeployTask
     */
    updatedBy: BuildSettingCreatedBy;
    /**
     * 
     * @type {DeployTaskDeploymentUnit}
     * @memberof DeployTask
     */
    deploymentUnit: DeployTaskDeploymentUnit;
    /**
     * 
     * @type {string}
     * @memberof DeployTask
     */
    version: string;
    /**
     * 
     * @type {StateEnum}
     * @memberof DeployTask
     */
    state?: StateEnum;
    /**
     * 
     * @type {string}
     * @memberof DeployTask
     */
    yaml?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DeployTask
     */
    error?: string | null;
    /**
     * 
     * @type {number}
     * @memberof DeployTask
     */
    generation?: number;
}

/**
 * Check if a given object implements the DeployTask interface.
 */
export function instanceOfDeployTask(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "createdBy" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "updatedBy" in value;
    isInstance = isInstance && "deploymentUnit" in value;
    isInstance = isInstance && "version" in value;

    return isInstance;
}

export function DeployTaskFromJSON(json: any): DeployTask {
    return DeployTaskFromJSONTyped(json, false);
}

export function DeployTaskFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeployTask {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': (new Date(json['created_at'])),
        'createdBy': BuildSettingCreatedByFromJSON(json['created_by']),
        'updatedAt': (new Date(json['updated_at'])),
        'updatedBy': BuildSettingCreatedByFromJSON(json['updated_by']),
        'deploymentUnit': DeployTaskDeploymentUnitFromJSON(json['deployment_unit']),
        'version': json['version'],
        'state': !exists(json, 'state') ? undefined : StateEnumFromJSON(json['state']),
        'yaml': !exists(json, 'yaml') ? undefined : json['yaml'],
        'error': !exists(json, 'error') ? undefined : json['error'],
        'generation': !exists(json, 'generation') ? undefined : json['generation'],
    };
}

export function DeployTaskToJSON(value?: DeployTask | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_by': BuildSettingCreatedByToJSON(value.createdBy),
        'updated_by': BuildSettingCreatedByToJSON(value.updatedBy),
        'deployment_unit': DeployTaskDeploymentUnitToJSON(value.deploymentUnit),
        'version': value.version,
        'state': StateEnumToJSON(value.state),
        'yaml': value.yaml,
        'error': value.error,
        'generation': value.generation,
    };
}


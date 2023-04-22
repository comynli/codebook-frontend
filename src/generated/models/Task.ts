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
import type { Repository } from './Repository';
import {
    RepositoryFromJSON,
    RepositoryFromJSONTyped,
    RepositoryToJSON,
} from './Repository';

/**
 * 
 * @export
 * @interface Task
 */
export interface Task {
    /**
     * 
     * @type {number}
     * @memberof Task
     */
    readonly id: number;
    /**
     * 
     * @type {Date}
     * @memberof Task
     */
    readonly createdAt: Date;
    /**
     * 
     * @type {BuildSettingCreatedBy}
     * @memberof Task
     */
    createdBy: BuildSettingCreatedBy;
    /**
     * 
     * @type {Date}
     * @memberof Task
     */
    readonly updatedAt: Date;
    /**
     * 
     * @type {BuildSettingCreatedBy}
     * @memberof Task
     */
    updatedBy: BuildSettingCreatedBy;
    /**
     * 
     * @type {Repository}
     * @memberof Task
     */
    repository: Repository;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    playbook?: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    inventories?: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    envvars?: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    extravars?: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    commitId?: string;
    /**
     * 
     * @type {number}
     * @memberof Task
     */
    state?: number;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    output?: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    executeId?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Task
     */
    periodic?: number | null;
}

/**
 * Check if a given object implements the Task interface.
 */
export function instanceOfTask(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "createdBy" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "updatedBy" in value;
    isInstance = isInstance && "repository" in value;

    return isInstance;
}

export function TaskFromJSON(json: any): Task {
    return TaskFromJSONTyped(json, false);
}

export function TaskFromJSONTyped(json: any, ignoreDiscriminator: boolean): Task {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': (new Date(json['created_at'])),
        'createdBy': BuildSettingCreatedByFromJSON(json['created_by']),
        'updatedAt': (new Date(json['updated_at'])),
        'updatedBy': BuildSettingCreatedByFromJSON(json['updated_by']),
        'repository': RepositoryFromJSON(json['repository']),
        'playbook': !exists(json, 'playbook') ? undefined : json['playbook'],
        'inventories': !exists(json, 'inventories') ? undefined : json['inventories'],
        'envvars': !exists(json, 'envvars') ? undefined : json['envvars'],
        'extravars': !exists(json, 'extravars') ? undefined : json['extravars'],
        'commitId': !exists(json, 'commit_id') ? undefined : json['commit_id'],
        'state': !exists(json, 'state') ? undefined : json['state'],
        'output': !exists(json, 'output') ? undefined : json['output'],
        'executeId': !exists(json, 'execute_id') ? undefined : json['execute_id'],
        'periodic': !exists(json, 'periodic') ? undefined : json['periodic'],
    };
}

export function TaskToJSON(value?: Task | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_by': BuildSettingCreatedByToJSON(value.createdBy),
        'updated_by': BuildSettingCreatedByToJSON(value.updatedBy),
        'repository': RepositoryToJSON(value.repository),
        'playbook': value.playbook,
        'inventories': value.inventories,
        'envvars': value.envvars,
        'extravars': value.extravars,
        'commit_id': value.commitId,
        'state': value.state,
        'output': value.output,
        'execute_id': value.executeId,
        'periodic': value.periodic,
    };
}

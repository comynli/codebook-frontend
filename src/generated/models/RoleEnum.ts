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


/**
 * 
 * @export
 */
export const RoleEnum = {
    NUMBER_0: 0,
    NUMBER_1: 1,
    NUMBER_2: 2
} as const;
export type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum];


export function RoleEnumFromJSON(json: any): RoleEnum {
    return RoleEnumFromJSONTyped(json, false);
}

export function RoleEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoleEnum {
    return json as RoleEnum;
}

export function RoleEnumToJSON(value?: RoleEnum | null): any {
    return value as any;
}


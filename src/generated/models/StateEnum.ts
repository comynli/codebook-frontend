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
export const StateEnum = {
    NUMBER_0: 0,
    NUMBER_1: 1,
    NUMBER_2: 2,
    NUMBER_3: 3,
    NUMBER_4: 4,
    NUMBER_5: 5,
    NUMBER_6: 6
} as const;
export type StateEnum = typeof StateEnum[keyof typeof StateEnum];


export function StateEnumFromJSON(json: any): StateEnum {
    return StateEnumFromJSONTyped(json, false);
}

export function StateEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): StateEnum {
    return json as StateEnum;
}

export function StateEnumToJSON(value?: StateEnum | null): any {
    return value as any;
}


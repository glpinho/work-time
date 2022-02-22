import { AWSError, DynamoDB } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import * as uuid from "uuid";

const db = new DynamoDB.DocumentClient();
const TableName = "registries";

export const addRegistry = async (
    registry: Registry
): Promise<PromiseResult<DynamoDB.DocumentClient.PutItemOutput, AWSError>> => {
    const params: DynamoDB.PutItemInput = {
        TableName,

        Item: {
            id: uuid.v1() as DynamoDB.AttributeValue,

            includedAt: registry.includedAt as DynamoDB.AttributeValue,

            employeeId:
                (registry.employeeId as DynamoDB.AttributeValue) ??
                ("" as DynamoDB.AttributeValue),

            employerId: registry.employerId as DynamoDB.AttributeValue,
        },
    };

    return await db.put(params).promise();
};

export const listRegistries = async (): Promise<Registry[] | null> => {
    const params: DynamoDB.ScanInput = {
        TableName,
    };

    const result = await db.scan(params).promise();
    return result.Items ? (result.Items as Registry[]) : null;
};

export const deleteRegistryById = async (id: string): Promise<void> => {
    const params: DynamoDB.DeleteItemInput = {
        TableName,

        Key: {
            id: id as DynamoDB.AttributeValue,
        },
    };

    await db.delete(params).promise();
};

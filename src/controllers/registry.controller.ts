import { APIGatewayProxyEvent, ScheduledEvent } from "aws-lambda";
import * as registryRepo from "../repositories/registry.repository";
import { getResponse } from "../util/responses";
import * as dotenv from "dotenv";
import * as Axios from "axios";

const axios = Axios.default;

dotenv.config();

export const includeRegistry = async (
    event: APIGatewayProxyEvent
): Promise<LambdaResponse> => {
    let registry: Registry;
    if (event.body) {
        registry = JSON.parse(event.body) as Registry;
    } else {
        return getResponse(400, "No body sent on request");
    }

    try {
        const response = await registryRepo.addRegistry(registry);

        return getResponse(200, { response });
    } catch (error) {
        console.log({ error });
        return getResponse(500, { error: "Unknown error", message: error });
    }
};

export const updateRegistries = async (
    _event: ScheduledEvent
): Promise<void> => {
    try {
        const registries = await registryRepo.listRegistries();

        if (!registries) return;

        for (let i = 0; i < registries.length; i++) {
            const registry = registries[i];
            const { includedAt, employeeId, employerId } = registry;

            await axios.post(process.env.LEGACY_URL, {
                includedAt,
                employeeId,
                employerId,
            });

            await registryRepo.deleteRegistryById(registry.id);
        }
    } catch (error) {
        console.log({ error });
    }
};

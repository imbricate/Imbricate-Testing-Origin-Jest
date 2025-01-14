/**
 * @author WMXPY
 * @namespace Database
 * @description Create
 */

import { IImbricateOrigin, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { ImbricateOriginTestingTarget } from "../testing-target";
import assert from "assert";

export const startImbricateOriginDatabaseCreateTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Database (Create) Functions", () => {

        beforeAll(async () => {

            await testingTarget.resetOrigin();
        });

        it("should be able to create database", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            await databaseManager.createDatabase("test-database", {
                properties: [{
                    propertyName: "test-property",
                    propertyType: IMBRICATE_PROPERTY_TYPE.STRING,
                    propertyOptions: {},
                }],
            });

            const databases = await databaseManager.queryDatabases({});

            assert(typeof databases !== "symbol");

            expect(databases.databases).toHaveLength(1);
        });
    });
};

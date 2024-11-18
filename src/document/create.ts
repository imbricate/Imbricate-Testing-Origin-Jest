/**
 * @author WMXPY
 * @namespace Document
 * @description Create
 */

import { IImbricateOrigin, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import assert from "node:assert";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginDocumentCreateTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Document (Create) Functions", () => {

        beforeAll(async () => {

            await testingTarget.resetOrigin();
        });

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            await databaseManager.createDatabase("test-database", {
                properties: [{
                    propertyName: "test",
                    propertyType: IMBRICATE_PROPERTY_TYPE.STRING,
                }],
            });
        });

        it("should be able to create document", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const databases = await databaseManager.listDatabases();

            expect(databases).toHaveLength(1);

            const database = databases[0];

            const identifier = database.schema.properties[0].propertyIdentifier;
            assert(identifier !== null);

            await database.createDocument({
                [identifier]: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "world",
                },
            }, "test-unique-identifier");

            const documents = await database.queryDocuments({});

            expect(documents).toHaveLength(1);
        });

        it("should be able to get document by unique identifier", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const databases = await databaseManager.listDatabases();
            const database = databases[0];

            const identifier = database.schema.properties[0].propertyIdentifier;
            assert(identifier !== null);

            const document = await database.getDocument("test-unique-identifier");

            assert(document !== null);

            const properties = await document.getProperties();

            expect(properties).toEqual({
                [identifier]: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "world",
                },
            });
        });
    });
};

/**
 * @author WMXPY
 * @namespace Document
 * @description Create
 */

import { IImbricateOrigin, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
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
                    propertyIdentifier: "test-property",
                    propertyName: "test-property",
                    propertyType: IMBRICATE_PROPERTY_TYPE.STRING,
                }],
            });
        });

        it("should be able to create document", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const databases = await databaseManager.getDatabases();

            expect(databases).toHaveLength(1);

            const database = databases[0];

            await database.createDocument({
                hello: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "world",
                },
            });

            const documents = await database.queryDocuments({});

            expect(documents).toHaveLength(1);
        });
    });
};

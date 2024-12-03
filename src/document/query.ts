/**
 * @author WMXPY
 * @namespace Document
 * @description Query
 */

import { IImbricateOrigin, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginDocumentQueryTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Document (Query) Functions", () => {

        const identifierMap: Record<string, string> = {};

        beforeAll(async () => {

            await testingTarget.resetOrigin();
        });

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const database = await databaseManager.createDatabase("test-database", {
                properties: [{
                    propertyName: "test",
                    propertyType: IMBRICATE_PROPERTY_TYPE.STRING,
                    propertyOptions: {},
                }],
            });

            const firstDocument = await database.createDocument({
                [database.schema.properties[0].propertyIdentifier]: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "first",
                },
            });

            const secondDocument = await database.createDocument({
                [database.schema.properties[0].propertyIdentifier]: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "second",
                },
            });

            identifierMap.database = database.uniqueIdentifier;
            identifierMap.first = firstDocument.uniqueIdentifier;
            identifierMap.second = secondDocument.uniqueIdentifier;
        });

        it("should be able to query all documents", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const database = await databaseManager.getDatabase(identifierMap.database);

            if (!database) {
                throw new Error("Database not found");
            }

            const documents = await database.queryDocuments({});

            expect(documents).toHaveLength(2);
        });

        it("should be able to query documents limit and skip", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const database = await databaseManager.getDatabase(identifierMap.database);

            if (!database) {
                throw new Error("Database not found");
            }

            const limitDocuments = await database.queryDocuments({
                limit: 1,
            });

            const skipDocuments = await database.queryDocuments({
                skip: 1,
            });

            console.log(limitDocuments, skipDocuments);

            expect(limitDocuments).toHaveLength(1);
            expect(skipDocuments).toHaveLength(1);

            expect(limitDocuments[0].uniqueIdentifier).not.toEqual(skipDocuments[0].uniqueIdentifier);
        });
    });
};

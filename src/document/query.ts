/**
 * @author WMXPY
 * @namespace Document
 * @description Query
 */

import { IImbricateOrigin, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import { ImbricateOriginTestingTarget } from "../testing-target";
import assert from "node:assert";

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

            assert(typeof firstDocument !== "symbol");
            assert(typeof secondDocument !== "symbol");

            identifierMap.database = database.uniqueIdentifier;
            identifierMap.first = firstDocument.document.uniqueIdentifier;
            identifierMap.second = secondDocument.document.uniqueIdentifier;
        });

        it("should be able to query all documents", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const database = await databaseManager.getDatabase(identifierMap.database);

            if (!database) {
                throw new Error("Database not found");
            }

            const documents = await database.queryDocuments({});

            assert(typeof documents !== "symbol");

            expect(documents.documents).toHaveLength(2);
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

            assert(typeof limitDocuments !== "symbol");
            assert(typeof skipDocuments !== "symbol");

            expect(limitDocuments.documents).toHaveLength(1);
            expect(skipDocuments.documents).toHaveLength(1);

            expect(limitDocuments.documents[0].uniqueIdentifier).not.toEqual(skipDocuments.documents[0].uniqueIdentifier);
        });
    });
};

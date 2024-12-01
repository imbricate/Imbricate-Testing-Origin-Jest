/**
 * @author WMXPY
 * @namespace Document
 * @description Update
 */

import { IImbricateOrigin, IMBRICATE_PROPERTY_TYPE } from "@imbricate/core";
import assert from "node:assert";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const startImbricateOriginDocumentUpdateTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Document (Update) Functions", () => {

        const identifierMap: Record<string, string> = {};

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
                    propertyOptions: {},
                }],
            });
        });

        it("should be able to create document with initial properties", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const databases = await databaseManager.listDatabases();

            expect(databases).toHaveLength(1);

            const database = databases[0];

            const identifier = database.schema.properties[0].propertyIdentifier;
            assert(identifier !== null);

            const createdDocument = await database.createDocument({
                [identifier]: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "world",
                },
            });
            identifierMap.test = createdDocument.uniqueIdentifier;

            const documents = await database.queryDocuments({});

            expect(documents).toHaveLength(1);
        });

        it("should be able to update document with put property", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const databases = await databaseManager.listDatabases();
            const database = databases[0];

            const identifier = database.schema.properties[0].propertyIdentifier;
            assert(identifier !== null);

            const document = await database.getDocument(identifierMap.test);

            assert(document !== null, "Document should not be null");

            expect(document.properties).toEqual({
                [identifier]: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "world",
                },
            });

            await document.putProperty(identifier, {
                type: IMBRICATE_PROPERTY_TYPE.STRING,
                value: "new-world",
            });

            expect(document.properties).toEqual({
                [identifier]: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "new-world",
                },
            });
        });

        it("should be able to update document with put properties", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const databases = await databaseManager.listDatabases();
            const database = databases[0];

            const identifier = database.schema.properties[0].propertyIdentifier;
            assert(identifier !== null);

            const document = await database.getDocument(identifierMap.test);

            assert(document !== null, "Document should not be null");

            expect(document.properties).toEqual({
                [identifier]: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "new-world",
                },
            });

            await document.putProperties({
                [identifier]: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "world",
                },
            });

            expect(document.properties).toEqual({
                [identifier]: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "world",
                },
            });
        });

        it("should be able to get edit records without update edit record", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const databases = await databaseManager.listDatabases();
            const database = databases[0];

            const document = await database.getDocument(identifierMap.test);

            assert(document !== null, "Document should not be null");

            if (typeof document.getEditRecords !== "function") {
                return;
            }

            const records = await document.getEditRecords();
            expect(records).toHaveLength(1);
        });

        it("should be able to get edit records after update edit record", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const databases = await databaseManager.listDatabases();
            const database = databases[0];

            const identifier = database.schema.properties[0].propertyIdentifier;
            assert(identifier !== null);

            const document = await database.getDocument(identifierMap.test);

            assert(document !== null, "Document should not be null");

            const editRecords = await document.putProperties({
                [identifier]: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "with-edit-records",
                },
            });

            if (typeof document.addEditRecords !== "function") {
                return;
            }

            await document.addEditRecords(editRecords);

            if (typeof document.getEditRecords !== "function") {
                return;
            }

            const records = await document.getEditRecords();
            expect(records).toHaveLength(2);
        });
    });
};

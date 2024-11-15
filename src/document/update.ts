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

        it("should be able to create document with initial properties", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const databases = await databaseManager.listDatabases();

            expect(databases).toHaveLength(1);

            const database = databases[0];

            await database.createDocument({
                test: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "world",
                },
            }, "test-unique-identifier");

            const documents = await database.queryDocuments({});

            expect(documents).toHaveLength(1);
        });

        it("should be able to update document with put property", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const databases = await databaseManager.listDatabases();
            const database = databases[0];

            const document = await database.getDocument("test-unique-identifier");

            assert(document !== null, "Document should not be null");

            const properties = await document.getProperties();

            expect(properties).toEqual({
                test: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "world",
                },
            });

            await document.putProperty("test", {
                type: IMBRICATE_PROPERTY_TYPE.STRING,
                value: "new-world",
            });

            const newProperties = await document.getProperties();

            expect(newProperties).toEqual({
                test: {
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

            const document = await database.getDocument("test-unique-identifier");

            assert(document !== null, "Document should not be null");

            const properties = await document.getProperties();

            expect(properties).toEqual({
                test: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "new-world",
                },
            });

            await document.putProperties({
                test: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "world",
                },
            });

            const newProperties = await document.getProperties();

            expect(newProperties).toEqual({
                test: {
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

            const document = await database.getDocument("test-unique-identifier");

            assert(document !== null, "Document should not be null");

            const records = await document.getEditRecords();
            expect(records).toHaveLength(1);
        });

        it("should be able to get edit records after update edit record", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const databaseManager = origin.getDatabaseManager();

            const databases = await databaseManager.listDatabases();
            const database = databases[0];

            const document = await database.getDocument("test-unique-identifier");

            assert(document !== null, "Document should not be null");

            const editRecords = await document.putProperties({
                test: {
                    type: IMBRICATE_PROPERTY_TYPE.STRING,
                    value: "with-edit-records",
                },
            });

            await document.addEditRecords(editRecords);

            const records = await document.getEditRecords();
            expect(records).toHaveLength(2);
        });
    });
};

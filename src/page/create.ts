/**
 * @author WMXPY
 * @namespace Page
 * @description Create
 */

import { IImbricateCollection, IImbricateOrigin, IImbricatePage } from "@imbricate/core";
import { PageToBeDeleted } from "../definition";
import { testAuthor } from "../mock";
import { ImbricateOriginTestingTarget } from "../testing-target";
import { mockPageVariant } from "../util/variant";

export const startImbricateOriginPageCreateTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Page (Create) Features", () => {

        const pageToBeDeleted: PageToBeDeleted[] = [];
        const collectionToBeDeleted: string[] = [];

        let collection: IImbricateCollection = null as unknown as IImbricateCollection;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const testCollection: IImbricateCollection =
                await origin
                    .getCollectionManager()
                    .createCollection("test-page-create");

            collectionToBeDeleted.push(testCollection.uniqueIdentifier);

            collection = testCollection;
        });

        afterAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            for (const page of pageToBeDeleted) {

                const collection = await origin
                    .getCollectionManager()
                    .getCollection(page.collectionIdentifier);

                if (!collection) {
                    throw new Error("Collection not found");
                }

                await collection.deletePage(page.identifier);
            }

            for (const collectionUniqueIdentifier of collectionToBeDeleted) {
                await origin
                    .getCollectionManager()
                    .deleteCollection(collectionUniqueIdentifier);
            }
        });

        it("should be able to create page", async (): Promise<void> => {

            const page: IImbricatePage = await collection.createPage(
                [],
                "test-page",
                mockPageVariant,
                testAuthor,
                "test-content",
            );

            pageToBeDeleted.push({
                identifier: page.identifier,
                collectionIdentifier: collection.uniqueIdentifier,
            });

            expect(page).toBeDefined();

            const pageContent: string = await page.readContent();

            expect(pageContent).toBe("test-content");
        });

        it("should be able to confirm with has page", async (): Promise<void> => {

            const hasPage: boolean = await collection.hasPage(
                [],
                "test-page",
            );

            expect(hasPage).toBeTruthy();

            const notHasPage: boolean = await collection.hasPage(
                [],
                "not-exist",
            );

            expect(notHasPage).toBeFalsy();
        });
    });
};

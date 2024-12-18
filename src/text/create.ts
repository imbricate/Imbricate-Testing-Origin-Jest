/**
 * @author WMXPY
 * @namespace Text
 * @description Create
 */

import { IImbricateOrigin } from "@imbricate/core";
import { ImbricateOriginTestingTarget } from "../testing-target";
import assert from "node:assert";

export const startImbricateOriginTextCreateTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Text (Create) Functions", () => {

        beforeAll(async () => {

            await testingTarget.resetOrigin();
        });

        it("should be able to create text", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const textManager = origin.getTextManager();

            const createdText = await textManager.createText(
                "test-text",
            );

            const text = await textManager.getText(
                createdText.uniqueIdentifier,
            );

            assert(text !== null, "Text should not be null");

            const content = await text.getContent();

            expect(content).toEqual("test-text");
        });
    });
};

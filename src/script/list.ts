/**
 * @author WMXPY
 * @namespace Script
 * @description List
 */

import { IImbricateOrigin, IImbricateScript, ImbricateScriptSnapshot } from "@imbricate/core";
import { ScriptToBeDeleted } from "../definition";
import { testAuthor } from "../mock";
import { ImbricateOriginTestingTarget } from "../testing-target";
import { mockScriptVariant } from "../util/variant";

export const startImbricateOriginScriptListTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Script (List) Features", () => {

        const scriptToBeDeleted: ScriptToBeDeleted[] = [];

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            const firstScript: IImbricateScript = await origin
                .getScriptManager()
                .createScript(
                    "first-script",
                    mockScriptVariant,
                    testAuthor,
                    "first-content",
                );

            scriptToBeDeleted.push({
                identifier: firstScript.identifier,
            });

            const secondScript: IImbricateScript = await origin
                .getScriptManager()
                .createScript(
                    "second-script",
                    mockScriptVariant,
                    testAuthor,
                    "second-content",
                );

            scriptToBeDeleted.push({
                identifier: secondScript.identifier,
            });
        });

        afterAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            for (const script of scriptToBeDeleted) {

                await origin
                    .getScriptManager()
                    .deleteScript(
                        script.identifier,
                    );
            }
        });

        it("should be able to find scripts", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const scripts: ImbricateScriptSnapshot[] = await origin
                .getScriptManager()
                .listScripts();

            expect(scripts).toHaveLength(2);
        });
    });
};

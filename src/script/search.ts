/**
 * @author WMXPY
 * @namespace Script
 * @description Search
 */

import { IImbricateOrigin, IImbricateScript, ImbricateScriptSearchResult } from "@imbricate/core";
import { ScriptToBeDeleted } from "../definition";
import { testAuthor } from "../mock";
import { ImbricateOriginTestingTarget } from "../testing-target";
import { mockScriptVariant } from "../util/variant";

export const startImbricateOriginScriptSearchTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Script (Search) Features", () => {

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

        it("should be able to search scripts with item limits", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const scripts: ImbricateScriptSearchResult[] = await origin
                .getScriptManager()
                .searchScripts(
                    "script",
                    {
                        itemLimit: 10,
                    },
                );

            expect(scripts).toHaveLength(2);
        });

        it("should be able to search scripts with item limit missed", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const scripts: ImbricateScriptSearchResult[] = await origin
                .getScriptManager()
                .searchScripts(
                    "script",
                    {
                        itemLimit: 1,
                    },
                );

            expect(scripts).toHaveLength(1);
        });
    });
};

/**
 * @author WMXPY
 * @namespace Script
 * @description List
 */

import { IImbricateOrigin, IImbricateScript, IMBRICATE_ORIGIN_CAPABILITY_KEY, ImbricateScriptSnapshot } from "@imbricate/core";
import { ScriptToBeDeleted } from "../definition";
import { ImbricateOriginTestingTarget } from "../testing-target";
import { describeOriginTest } from "../util/describe-origin";

export const startImbricateOriginScriptListTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describeOriginTest(
        testingTarget,
        [IMBRICATE_ORIGIN_CAPABILITY_KEY.ORIGIN_SCRIPT_MANAGER],
    )("Test Imbricate Script (List) Features", () => {

        const scriptToBeDeleted: ScriptToBeDeleted[] = [];

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            const firstScript: IImbricateScript = await origin
                .getScriptManager()
                .createScript(
                    "first-script",
                    "first-content",
                );

            scriptToBeDeleted.push({
                identifier: firstScript.identifier,
            });

            const secondScript: IImbricateScript = await origin
                .getScriptManager()
                .createScript(
                    "second-script",
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

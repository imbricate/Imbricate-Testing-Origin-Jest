/**
 * @author WMXPY
 * @namespace Script
 * @description Rename
 */

import { IImbricateOrigin, IImbricateScript, IMBRICATE_ORIGIN_CAPABILITY_KEY } from "@imbricate/core";
import { ScriptToBeDeleted } from "../definition";
import { ImbricateOriginTestingTarget } from "../testing-target";
import { describeOriginTest } from "../util/describe-origin";

export const startImbricateOriginScriptRenameTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describeOriginTest(
        testingTarget,
        [IMBRICATE_ORIGIN_CAPABILITY_KEY.ORIGIN_SCRIPT_MANAGER],
    )("Test Imbricate Script (Rename) Features", () => {

        const scriptToBeDeleted: ScriptToBeDeleted[] = [];
        let script: IImbricateScript = null as unknown as IImbricateScript;

        beforeAll(async () => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            const testScript: IImbricateScript = await origin
                .getScriptManager()
                .createScript(
                    "old-script-name",
                    "test-content",
                );

            scriptToBeDeleted.push({
                identifier: testScript.identifier,
            });
            script = testScript;
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

        it("should be able to confirm old script name", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const targetScript = await origin
                .getScriptManager()
                .getScript(
                    script.identifier,
                );

            expect(targetScript).toBeDefined();
            expect(targetScript!.scriptName).toStrictEqual("old-script-name");
        });

        it("should be able to rename script", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            await origin
                .getScriptManager()
                .renameScript(
                    script.identifier,
                    "new-script-name",
                );
        });

        it("should be able to confirm new script name", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const targetScript = await origin
                .getScriptManager()
                .getScript(
                    script.identifier,
                );

            expect(targetScript).toBeDefined();
            expect(targetScript!.scriptName).toStrictEqual("new-script-name");
        });
    });
};

/**
 * @author WMXPY
 * @namespace Script
 * @description Create
 */

import { IImbricateOrigin, IImbricateScript } from "@imbricate/core";
import { ScriptToBeDeleted } from "../definition";
import { testAuthor } from "../mock";
import { ImbricateOriginTestingTarget } from "../testing-target";
import { mockScriptVariant } from "../util/variant";

export const startImbricateOriginScriptCreateTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describe("Test Imbricate Script (Create) Features", () => {

        const scriptToBeDeleted: ScriptToBeDeleted[] = [];

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

        it("should be able to create script", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();
            const script: IImbricateScript = await origin
                .getScriptManager()
                .createScript(
                    "test-script",
                    mockScriptVariant,
                    testAuthor,
                    "test-content",
                );

            scriptToBeDeleted.push({
                identifier: script.identifier,
            });

            expect(script).toBeDefined();

            const scriptContent: string = await script.readScript();

            expect(scriptContent).toBe("test-content");

            const getScript: IImbricateScript | null = await origin
                .getScriptManager()
                .getScript(
                    script.identifier,
                );

            expect(getScript).toBeDefined();
            expect(getScript!.identifier).toBe(script.identifier);
        });

        it("should be able to confirm with has script", async (): Promise<void> => {

            const origin: IImbricateOrigin = testingTarget.ensureOrigin();

            const hasScript: boolean = await origin
                .getScriptManager()
                .hasScript(
                    "test-script",
                );

            expect(hasScript).toBe(true);
        });
    });
};

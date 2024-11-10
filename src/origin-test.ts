/**
 * @author WMXPY
 * @namespace OriginTest
 * @description Origin Test
 */

import { startImbricateOriginCollectionCreateTest } from "./database/create";
import { describeImbricateOriginTest } from "./describe-test";
import { ImbricateOriginTestingTarget } from "./testing-target";

export const startImbricateOriginTest = (
    testingTarget: ImbricateOriginTestingTarget,
): void => {

    describeImbricateOriginTest(
        "End-to-End Test for Imbricate Origin with Imbricate Origin Testing in Jest",
        testingTarget,
        () => {

            startImbricateOriginCollectionCreateTest(testingTarget);
        },
    );
};

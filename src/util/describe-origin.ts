/**
 * @author WMXPY
 * @namespace Util
 * @description Describe Origin
 */

import { IImbricateOrigin, IMBRICATE_CAPABILITY_EFFECT, IMBRICATE_ORIGIN_CAPABILITY_KEY, ImbricateCapability } from "@imbricate/core";
import { ImbricateOriginTestingTarget } from "../testing-target";

export const describeOriginTest = (
    target: ImbricateOriginTestingTarget,
    capabilities: IMBRICATE_ORIGIN_CAPABILITY_KEY[],
): jest.Describe => {

    const origin: IImbricateOrigin = target.ensureOrigin();

    for (const capability of capabilities) {

        const originCapability: ImbricateCapability = origin.capabilities[capability];

        if (!originCapability) {
            return describe.skip;
        }

        if (originCapability.effect === IMBRICATE_CAPABILITY_EFFECT.DENY) {
            return describe.skip;
        }
    }

    return describe;
};

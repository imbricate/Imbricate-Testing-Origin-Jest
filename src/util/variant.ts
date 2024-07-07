/**
 * @author WMXPY
 * @namespace Util
 * @description Variant
 */

import { IMBRICATE_PAGE_VARIANT_LANGUAGE, IMBRICATE_SCRIPT_EXECUTE_LAYER, IMBRICATE_SCRIPT_LANGUAGE, ImbricatePageVariant, ImbricateScriptVariant } from "@imbricate/core";

export const mockScriptVariant: ImbricateScriptVariant = {

    language: IMBRICATE_SCRIPT_LANGUAGE.JAVASCRIPT,

    engine: "node",
    version: "^12",

    layer: IMBRICATE_SCRIPT_EXECUTE_LAYER.ORIGIN,
};

export const mockPageVariant: ImbricatePageVariant = {

    language: IMBRICATE_PAGE_VARIANT_LANGUAGE.MARKDOWN,
};

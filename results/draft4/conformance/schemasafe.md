# Conformance: [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) draft4

## Report options

| Profile | Options | SHA-256 |
| --- | --- | --- |
| base | {"formatProfile":"base","fast":{"mode":"lax","allErrors":false,"useDefaults":false,"removeAdditional":false,"contentValidation":false,"formatAssertion":true,"extraFormats":false,"weakFormats":true,"allowUnusedKeywords":true,"allowUnreachable":true,"$schemaDefault":"http://json-schema.org/draft-04/schema#","includeErrors":false},"detailed":{"mode":"lax","allErrors":false,"useDefaults":false,"removeAdditional":false,"contentValidation":false,"formatAssertion":true,"extraFormats":false,"weakFormats":true,"allowUnusedKeywords":true,"allowUnreachable":true,"$schemaDefault":"http://json-schema.org/draft-04/schema#","includeErrors":true}} | b3dc17c5b87349296ad3579c78bf270d6745dd5385fe5caf7df60047f5527d55 |
| format-assertion | {"formatProfile":"format-assertion","fast":{"mode":"lax","allErrors":false,"useDefaults":false,"removeAdditional":false,"contentValidation":false,"formatAssertion":true,"extraFormats":false,"weakFormats":true,"allowUnusedKeywords":true,"allowUnreachable":true,"$schemaDefault":"http://json-schema.org/draft-04/schema#","includeErrors":false},"detailed":{"mode":"lax","allErrors":false,"useDefaults":false,"removeAdditional":false,"contentValidation":false,"formatAssertion":true,"extraFormats":false,"weakFormats":true,"allowUnusedKeywords":true,"allowUnreachable":true,"$schemaDefault":"http://json-schema.org/draft-04/schema#","includeErrors":true}} | cd2ee745efe41ff7c75ce0b753f4b17b11e9b4ac1527a865a1ac933306ed7257 |

## Counts

| Profile | Status | Cases | Percentage |
| --- | --- | ---: | ---: |
| base | PASS | 713 | 99.30% |
| base | WRONG | 1 | 0.14% |
| base | COMPILE | 4 | 0.56% |
| base | RUNTIME | 0 | 0.00% |
| base | UNSUPPORTED | 0 | 0.00% |
| format-assertion | PASS | 196 | 95.15% |
| format-assertion | WRONG | 3 | 1.46% |
| format-assertion | COMPILE | 7 | 3.40% |
| format-assertion | RUNTIME | 0 | 0.00% |
| format-assertion | UNSUPPORTED | 0 | 0.00% |

## Non-PASS cases

| Case ID | Description | Expected | Observed | Status | Error |
| --- | --- | --- | --- | --- | --- |
| draft4:definitions.json#/groups/0/tests/0 | valid definition schema | true |  | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |
| draft4:definitions.json#/groups/0/tests/1 | invalid definition schema | false |  | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |
| draft4:optional/format/hostname.json#/groups/0/tests/26 | trailing dot | false | true | WRONG |  |
| draft4:optional/format/ipv4.json#/groups/0/tests/37 | single octet out of range in last position | false | true | WRONG |  |
| draft4:optional/format/unknown.json#/groups/0/tests/0 | unknown formats ignore integers | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/1 | unknown formats ignore floats | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/2 | unknown formats ignore objects | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/3 | unknown formats ignore arrays | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/4 | unknown formats ignore booleans | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/5 | unknown formats ignore nulls | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/6 | unknown formats ignore strings | true |  | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/uri.json#/groups/0/tests/43 | non-numeric port is invalid | false | true | WRONG |  |
| draft4:optional/zeroTerminatedFloats.json#/groups/0/tests/0 | a float is not an integer even without fractional part | false | true | WRONG |  |
| draft4:ref.json#/groups/7/tests/0 | remote ref valid | true |  | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |
| draft4:ref.json#/groups/7/tests/1 | remote ref invalid | false |  | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |

## Detailed errors for invalid results

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft4:additionalItems.json#/groups/0/tests/1 | additional items do not match schema | PASS | {"keywordLocation":"#/additionalItems/type","instanceLocation":"#/3"} |
| draft4:additionalItems.json#/groups/2/tests/4 | additional items are not permitted | PASS | {"keywordLocation":"#/additionalItems","instanceLocation":"#"} |
| draft4:additionalItems.json#/groups/5/tests/0 | items defined in allOf are not examined | PASS | {"keywordLocation":"#/additionalItems/type","instanceLocation":"#/1"} |
| draft4:additionalItems.json#/groups/6/tests/1 | wrong type of second item | PASS | {"keywordLocation":"#/additionalItems/type","instanceLocation":"#/1"} |
| draft4:additionalItems.json#/groups/7/tests/0 | heterogeneous invalid instance | PASS | {"keywordLocation":"#/additionalItems","instanceLocation":"#"} |
| draft4:additionalProperties.json#/groups/0/tests/1 | an additional property is invalid | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/quux"} |
| draft4:additionalProperties.json#/groups/1/tests/1 | not matching the pattern is invalid | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/élmény"} |
| draft4:additionalProperties.json#/groups/2/tests/2 | an additional invalid property is invalid | PASS | {"keywordLocation":"#/additionalProperties/type","instanceLocation":"#/quux"} |
| draft4:additionalProperties.json#/groups/3/tests/1 | an additional invalid property is invalid | PASS | {"keywordLocation":"#/additionalProperties/type","instanceLocation":"#/foo"} |
| draft4:additionalProperties.json#/groups/5/tests/0 | properties defined in allOf are not examined | PASS | {"keywordLocation":"#/additionalProperties/type","instanceLocation":"#/foo"} |
| draft4:allOf.json#/groups/0/tests/1 | mismatch second | PASS | {"keywordLocation":"#/allOf/0/required","instanceLocation":"#/bar"} |
| draft4:allOf.json#/groups/0/tests/2 | mismatch first | PASS | {"keywordLocation":"#/allOf/1/required","instanceLocation":"#/foo"} |
| draft4:allOf.json#/groups/0/tests/3 | wrong type | PASS | {"keywordLocation":"#/allOf/0/properties/bar/type","instanceLocation":"#/bar"} |
| draft4:allOf.json#/groups/1/tests/1 | mismatch base schema | PASS | {"keywordLocation":"#/required","instanceLocation":"#/bar"} |
| draft4:allOf.json#/groups/1/tests/2 | mismatch first allOf | PASS | {"keywordLocation":"#/allOf/0/required","instanceLocation":"#/foo"} |
| draft4:allOf.json#/groups/1/tests/3 | mismatch second allOf | PASS | {"keywordLocation":"#/allOf/1/required","instanceLocation":"#/baz"} |
| draft4:allOf.json#/groups/1/tests/4 | mismatch both | PASS | {"keywordLocation":"#/allOf/0/required","instanceLocation":"#/foo"} |
| draft4:allOf.json#/groups/2/tests/1 | mismatch one | PASS | {"keywordLocation":"#/allOf/0/maximum","instanceLocation":"#"} |
| draft4:allOf.json#/groups/5/tests/1 | string is invalid | PASS | {"keywordLocation":"#/allOf/1/type","instanceLocation":"#"} |
| draft4:allOf.json#/groups/6/tests/1 | string is invalid | PASS | {"keywordLocation":"#/allOf/0/type","instanceLocation":"#"} |
| draft4:allOf.json#/groups/7/tests/1 | anything non-null is invalid | PASS | {"keywordLocation":"#/allOf/0/allOf/0/type","instanceLocation":"#"} |
| draft4:allOf.json#/groups/8/tests/0 | allOf: false, anyOf: false, oneOf: false | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft4:allOf.json#/groups/8/tests/1 | allOf: false, anyOf: false, oneOf: true | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft4:allOf.json#/groups/8/tests/2 | allOf: false, anyOf: true, oneOf: false | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft4:allOf.json#/groups/8/tests/3 | allOf: false, anyOf: true, oneOf: true | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft4:allOf.json#/groups/8/tests/4 | allOf: true, anyOf: false, oneOf: false | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft4:allOf.json#/groups/8/tests/5 | allOf: true, anyOf: false, oneOf: true | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft4:allOf.json#/groups/8/tests/6 | allOf: true, anyOf: true, oneOf: false | PASS | {"keywordLocation":"#/allOf/0/multipleOf","instanceLocation":"#"} |
| draft4:anyOf.json#/groups/0/tests/3 | neither anyOf valid | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft4:anyOf.json#/groups/1/tests/0 | mismatch base schema | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:anyOf.json#/groups/1/tests/2 | both anyOf invalid | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft4:anyOf.json#/groups/2/tests/3 | neither anyOf valid (complex) | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft4:anyOf.json#/groups/4/tests/1 | anything non-null is invalid | PASS | {"keywordLocation":"#/allOf/0/allOf/0/type","instanceLocation":"#"} |
| draft4:default.json#/groups/2/tests/1 | an explicit property value is checked against maximum (failing) | PASS | {"keywordLocation":"#/properties/alpha/maximum","instanceLocation":"#/alpha"} |
| draft4:definitions.json#/groups/0/tests/0 | valid definition schema | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |
| draft4:definitions.json#/groups/0/tests/1 | invalid definition schema | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |
| draft4:dependencies.json#/groups/0/tests/3 | missing dependency | PASS | {"keywordLocation":"#/dependencies/bar","instanceLocation":"#"} |
| draft4:dependencies.json#/groups/1/tests/3 | missing dependency | PASS | {"keywordLocation":"#/dependencies/quux","instanceLocation":"#"} |
| draft4:dependencies.json#/groups/1/tests/4 | missing other dependency | PASS | {"keywordLocation":"#/dependencies/quux","instanceLocation":"#"} |
| draft4:dependencies.json#/groups/1/tests/5 | missing both dependencies | PASS | {"keywordLocation":"#/dependencies/quux","instanceLocation":"#"} |
| draft4:dependencies.json#/groups/2/tests/2 | wrong type | PASS | {"keywordLocation":"#/dependencies/bar/properties/foo/type","instanceLocation":"#/foo"} |
| draft4:dependencies.json#/groups/2/tests/3 | wrong type other | PASS | {"keywordLocation":"#/dependencies/bar/properties/bar/type","instanceLocation":"#/bar"} |
| draft4:dependencies.json#/groups/2/tests/4 | wrong type both | PASS | {"keywordLocation":"#/dependencies/bar/properties/foo/type","instanceLocation":"#/foo"} |
| draft4:dependencies.json#/groups/3/tests/3 | invalid object 1 | PASS | {"keywordLocation":"#/dependencies/foo\nbar","instanceLocation":"#"} |
| draft4:dependencies.json#/groups/3/tests/4 | invalid object 2 | PASS | {"keywordLocation":"#/dependencies/foo\tbar/minProperties","instanceLocation":"#"} |
| draft4:dependencies.json#/groups/3/tests/5 | invalid object 3 | PASS | {"keywordLocation":"#/dependencies/foo'bar/required","instanceLocation":"#/foo\"bar"} |
| draft4:dependencies.json#/groups/3/tests/6 | invalid object 4 | PASS | {"keywordLocation":"#/dependencies/foo\"bar","instanceLocation":"#"} |
| draft4:dependencies.json#/groups/4/tests/0 | matches root | PASS | {"keywordLocation":"#/dependencies/foo/additionalProperties","instanceLocation":"#/foo"} |
| draft4:dependencies.json#/groups/4/tests/2 | matches both | PASS | {"keywordLocation":"#/dependencies/foo/additionalProperties","instanceLocation":"#/foo"} |
| draft4:enum.json#/groups/0/tests/1 | something else is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/1/tests/1 | something else is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/1/tests/2 | objects are deep compared | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/1/tests/4 | extra properties in object is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/2/tests/2 | something else is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/3/tests/1 | wrong foo value | PASS | {"keywordLocation":"#/properties/foo/enum","instanceLocation":"#/foo"} |
| draft4:enum.json#/groups/3/tests/2 | wrong bar value | PASS | {"keywordLocation":"#/properties/bar/enum","instanceLocation":"#/bar"} |
| draft4:enum.json#/groups/3/tests/4 | missing required property is invalid | PASS | {"keywordLocation":"#/required","instanceLocation":"#/bar"} |
| draft4:enum.json#/groups/3/tests/5 | missing all properties is invalid | PASS | {"keywordLocation":"#/required","instanceLocation":"#/bar"} |
| draft4:enum.json#/groups/4/tests/2 | another string is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/5/tests/1 | integer zero is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/5/tests/2 | float zero is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/6/tests/1 | [0] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/6/tests/2 | [0.0] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/7/tests/1 | integer one is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/7/tests/2 | float one is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/8/tests/1 | [1] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/8/tests/2 | [1.0] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/9/tests/0 | false is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/10/tests/0 | [false] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/11/tests/0 | true is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/12/tests/0 | [true] is invalid | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/13/tests/1 | do not match string lacking nul | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/14/tests/1 | character looks the same but uses a different codepoint | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:enum.json#/groups/15/tests/1 | character looks the same but uses combining marks | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:infinite-loop-detection.json#/groups/0/tests/1 | failing case | PASS | {"keywordLocation":"#/allOf/0/properties/foo/$ref/type","instanceLocation":"#/foo"} |
| draft4:items.json#/groups/0/tests/1 | wrong type of items | PASS | {"keywordLocation":"#/items/type","instanceLocation":"#/1"} |
| draft4:items.json#/groups/1/tests/1 | wrong types | PASS | {"keywordLocation":"#/0/type","instanceLocation":"#/0"} |
| draft4:items.json#/groups/2/tests/1 | too many items | PASS | {"keywordLocation":"#/additionalItems","instanceLocation":"#"} |
| draft4:items.json#/groups/2/tests/2 | too many sub-items | PASS | {"keywordLocation":"#/0/$ref/additionalItems","instanceLocation":"#/0"} |
| draft4:items.json#/groups/2/tests/3 | wrong item | PASS | {"keywordLocation":"#/0/$ref/type","instanceLocation":"#/0"} |
| draft4:items.json#/groups/2/tests/4 | wrong sub-item | PASS | {"keywordLocation":"#/0/$ref/0/$ref/required","instanceLocation":"#/0/0/foo"} |
| draft4:items.json#/groups/3/tests/1 | nested array with invalid type | PASS | {"keywordLocation":"#/items/items/items/items/type","instanceLocation":"#/0/0/0/0"} |
| draft4:items.json#/groups/3/tests/2 | not deep enough | PASS | {"keywordLocation":"#/items/items/items/type","instanceLocation":"#/0/0/0"} |
| draft4:maximum.json#/groups/0/tests/2 | above the maximum is invalid | PASS | {"keywordLocation":"#/maximum","instanceLocation":"#"} |
| draft4:maximum.json#/groups/1/tests/3 | above the maximum is invalid | PASS | {"keywordLocation":"#/maximum","instanceLocation":"#"} |
| draft4:maximum.json#/groups/2/tests/2 | above the maximum is invalid | PASS | {"keywordLocation":"#/maximum","instanceLocation":"#"} |
| draft4:maximum.json#/groups/3/tests/1 | boundary point is invalid | PASS | {"keywordLocation":"#/maximum","instanceLocation":"#"} |
| draft4:maxItems.json#/groups/0/tests/2 | too long is invalid | PASS | {"keywordLocation":"#/maxItems","instanceLocation":"#"} |
| draft4:maxLength.json#/groups/0/tests/2 | too long is invalid | PASS | {"keywordLocation":"#/maxLength","instanceLocation":"#"} |
| draft4:maxProperties.json#/groups/0/tests/2 | too long is invalid | PASS | {"keywordLocation":"#/maxProperties","instanceLocation":"#"} |
| draft4:maxProperties.json#/groups/1/tests/1 | one property is invalid | PASS | {"keywordLocation":"#/maxProperties","instanceLocation":"#"} |
| draft4:minimum.json#/groups/0/tests/2 | below the minimum is invalid | PASS | {"keywordLocation":"#/minimum","instanceLocation":"#"} |
| draft4:minimum.json#/groups/1/tests/2 | below the minimum is invalid | PASS | {"keywordLocation":"#/minimum","instanceLocation":"#"} |
| draft4:minimum.json#/groups/2/tests/1 | boundary point is invalid | PASS | {"keywordLocation":"#/minimum","instanceLocation":"#"} |
| draft4:minimum.json#/groups/3/tests/4 | float below the minimum is invalid | PASS | {"keywordLocation":"#/minimum","instanceLocation":"#"} |
| draft4:minimum.json#/groups/3/tests/5 | int below the minimum is invalid | PASS | {"keywordLocation":"#/minimum","instanceLocation":"#"} |
| draft4:minItems.json#/groups/0/tests/2 | too short is invalid | PASS | {"keywordLocation":"#/minItems","instanceLocation":"#"} |
| draft4:minLength.json#/groups/0/tests/2 | too short is invalid | PASS | {"keywordLocation":"#/minLength","instanceLocation":"#"} |
| draft4:minLength.json#/groups/0/tests/4 | one grapheme is not long enough | PASS | {"keywordLocation":"#/minLength","instanceLocation":"#"} |
| draft4:minProperties.json#/groups/0/tests/2 | too short is invalid | PASS | {"keywordLocation":"#/minProperties","instanceLocation":"#"} |
| draft4:multipleOf.json#/groups/0/tests/1 | int by int fail | PASS | {"keywordLocation":"#/multipleOf","instanceLocation":"#"} |
| draft4:multipleOf.json#/groups/1/tests/3 | 35 is not multiple of 1.5 | PASS | {"keywordLocation":"#/multipleOf","instanceLocation":"#"} |
| draft4:multipleOf.json#/groups/2/tests/1 | 0.00751 is not multiple of 0.0001 | PASS | {"keywordLocation":"#/multipleOf","instanceLocation":"#"} |
| draft4:multipleOf.json#/groups/3/tests/0 | invalid, but naive implementations may raise an overflow error | PASS | {"keywordLocation":"#/multipleOf","instanceLocation":"#"} |
| draft4:not.json#/groups/0/tests/1 | disallowed | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/1/tests/1 | mismatch | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/1/tests/2 | other mismatch | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/2/tests/2 | mismatch | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/3/tests/0 | property present | PASS | {"keywordLocation":"#/properties/foo/not","instanceLocation":"#/foo"} |
| draft4:not.json#/groups/4/tests/0 | number is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/4/tests/1 | string is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/4/tests/2 | boolean true is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/4/tests/3 | boolean false is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/4/tests/4 | null is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/4/tests/5 | object is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/4/tests/6 | empty object is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/4/tests/7 | array is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:not.json#/groups/4/tests/8 | empty array is invalid | PASS | {"keywordLocation":"#/not","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/0/tests/2 | both oneOf valid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/0/tests/3 | neither oneOf valid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/1/tests/0 | mismatch base schema | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/1/tests/2 | both oneOf valid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/2/tests/2 | both oneOf valid (complex) | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/2/tests/3 | neither oneOf valid (complex) | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/3/tests/1 | both valid - invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/4/tests/0 | both invalid - invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/4/tests/3 | both valid - invalid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/5/tests/2 | both oneOf valid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/5/tests/3 | neither oneOf valid | PASS | {"keywordLocation":"#/oneOf","instanceLocation":"#"} |
| draft4:oneOf.json#/groups/6/tests/1 | anything non-null is invalid | PASS | {"keywordLocation":"#/allOf/0/allOf/0/type","instanceLocation":"#"} |
| draft4:optional/bignum.json#/groups/2/tests/0 | a bignum is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:optional/bignum.json#/groups/4/tests/0 | comparison works for high numbers | PASS | {"keywordLocation":"#/maximum","instanceLocation":"#"} |
| draft4:optional/bignum.json#/groups/6/tests/0 | comparison works for very negative numbers | PASS | {"keywordLocation":"#/minimum","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/0/tests/0 | matches in Python, but not in ECMA 262 | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/1/tests/0 | does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/2/tests/0 | does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/3/tests/0 | does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/4/tests/1 | NKO DIGIT ZERO does not match (unlike e.g. Python) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/4/tests/2 | NKO DIGIT ZERO (as \u escape) does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/5/tests/0 | ASCII zero does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/6/tests/1 | latin-1 e-acute does not match (unlike e.g. Python) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/7/tests/0 | ASCII 'a' does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/8/tests/9 | Non-whitespace control does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/8/tests/10 | Non-whitespace does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/0 | ASCII space does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/1 | Character tabulation does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/2 | Line tabulation does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/3 | Form feed does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/4 | latin-1 non-breaking-space does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/5 | zero-width whitespace does not match | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/6 | line feed does not match (line terminator) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/7 | paragraph separator does not match (line terminator) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/8 | EM SPACE does not match (Space_Separator) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/10/tests/3 | unicode matching is case-sensitive | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/11/tests/1 | literal unicode character in json string | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/11/tests/2 | unicode character in hex format in string | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/11/tests/3 | unicode matching is case-sensitive | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/12/tests/0 | literal unicode character in json string | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/12/tests/1 | unicode character in hex format in string | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/13/tests/1 | ascii non-digits | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/13/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/14/tests/1 | ascii non-digits | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/ecmascript-regex.json#/groups/15/tests/3 | unicode matching is case-sensitive | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/L'ÉCOLE"} |
| draft4:optional/ecmascript-regex.json#/groups/16/tests/1 | literal unicode character in json string | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/l'école"} |
| draft4:optional/ecmascript-regex.json#/groups/16/tests/2 | unicode character in hex format in string | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/l'école"} |
| draft4:optional/ecmascript-regex.json#/groups/16/tests/3 | unicode matching is case-sensitive | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/L'ÉCOLE"} |
| draft4:optional/ecmascript-regex.json#/groups/17/tests/0 | literal unicode character in json string | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/l'école"} |
| draft4:optional/ecmascript-regex.json#/groups/17/tests/1 | unicode character in hex format in string | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/l'école"} |
| draft4:optional/ecmascript-regex.json#/groups/18/tests/1 | ascii non-digits | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/-%#"} |
| draft4:optional/ecmascript-regex.json#/groups/18/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/৪২"} |
| draft4:optional/ecmascript-regex.json#/groups/19/tests/1 | ascii non-digits | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/-%#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/12 | an invalid date-time past leap second, UTC | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/13 | an invalid date-time with leap second on a wrong minute, UTC | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/14 | an invalid date-time with leap second on a wrong hour, UTC | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/15 | an invalid hour in date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/16 | an invalid minute in date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/17 | an invalid offset minute in date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/18 | an invalid day in date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/19 | an invalid offset in date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/20 | an invalid closing Z after time-zone offset | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/21 | an invalid date-time string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/23 | only RFC3339 not all of ISO 8601 are valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/24 | invalid non-padded month dates | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/25 | invalid non-padded day dates | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/26 | invalid non-ASCII '৪' (a Bengali 4) in date portion | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/27 | invalid non-ASCII '৪' (a Bengali 4) in time portion | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/date-time.json#/groups/0/tests/28 | invalid extended year | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/email.json#/groups/0/tests/7 | an invalid e-mail address | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/email.json#/groups/0/tests/11 | dot before local part is not valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/email.json#/groups/0/tests/12 | dot after local part is not valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/email.json#/groups/0/tests/14 | two subsequent dots inside local part are not valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/email.json#/groups/0/tests/15 | two email addresses is not valid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/email.json#/groups/0/tests/16 | full "From" header is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/email.json#/groups/0/tests/17 | local part is required | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/email.json#/groups/0/tests/18 | domain is required | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/email.json#/groups/0/tests/19 | unquoted space in local part is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/9 | a host name starting with an illegal character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/10 | a host name containing illegal characters | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/11 | a host name with a component too long | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/12 | starts with hyphen | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/13 | ends with hyphen | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/14 | starts with underscore | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/15 | ends with underscore | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/16 | contains underscore | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/18 | exceeds maximum label length | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/23 | empty string | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/24 | single dot | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/25 | leading dot | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/hostname.json#/groups/0/tests/27 | IDN label separator | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/7 | an IP address with too many components | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/8 | an IP address with out-of-range values | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/9 | an IP address without 4 components | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/10 | a 2-part address resolving to a routable IP (inet_aton shorthand) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/11 | a 3-part address resolving to a routable IP (inet_aton shorthand) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/12 | an IP address as an integer | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/13 | an IP address as an integer (decimal) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/14 | invalid non-ASCII '২' (a Bengali 2) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/15 | invalid fullwidth digits (non-ASCII) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/16 | invalid mathematical bold digits (non-ASCII) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/17 | netmask is not a part of ipv4 address | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/18 | leading whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/19 | trailing whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/20 | trailing newline is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/21 | hexadecimal notation is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/22 | octal notation explicit is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/23 | empty part (double dot) is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/24 | leading dot is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/25 | trailing dot is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/28 | empty string is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/29 | plus sign is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/30 | negative sign is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/31 | exponential notation is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/32 | alpha characters are invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/33 | internal whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/34 | tab character is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/35 | additional content after an embedded NUL byte | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv4.json#/groups/0/tests/36 | with port number is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/7 | a group with 5 hex digits is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/9 | trailing 5 hex symbols is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/10 | an IPv6 address with too many components | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/11 | an IPv6 address containing illegal characters | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/15 | missing leading octet is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/16 | missing trailing octet is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/17 | missing leading octet with omitted octets later | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/19 | two sets of double colons is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/22 | mixed format with ipv4 section with octet out of range | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/23 | mixed format with ipv4 section with a hex octet | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/25 | triple colons is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/27 | insufficient octets without double colons | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/28 | no colons is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/29 | ipv4 is not ipv6 | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/30 | ipv4 segment must have 4 octets | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/31 | leading whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/32 | trailing whitespace is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/33 | netmask is not a part of ipv6 address | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/34 | zone id is not a part of ipv6 address | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/36 | a long invalid ipv6, below length limit, first | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/37 | a long invalid ipv6, below length limit, second | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/38 | invalid non-ASCII '৪' (a Bengali 4) | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/ipv6.json#/groups/0/tests/39 | invalid non-ASCII '৪' (a Bengali 4) in the IPv4 portion | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/unknown.json#/groups/0/tests/0 | unknown formats ignore integers | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/1 | unknown formats ignore floats | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/2 | unknown formats ignore objects | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/3 | unknown formats ignore arrays | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/4 | unknown formats ignore booleans | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/5 | unknown formats ignore nulls | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/6 | unknown formats ignore strings | COMPILE | FAST_COMPILE_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/uri.json#/groups/0/tests/19 | an invalid protocol-relative URI Reference | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/20 | an invalid relative URI Reference | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/21 | an invalid URI | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/22 | an invalid URI though valid URI reference | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/23 | an invalid URI with spaces | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/24 | an invalid URI with spaces and missing scheme | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/25 | an invalid URI with comma in scheme | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/26 | invalid userinfo | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/27 | unescaped non US-ASCII characters | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/28 | invalid backslash character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/29 | invalid " character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/30 | invalid <> characters | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/31 | invalid {} characters | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/32 | invalid ^ character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/33 | invalid ` character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/34 | invalid SPACE character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/35 | invalid \| character | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/38 | invalid percent-encoding with non-hex digits | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/39 | incomplete percent-encoding triplet | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/40 | lone percent sign is invalid | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/41 | scheme must start with a letter | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/format/uri.json#/groups/0/tests/42 | invalid character in scheme | PASS | {"keywordLocation":"#/format","instanceLocation":"#"} |
| draft4:optional/id.json#/groups/0/tests/2 | no match on enum or $ref to id | PASS | {"keywordLocation":"#/anyOf","instanceLocation":"#"} |
| draft4:optional/non-bmp-regex.json#/groups/0/tests/3 | doesn't match one | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/non-bmp-regex.json#/groups/0/tests/4 | doesn't match two | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/non-bmp-regex.json#/groups/0/tests/5 | doesn't match one ASCII | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/non-bmp-regex.json#/groups/0/tests/6 | doesn't match two ASCII | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:optional/non-bmp-regex.json#/groups/1/tests/3 | doesn't match one | PASS | {"keywordLocation":"#/patternProperties/^🐲*$/type","instanceLocation":"#/🐲"} |
| draft4:optional/non-bmp-regex.json#/groups/1/tests/4 | doesn't match two | PASS | {"keywordLocation":"#/patternProperties/^🐲*$/type","instanceLocation":"#/🐲🐲"} |
| draft4:pattern.json#/groups/0/tests/1 | a non-matching pattern is invalid | PASS | {"keywordLocation":"#/pattern","instanceLocation":"#"} |
| draft4:patternProperties.json#/groups/0/tests/2 | a single invalid match is invalid | PASS | {"keywordLocation":"#/patternProperties/f.*o/type","instanceLocation":"#/foo"} |
| draft4:patternProperties.json#/groups/0/tests/3 | multiple invalid matches is invalid | PASS | {"keywordLocation":"#/patternProperties/f.*o/type","instanceLocation":"#/foo"} |
| draft4:patternProperties.json#/groups/1/tests/3 | an invalid due to one is invalid | PASS | {"keywordLocation":"#/patternProperties/a*/type","instanceLocation":"#/a"} |
| draft4:patternProperties.json#/groups/1/tests/4 | an invalid due to the other is invalid | PASS | {"keywordLocation":"#/patternProperties/aaa*/maximum","instanceLocation":"#/aaaa"} |
| draft4:patternProperties.json#/groups/1/tests/5 | an invalid due to both is invalid | PASS | {"keywordLocation":"#/patternProperties/a*/type","instanceLocation":"#/aaa"} |
| draft4:patternProperties.json#/groups/2/tests/1 | recognized members are accounted for | PASS | {"keywordLocation":"#/patternProperties/[0-9]{2,}/type","instanceLocation":"#/a31b"} |
| draft4:patternProperties.json#/groups/2/tests/3 | regexes are case sensitive, 2 | PASS | {"keywordLocation":"#/patternProperties/X_/type","instanceLocation":"#/a_X_3"} |
| draft4:properties.json#/groups/0/tests/1 | one property invalid is invalid | PASS | {"keywordLocation":"#/properties/bar/type","instanceLocation":"#/bar"} |
| draft4:properties.json#/groups/0/tests/2 | both properties invalid is invalid | PASS | {"keywordLocation":"#/properties/foo/type","instanceLocation":"#/foo"} |
| draft4:properties.json#/groups/1/tests/1 | property invalidates property | PASS | {"keywordLocation":"#/properties/foo/maxItems","instanceLocation":"#/foo"} |
| draft4:properties.json#/groups/1/tests/2 | patternProperty invalidates property | PASS | {"keywordLocation":"#/patternProperties/f.o/minItems","instanceLocation":"#/foo"} |
| draft4:properties.json#/groups/1/tests/4 | patternProperty invalidates nonproperty | PASS | {"keywordLocation":"#/patternProperties/f.o/minItems","instanceLocation":"#/fxo"} |
| draft4:properties.json#/groups/1/tests/7 | additionalProperty invalidates others | PASS | {"keywordLocation":"#/additionalProperties/type","instanceLocation":"#/quux"} |
| draft4:properties.json#/groups/2/tests/1 | object with strings is invalid | PASS | {"keywordLocation":"#/properties/foo\nbar/type","instanceLocation":"#/foo\nbar"} |
| draft4:properties.json#/groups/4/tests/3 | __proto__ not valid | PASS | {"keywordLocation":"#/properties/__proto__/type","instanceLocation":"#/__proto__"} |
| draft4:properties.json#/groups/4/tests/4 | toString not valid | PASS | {"keywordLocation":"#/properties/toString/properties/length/type","instanceLocation":"#/toString/length"} |
| draft4:properties.json#/groups/4/tests/5 | constructor not valid | PASS | {"keywordLocation":"#/properties/constructor/type","instanceLocation":"#/constructor"} |
| draft4:ref.json#/groups/0/tests/2 | mismatch | PASS | {"keywordLocation":"#/additionalProperties","instanceLocation":"#/bar"} |
| draft4:ref.json#/groups/0/tests/3 | recursive mismatch | PASS | {"keywordLocation":"#/properties/foo/$ref/additionalProperties","instanceLocation":"#/foo/bar"} |
| draft4:ref.json#/groups/1/tests/1 | mismatch | PASS | {"keywordLocation":"#/properties/bar/$ref/type","instanceLocation":"#/bar"} |
| draft4:ref.json#/groups/2/tests/1 | mismatch array | PASS | {"keywordLocation":"#/1/$ref/type","instanceLocation":"#/1"} |
| draft4:ref.json#/groups/3/tests/0 | slash invalid | PASS | {"keywordLocation":"#/properties/slash/$ref/type","instanceLocation":"#/slash"} |
| draft4:ref.json#/groups/3/tests/1 | tilde invalid | PASS | {"keywordLocation":"#/properties/tilde/$ref/type","instanceLocation":"#/tilde"} |
| draft4:ref.json#/groups/3/tests/2 | percent invalid | PASS | {"keywordLocation":"#/properties/percent/$ref/type","instanceLocation":"#/percent"} |
| draft4:ref.json#/groups/4/tests/1 | nested ref invalid | PASS | {"keywordLocation":"#/allOf/0/$ref/$ref/$ref/type","instanceLocation":"#"} |
| draft4:ref.json#/groups/5/tests/2 | ref invalid | PASS | {"keywordLocation":"#/properties/foo/$ref/type","instanceLocation":"#/foo"} |
| draft4:ref.json#/groups/6/tests/0 | $ref resolves to /definitions/base_foo, data does not validate | PASS | {"keywordLocation":"#/allOf/0/$ref/type","instanceLocation":"#"} |
| draft4:ref.json#/groups/7/tests/0 | remote ref valid | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |
| draft4:ref.json#/groups/7/tests/1 | remote ref invalid | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |
| draft4:ref.json#/groups/8/tests/1 | property named $ref invalid | PASS | {"keywordLocation":"#/properties/$ref/type","instanceLocation":"#/$ref"} |
| draft4:ref.json#/groups/9/tests/1 | property named $ref invalid | PASS | {"keywordLocation":"#/properties/$ref/$ref/type","instanceLocation":"#/$ref"} |
| draft4:ref.json#/groups/10/tests/1 | invalid tree | PASS | {"keywordLocation":"#/properties/nodes/items/$ref/properties/subtree/$ref/properties/nodes/items/$ref/properties/value/type","instanceLocation":"#/nodes/0/subtree/nodes/0/value"} |
| draft4:ref.json#/groups/11/tests/1 | object with strings is invalid | PASS | {"keywordLocation":"#/properties/foo\"bar/$ref/type","instanceLocation":"#/foo\"bar"} |
| draft4:ref.json#/groups/12/tests/1 | mismatch | PASS | {"keywordLocation":"#/allOf/0/$ref/type","instanceLocation":"#"} |
| draft4:ref.json#/groups/13/tests/1 | mismatch | PASS | {"keywordLocation":"#/allOf/0/$ref/type","instanceLocation":"#"} |
| draft4:ref.json#/groups/14/tests/0 | do not evaluate the $ref inside the enum, matching any string | PASS | {"keywordLocation":"#/enum","instanceLocation":"#"} |
| draft4:ref.json#/groups/15/tests/1 | non-number is invalid | PASS | {"keywordLocation":"#/allOf/0/$ref/type","instanceLocation":"#"} |
| draft4:ref.json#/groups/16/tests/1 | non-number is invalid | PASS | {"keywordLocation":"#/allOf/0/$ref/type","instanceLocation":"#"} |
| draft4:ref.json#/groups/17/tests/1 | non-number is invalid | PASS | {"keywordLocation":"#/allOf/0/$ref/type","instanceLocation":"#"} |
| draft4:ref.json#/groups/18/tests/1 | non-number is invalid | PASS | {"keywordLocation":"#/allOf/0/$ref/type","instanceLocation":"#"} |
| draft4:refRemote.json#/groups/0/tests/1 | remote ref invalid | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft4:refRemote.json#/groups/1/tests/1 | remote fragment invalid | PASS | {"keywordLocation":"#/$ref/type","instanceLocation":"#"} |
| draft4:refRemote.json#/groups/2/tests/1 | ref within ref invalid | PASS | {"keywordLocation":"#/$ref/$ref/type","instanceLocation":"#"} |
| draft4:refRemote.json#/groups/3/tests/1 | base URI change ref invalid | PASS | {"keywordLocation":"#/items/items/$ref/type","instanceLocation":"#/0/0"} |
| draft4:refRemote.json#/groups/4/tests/1 | string is invalid | PASS | {"keywordLocation":"#/properties/list/$ref/items/$ref/type","instanceLocation":"#/list/0"} |
| draft4:refRemote.json#/groups/5/tests/1 | string is invalid | PASS | {"keywordLocation":"#/properties/list/$ref/items/$ref/type","instanceLocation":"#/list/0"} |
| draft4:refRemote.json#/groups/6/tests/2 | object is invalid | PASS | {"keywordLocation":"#/properties/name/$ref/anyOf","instanceLocation":"#/name"} |
| draft4:refRemote.json#/groups/7/tests/1 | string is invalid | PASS | {"keywordLocation":"#/$ref/$ref/type","instanceLocation":"#"} |
| draft4:required.json#/groups/0/tests/1 | non-present required property is invalid | PASS | {"keywordLocation":"#/required","instanceLocation":"#/foo"} |
| draft4:required.json#/groups/2/tests/1 | object with some properties missing is invalid | PASS | {"keywordLocation":"#/required","instanceLocation":"#/foo\\bar"} |
| draft4:required.json#/groups/3/tests/2 | none of the properties mentioned | PASS | {"keywordLocation":"#/required","instanceLocation":"#/__proto__"} |
| draft4:required.json#/groups/3/tests/3 | __proto__ present | PASS | {"keywordLocation":"#/required","instanceLocation":"#/toString"} |
| draft4:required.json#/groups/3/tests/4 | toString present | PASS | {"keywordLocation":"#/required","instanceLocation":"#/__proto__"} |
| draft4:required.json#/groups/3/tests/5 | constructor present | PASS | {"keywordLocation":"#/required","instanceLocation":"#/__proto__"} |
| draft4:type.json#/groups/0/tests/1 | a float is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/0/tests/2 | a string is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/0/tests/3 | a string is still not an integer, even if it looks like one | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/0/tests/4 | an object is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/0/tests/5 | an array is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/0/tests/6 | a boolean is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/0/tests/7 | null is not an integer | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/1/tests/3 | a string is not a number | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/1/tests/4 | a string is still not a number, even if it looks like one | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/1/tests/5 | an object is not a number | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/1/tests/6 | an array is not a number | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/1/tests/7 | a boolean is not a number | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/1/tests/8 | null is not a number | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/2/tests/0 | 1 is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/2/tests/1 | a float is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/2/tests/5 | an object is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/2/tests/6 | an array is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/2/tests/7 | a boolean is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/2/tests/8 | null is not a string | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/3/tests/0 | an integer is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/3/tests/1 | a float is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/3/tests/2 | a string is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/3/tests/4 | an array is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/3/tests/5 | a boolean is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/3/tests/6 | null is not an object | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/4/tests/0 | an integer is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/4/tests/1 | a float is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/4/tests/2 | a string is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/4/tests/3 | an object is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/4/tests/5 | a boolean is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/4/tests/6 | null is not an array | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/5/tests/0 | an integer is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/5/tests/1 | zero is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/5/tests/2 | a float is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/5/tests/3 | a string is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/5/tests/4 | an empty string is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/5/tests/5 | an object is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/5/tests/6 | an array is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/5/tests/9 | null is not a boolean | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/6/tests/0 | an integer is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/6/tests/1 | a float is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/6/tests/2 | zero is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/6/tests/3 | a string is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/6/tests/4 | an empty string is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/6/tests/5 | an object is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/6/tests/6 | an array is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/6/tests/7 | true is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/6/tests/8 | false is not null | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/7/tests/2 | a float is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/7/tests/3 | an object is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/7/tests/4 | an array is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/7/tests/5 | a boolean is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/7/tests/6 | null is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/8/tests/1 | number is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/9/tests/2 | number is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/9/tests/3 | string is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/9/tests/4 | null is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/10/tests/3 | number is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:type.json#/groups/10/tests/4 | string is invalid | PASS | {"keywordLocation":"#/type","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/0/tests/1 | non-unique array of integers is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/0/tests/2 | non-unique array of more than two integers is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/0/tests/3 | numbers are unique if mathematically unequal | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/0/tests/7 | non-unique array of strings is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/0/tests/9 | non-unique array of objects is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/0/tests/10 | property order of array of objects is ignored | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/0/tests/12 | non-unique array of nested objects is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/0/tests/14 | non-unique array of arrays is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/0/tests/15 | non-unique array of more than two arrays is invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/0/tests/23 | non-unique heterogeneous types are invalid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/0/tests/25 | objects are non-unique despite key order | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/1/tests/2 | [false, false] from items array is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/1/tests/3 | [true, true] from items array is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/1/tests/6 | non-unique array extended from [false, true] is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/1/tests/7 | non-unique array extended from [true, false] is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/2/tests/2 | [false, false] from items array is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/2/tests/3 | [true, true] from items array is not valid | PASS | {"keywordLocation":"#/uniqueItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/2/tests/4 | extra items are invalid even if unique | PASS | {"keywordLocation":"#/additionalItems","instanceLocation":"#"} |
| draft4:uniqueItems.json#/groups/5/tests/4 | extra items are invalid even if unique | PASS | {"keywordLocation":"#/additionalItems","instanceLocation":"#"} |

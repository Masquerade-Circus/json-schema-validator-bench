# Conformance: [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) draft4

## Report options

| Profile | Options | SHA-256 |
| --- | --- | --- |
| base | {"formatProfile":"base","fast":{"allErrors":true,"coerceTypes":false,"useDefaults":false,"removeAdditional":false,"strict":false,"validateFormats":true,"messages":false},"detailed":{"allErrors":true,"coerceTypes":false,"useDefaults":false,"removeAdditional":false,"strict":false,"validateFormats":true,"messages":true},"formats":{"mode":"full","names":["date","time","date-time","duration","email","hostname","ipv4","ipv6","uuid","uri","uri-reference","uri-template","regex","json-pointer","relative-json-pointer"],"keywords":false},"implementation":{"core":{"packageName":"@redocly/ajv","version":"8.18.3"},"constructor":{"packageName":"@redocly/ajv","version":"8.18.3","entrypoint":"@redocly/ajv/dist/draft4.js"}}} | 7afcbb6e15a58ae1d1f674edc867e3cc2c768cebcaa5f3b1d0cfdbfc93a7d9b7 |
| format-assertion | {"formatProfile":"format-assertion","fast":{"allErrors":true,"coerceTypes":false,"useDefaults":false,"removeAdditional":false,"strict":false,"validateFormats":true,"messages":false},"detailed":{"allErrors":true,"coerceTypes":false,"useDefaults":false,"removeAdditional":false,"strict":false,"validateFormats":true,"messages":true},"formats":{"mode":"full","names":["date","time","date-time","duration","email","hostname","ipv4","ipv6","uuid","uri","uri-reference","uri-template","regex","json-pointer","relative-json-pointer"],"keywords":false},"implementation":{"core":{"packageName":"@redocly/ajv","version":"8.18.3"},"constructor":{"packageName":"@redocly/ajv","version":"8.18.3","entrypoint":"@redocly/ajv/dist/draft4.js"}}} | 73fe8ee6d39ec896725ee34e8955c0f6d6100f1d527df949eccf68b59e52446d |

## Counts

| Profile | Status | Cases | Percentage |
| --- | --- | ---: | ---: |
| base | PASS | 708 | 98.61% |
| base | WRONG | 10 | 1.39% |
| base | COMPILE | 0 | 0.00% |
| base | RUNTIME | 0 | 0.00% |
| base | UNSUPPORTED | 0 | 0.00% |
| format-assertion | PASS | 204 | 99.03% |
| format-assertion | WRONG | 2 | 0.97% |
| format-assertion | COMPILE | 0 | 0.00% |
| format-assertion | RUNTIME | 0 | 0.00% |
| format-assertion | UNSUPPORTED | 0 | 0.00% |

## Non-PASS cases

| Case ID | Description | Expected | Observed | Status | Error |
| --- | --- | --- | --- | --- | --- |
| draft4:optional/float-overflow.json#/groups/0/tests/0 | valid if optional overflow handling is implemented | true | false | WRONG | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 0.5"} |
| draft4:optional/format/hostname.json#/groups/0/tests/26 | trailing dot | false | true | WRONG |  |
| draft4:optional/format/uri.json#/groups/0/tests/43 | non-numeric port is invalid | false | true | WRONG |  |
| draft4:optional/zeroTerminatedFloats.json#/groups/0/tests/0 | a float is not an integer even without fractional part | false | true | WRONG |  |
| draft4:properties.json#/groups/4/tests/2 | none of the properties mentioned | true | false | WRONG | {"keyword":"type","instancePath":"/constructor","schemaPath":"#/properties/constructor/type","message":"must be number"} |
| draft4:ref.json#/groups/5/tests/1 | ref valid, maxItems ignored | true | false | WRONG | {"keyword":"maxItems","instancePath":"/foo","schemaPath":"#/properties/foo/maxItems","message":"must NOT have more than 2 items"} |
| draft4:ref.json#/groups/6/tests/0 | $ref resolves to /definitions/base_foo, data does not validate | false | true | WRONG |  |
| draft4:ref.json#/groups/6/tests/1 | $ref resolves to /definitions/base_foo, data validates | true | false | WRONG | {"keyword":"type","instancePath":"","schemaPath":"foo.json/type","message":"must be string"} |
| draft4:required.json#/groups/3/tests/2 | none of the properties mentioned | false | true | WRONG |  |
| draft4:required.json#/groups/3/tests/3 | __proto__ present | false | true | WRONG |  |
| draft4:required.json#/groups/3/tests/4 | toString present | false | true | WRONG |  |
| draft4:required.json#/groups/3/tests/5 | constructor present | false | true | WRONG |  |

## Detailed errors for invalid results

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft4:additionalItems.json#/groups/0/tests/1 | additional items do not match schema | PASS | {"keyword":"type","instancePath":"/3","schemaPath":"#/additionalItems/type","message":"must be integer"} |
| draft4:additionalItems.json#/groups/2/tests/4 | additional items are not permitted | PASS | {"keyword":"additionalItems","instancePath":"","schemaPath":"#/additionalItems","message":"must NOT have more than 3 items"} |
| draft4:additionalItems.json#/groups/5/tests/0 | items defined in allOf are not examined | PASS | {"keyword":"type","instancePath":"/1","schemaPath":"#/additionalItems/type","message":"must be boolean"} |
| draft4:additionalItems.json#/groups/6/tests/1 | wrong type of second item | PASS | {"keyword":"type","instancePath":"/1","schemaPath":"#/additionalItems/type","message":"must be integer"} |
| draft4:additionalItems.json#/groups/7/tests/0 | heterogeneous invalid instance | PASS | {"keyword":"additionalItems","instancePath":"","schemaPath":"#/additionalItems","message":"must NOT have more than 1 items"} |
| draft4:additionalProperties.json#/groups/0/tests/1 | an additional property is invalid | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:additionalProperties.json#/groups/1/tests/1 | not matching the pattern is invalid | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:additionalProperties.json#/groups/2/tests/2 | an additional invalid property is invalid | PASS | {"keyword":"type","instancePath":"/quux","schemaPath":"#/additionalProperties/type","message":"must be boolean"} |
| draft4:additionalProperties.json#/groups/3/tests/1 | an additional invalid property is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/additionalProperties/type","message":"must be boolean"} |
| draft4:additionalProperties.json#/groups/5/tests/0 | properties defined in allOf are not examined | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/additionalProperties/type","message":"must be boolean"} |
| draft4:allOf.json#/groups/0/tests/1 | mismatch second | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/allOf/0/required","message":"must have required property 'bar'"} |
| draft4:allOf.json#/groups/0/tests/2 | mismatch first | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/allOf/1/required","message":"must have required property 'foo'"} |
| draft4:allOf.json#/groups/0/tests/3 | wrong type | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/allOf/0/properties/bar/type","message":"must be integer"} |
| draft4:allOf.json#/groups/1/tests/1 | mismatch base schema | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'bar'"} |
| draft4:allOf.json#/groups/1/tests/2 | mismatch first allOf | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/allOf/0/required","message":"must have required property 'foo'"} |
| draft4:allOf.json#/groups/1/tests/3 | mismatch second allOf | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/allOf/1/required","message":"must have required property 'baz'"} |
| draft4:allOf.json#/groups/1/tests/4 | mismatch both | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/allOf/0/required","message":"must have required property 'foo'"} |
| draft4:allOf.json#/groups/2/tests/1 | mismatch one | PASS | {"keyword":"maximum","instancePath":"","schemaPath":"#/allOf/0/maximum","message":"must be <= 30"} |
| draft4:allOf.json#/groups/5/tests/1 | string is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/allOf/1/type","message":"must be number"} |
| draft4:allOf.json#/groups/6/tests/1 | string is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/allOf/0/type","message":"must be number"} |
| draft4:allOf.json#/groups/7/tests/1 | anything non-null is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/allOf/0/allOf/0/type","message":"must be null"} |
| draft4:allOf.json#/groups/8/tests/0 | allOf: false, anyOf: false, oneOf: false | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/anyOf/0/multipleOf","message":"must be multiple of 3"} |
| draft4:allOf.json#/groups/8/tests/1 | allOf: false, anyOf: false, oneOf: true | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/anyOf/0/multipleOf","message":"must be multiple of 3"} |
| draft4:allOf.json#/groups/8/tests/2 | allOf: false, anyOf: true, oneOf: false | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/oneOf/0/multipleOf","message":"must be multiple of 5"} |
| draft4:allOf.json#/groups/8/tests/3 | allOf: false, anyOf: true, oneOf: true | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/allOf/0/multipleOf","message":"must be multiple of 2"} |
| draft4:allOf.json#/groups/8/tests/4 | allOf: true, anyOf: false, oneOf: false | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/anyOf/0/multipleOf","message":"must be multiple of 3"} |
| draft4:allOf.json#/groups/8/tests/5 | allOf: true, anyOf: false, oneOf: true | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/anyOf/0/multipleOf","message":"must be multiple of 3"} |
| draft4:allOf.json#/groups/8/tests/6 | allOf: true, anyOf: true, oneOf: false | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/oneOf/0/multipleOf","message":"must be multiple of 5"} |
| draft4:anyOf.json#/groups/0/tests/3 | neither anyOf valid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/anyOf/0/type","message":"must be integer"} |
| draft4:anyOf.json#/groups/1/tests/0 | mismatch base schema | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft4:anyOf.json#/groups/1/tests/2 | both anyOf invalid | PASS | {"keyword":"maxLength","instancePath":"","schemaPath":"#/anyOf/0/maxLength","message":"must NOT have more than 2 characters"} |
| draft4:anyOf.json#/groups/2/tests/3 | neither anyOf valid (complex) | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/anyOf/0/properties/bar/type","message":"must be integer"} |
| draft4:anyOf.json#/groups/4/tests/1 | anything non-null is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/anyOf/0/anyOf/0/type","message":"must be null"} |
| draft4:default.json#/groups/2/tests/1 | an explicit property value is checked against maximum (failing) | PASS | {"keyword":"maximum","instancePath":"/alpha","schemaPath":"#/properties/alpha/maximum","message":"must be <= 3"} |
| draft4:definitions.json#/groups/0/tests/1 | invalid definition schema | PASS | {"keyword":"enum","instancePath":"/definitions/foo/type","schemaPath":"#/definitions/simpleTypes/enum","message":"must be equal to one of the allowed values"} |
| draft4:dependencies.json#/groups/0/tests/3 | missing dependency | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have property foo when property bar is present"} |
| draft4:dependencies.json#/groups/1/tests/3 | missing dependency | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have properties foo, bar when property quux is present"} |
| draft4:dependencies.json#/groups/1/tests/4 | missing other dependency | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have properties foo, bar when property quux is present"} |
| draft4:dependencies.json#/groups/1/tests/5 | missing both dependencies | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have properties foo, bar when property quux is present"} |
| draft4:dependencies.json#/groups/2/tests/2 | wrong type | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/dependencies/bar/properties/foo/type","message":"must be integer"} |
| draft4:dependencies.json#/groups/2/tests/3 | wrong type other | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/dependencies/bar/properties/bar/type","message":"must be integer"} |
| draft4:dependencies.json#/groups/2/tests/4 | wrong type both | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/dependencies/bar/properties/foo/type","message":"must be integer"} |
| draft4:dependencies.json#/groups/3/tests/3 | invalid object 1 | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have property foo\rbar when property foo\nbar is present"} |
| draft4:dependencies.json#/groups/3/tests/4 | invalid object 2 | PASS | {"keyword":"minProperties","instancePath":"","schemaPath":"#/dependencies/foo%09bar/minProperties","message":"must NOT have fewer than 4 properties"} |
| draft4:dependencies.json#/groups/3/tests/5 | invalid object 3 | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/dependencies/foo'bar/required","message":"must have required property 'foo\"bar'"} |
| draft4:dependencies.json#/groups/3/tests/6 | invalid object 4 | PASS | {"keyword":"dependencies","instancePath":"","schemaPath":"#/dependencies","message":"must have property foo'bar when property foo\"bar is present"} |
| draft4:dependencies.json#/groups/4/tests/0 | matches root | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/dependencies/foo/additionalProperties","message":"must NOT have additional properties"} |
| draft4:dependencies.json#/groups/4/tests/2 | matches both | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/dependencies/foo/additionalProperties","message":"must NOT have additional properties"} |
| draft4:enum.json#/groups/0/tests/1 | something else is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/1/tests/1 | something else is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/1/tests/2 | objects are deep compared | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/1/tests/4 | extra properties in object is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/2/tests/2 | something else is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/3/tests/1 | wrong foo value | PASS | {"keyword":"enum","instancePath":"/foo","schemaPath":"#/properties/foo/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/3/tests/2 | wrong bar value | PASS | {"keyword":"enum","instancePath":"/bar","schemaPath":"#/properties/bar/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/3/tests/4 | missing required property is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'bar'"} |
| draft4:enum.json#/groups/3/tests/5 | missing all properties is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'bar'"} |
| draft4:enum.json#/groups/4/tests/2 | another string is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/5/tests/1 | integer zero is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/5/tests/2 | float zero is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/6/tests/1 | [0] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/6/tests/2 | [0.0] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/7/tests/1 | integer one is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/7/tests/2 | float one is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/8/tests/1 | [1] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/8/tests/2 | [1.0] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/9/tests/0 | false is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/10/tests/0 | [false] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/11/tests/0 | true is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/12/tests/0 | [true] is invalid | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/13/tests/1 | do not match string lacking nul | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/14/tests/1 | character looks the same but uses a different codepoint | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:enum.json#/groups/15/tests/1 | character looks the same but uses combining marks | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:infinite-loop-detection.json#/groups/0/tests/1 | failing case | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/definitions/int/type","message":"must be integer"} |
| draft4:items.json#/groups/0/tests/1 | wrong type of items | PASS | {"keyword":"type","instancePath":"/1","schemaPath":"#/items/type","message":"must be integer"} |
| draft4:items.json#/groups/1/tests/1 | wrong types | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/items/0/type","message":"must be integer"} |
| draft4:items.json#/groups/2/tests/1 | too many items | PASS | {"keyword":"additionalItems","instancePath":"","schemaPath":"#/additionalItems","message":"must NOT have more than 3 items"} |
| draft4:items.json#/groups/2/tests/2 | too many sub-items | PASS | {"keyword":"additionalItems","instancePath":"/0","schemaPath":"#/additionalItems","message":"must NOT have more than 2 items"} |
| draft4:items.json#/groups/2/tests/3 | wrong item | PASS | {"keyword":"type","instancePath":"/0","schemaPath":"#/type","message":"must be array"} |
| draft4:items.json#/groups/2/tests/4 | wrong sub-item | PASS | {"keyword":"required","instancePath":"/0/0","schemaPath":"#/definitions/sub-item/required","message":"must have required property 'foo'"} |
| draft4:items.json#/groups/3/tests/1 | nested array with invalid type | PASS | {"keyword":"type","instancePath":"/0/0/0/0","schemaPath":"#/items/items/items/items/type","message":"must be number"} |
| draft4:items.json#/groups/3/tests/2 | not deep enough | PASS | {"keyword":"type","instancePath":"/0/0/0","schemaPath":"#/items/items/items/type","message":"must be array"} |
| draft4:maximum.json#/groups/0/tests/2 | above the maximum is invalid | PASS | {"keyword":"maximum","instancePath":"","schemaPath":"#/maximum","message":"must be <= 3"} |
| draft4:maximum.json#/groups/1/tests/3 | above the maximum is invalid | PASS | {"keyword":"maximum","instancePath":"","schemaPath":"#/maximum","message":"must be <= 300"} |
| draft4:maximum.json#/groups/2/tests/2 | above the maximum is invalid | PASS | {"keyword":"maximum","instancePath":"","schemaPath":"#/maximum","message":"must be <= 3"} |
| draft4:maximum.json#/groups/3/tests/1 | boundary point is invalid | PASS | {"keyword":"maximum","instancePath":"","schemaPath":"#/maximum","message":"must be < 3"} |
| draft4:maxItems.json#/groups/0/tests/2 | too long is invalid | PASS | {"keyword":"maxItems","instancePath":"","schemaPath":"#/maxItems","message":"must NOT have more than 2 items"} |
| draft4:maxLength.json#/groups/0/tests/2 | too long is invalid | PASS | {"keyword":"maxLength","instancePath":"","schemaPath":"#/maxLength","message":"must NOT have more than 2 characters"} |
| draft4:maxProperties.json#/groups/0/tests/2 | too long is invalid | PASS | {"keyword":"maxProperties","instancePath":"","schemaPath":"#/maxProperties","message":"must NOT have more than 2 properties"} |
| draft4:maxProperties.json#/groups/1/tests/1 | one property is invalid | PASS | {"keyword":"maxProperties","instancePath":"","schemaPath":"#/maxProperties","message":"must NOT have more than 0 properties"} |
| draft4:minimum.json#/groups/0/tests/2 | below the minimum is invalid | PASS | {"keyword":"minimum","instancePath":"","schemaPath":"#/minimum","message":"must be >= 1.1"} |
| draft4:minimum.json#/groups/1/tests/2 | below the minimum is invalid | PASS | {"keyword":"minimum","instancePath":"","schemaPath":"#/minimum","message":"must be >= 1.1"} |
| draft4:minimum.json#/groups/2/tests/1 | boundary point is invalid | PASS | {"keyword":"minimum","instancePath":"","schemaPath":"#/minimum","message":"must be > 1.1"} |
| draft4:minimum.json#/groups/3/tests/4 | float below the minimum is invalid | PASS | {"keyword":"minimum","instancePath":"","schemaPath":"#/minimum","message":"must be >= -2"} |
| draft4:minimum.json#/groups/3/tests/5 | int below the minimum is invalid | PASS | {"keyword":"minimum","instancePath":"","schemaPath":"#/minimum","message":"must be >= -2"} |
| draft4:minItems.json#/groups/0/tests/2 | too short is invalid | PASS | {"keyword":"minItems","instancePath":"","schemaPath":"#/minItems","message":"must NOT have fewer than 1 items"} |
| draft4:minLength.json#/groups/0/tests/2 | too short is invalid | PASS | {"keyword":"minLength","instancePath":"","schemaPath":"#/minLength","message":"must NOT have fewer than 2 characters"} |
| draft4:minLength.json#/groups/0/tests/4 | one grapheme is not long enough | PASS | {"keyword":"minLength","instancePath":"","schemaPath":"#/minLength","message":"must NOT have fewer than 2 characters"} |
| draft4:minProperties.json#/groups/0/tests/2 | too short is invalid | PASS | {"keyword":"minProperties","instancePath":"","schemaPath":"#/minProperties","message":"must NOT have fewer than 1 properties"} |
| draft4:multipleOf.json#/groups/0/tests/1 | int by int fail | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 2"} |
| draft4:multipleOf.json#/groups/1/tests/3 | 35 is not multiple of 1.5 | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 1.5"} |
| draft4:multipleOf.json#/groups/2/tests/1 | 0.00751 is not multiple of 0.0001 | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 0.0001"} |
| draft4:multipleOf.json#/groups/3/tests/0 | invalid, but naive implementations may raise an overflow error | PASS | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 0.123456789"} |
| draft4:not.json#/groups/0/tests/1 | disallowed | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/1/tests/1 | mismatch | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/1/tests/2 | other mismatch | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/2/tests/2 | mismatch | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/3/tests/0 | property present | PASS | {"keyword":"not","instancePath":"/foo","schemaPath":"#/properties/foo/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/4/tests/0 | number is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/4/tests/1 | string is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/4/tests/2 | boolean true is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/4/tests/3 | boolean false is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/4/tests/4 | null is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/4/tests/5 | object is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/4/tests/6 | empty object is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/4/tests/7 | array is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:not.json#/groups/4/tests/8 | empty array is invalid | PASS | {"keyword":"not","instancePath":"","schemaPath":"#/not","message":"must NOT be valid"} |
| draft4:oneOf.json#/groups/0/tests/2 | both oneOf valid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft4:oneOf.json#/groups/0/tests/3 | neither oneOf valid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/oneOf/0/type","message":"must be integer"} |
| draft4:oneOf.json#/groups/1/tests/0 | mismatch base schema | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft4:oneOf.json#/groups/1/tests/2 | both oneOf valid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft4:oneOf.json#/groups/2/tests/2 | both oneOf valid (complex) | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft4:oneOf.json#/groups/2/tests/3 | neither oneOf valid (complex) | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/oneOf/0/properties/bar/type","message":"must be integer"} |
| draft4:oneOf.json#/groups/3/tests/1 | both valid - invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft4:oneOf.json#/groups/4/tests/0 | both invalid - invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/oneOf/0/required","message":"must have required property 'foo'"} |
| draft4:oneOf.json#/groups/4/tests/3 | both valid - invalid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft4:oneOf.json#/groups/5/tests/2 | both oneOf valid | PASS | {"keyword":"oneOf","instancePath":"","schemaPath":"#/oneOf","message":"must match exactly one schema in oneOf"} |
| draft4:oneOf.json#/groups/5/tests/3 | neither oneOf valid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/oneOf/0/required","message":"must have required property 'bar'"} |
| draft4:oneOf.json#/groups/6/tests/1 | anything non-null is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/oneOf/0/oneOf/0/type","message":"must be null"} |
| draft4:optional/bignum.json#/groups/2/tests/0 | a bignum is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft4:optional/bignum.json#/groups/4/tests/0 | comparison works for high numbers | PASS | {"keyword":"maximum","instancePath":"","schemaPath":"#/maximum","message":"must be < 9.727837981879871e+26"} |
| draft4:optional/bignum.json#/groups/6/tests/0 | comparison works for very negative numbers | PASS | {"keyword":"minimum","instancePath":"","schemaPath":"#/minimum","message":"must be > -9.727837981879871e+26"} |
| draft4:optional/ecmascript-regex.json#/groups/0/tests/0 | matches in Python, but not in ECMA 262 | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^abc$\""} |
| draft4:optional/ecmascript-regex.json#/groups/1/tests/0 | does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\t$\""} |
| draft4:optional/ecmascript-regex.json#/groups/2/tests/0 | does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\cC$\""} |
| draft4:optional/ecmascript-regex.json#/groups/3/tests/0 | does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\cc$\""} |
| draft4:optional/ecmascript-regex.json#/groups/4/tests/1 | NKO DIGIT ZERO does not match (unlike e.g. Python) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\d$\""} |
| draft4:optional/ecmascript-regex.json#/groups/4/tests/2 | NKO DIGIT ZERO (as \u escape) does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\d$\""} |
| draft4:optional/ecmascript-regex.json#/groups/5/tests/0 | ASCII zero does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\D$\""} |
| draft4:optional/ecmascript-regex.json#/groups/6/tests/1 | latin-1 e-acute does not match (unlike e.g. Python) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\w$\""} |
| draft4:optional/ecmascript-regex.json#/groups/7/tests/0 | ASCII 'a' does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\W$\""} |
| draft4:optional/ecmascript-regex.json#/groups/8/tests/9 | Non-whitespace control does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\s$\""} |
| draft4:optional/ecmascript-regex.json#/groups/8/tests/10 | Non-whitespace does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\s$\""} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/0 | ASCII space does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/1 | Character tabulation does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/2 | Line tabulation does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/3 | Form feed does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/4 | latin-1 non-breaking-space does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/5 | zero-width whitespace does not match | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/6 | line feed does not match (line terminator) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/7 | paragraph separator does not match (line terminator) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft4:optional/ecmascript-regex.json#/groups/9/tests/8 | EM SPACE does not match (Space_Separator) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\S$\""} |
| draft4:optional/ecmascript-regex.json#/groups/10/tests/3 | unicode matching is case-sensitive | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"\\p{Letter}cole\""} |
| draft4:optional/ecmascript-regex.json#/groups/11/tests/1 | literal unicode character in json string | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"\\wcole\""} |
| draft4:optional/ecmascript-regex.json#/groups/11/tests/2 | unicode character in hex format in string | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"\\wcole\""} |
| draft4:optional/ecmascript-regex.json#/groups/11/tests/3 | unicode matching is case-sensitive | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"\\wcole\""} |
| draft4:optional/ecmascript-regex.json#/groups/12/tests/0 | literal unicode character in json string | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"[a-z]cole\""} |
| draft4:optional/ecmascript-regex.json#/groups/12/tests/1 | unicode character in hex format in string | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"[a-z]cole\""} |
| draft4:optional/ecmascript-regex.json#/groups/13/tests/1 | ascii non-digits | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\d+$\""} |
| draft4:optional/ecmascript-regex.json#/groups/13/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\d+$\""} |
| draft4:optional/ecmascript-regex.json#/groups/14/tests/1 | ascii non-digits | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^\\p{digit}+$\""} |
| draft4:optional/ecmascript-regex.json#/groups/15/tests/3 | unicode matching is case-sensitive | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:optional/ecmascript-regex.json#/groups/16/tests/1 | literal unicode character in json string | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:optional/ecmascript-regex.json#/groups/16/tests/2 | unicode character in hex format in string | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:optional/ecmascript-regex.json#/groups/16/tests/3 | unicode matching is case-sensitive | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:optional/ecmascript-regex.json#/groups/17/tests/0 | literal unicode character in json string | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:optional/ecmascript-regex.json#/groups/17/tests/1 | unicode character in hex format in string | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:optional/ecmascript-regex.json#/groups/18/tests/1 | ascii non-digits | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:optional/ecmascript-regex.json#/groups/18/tests/2 | non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO) | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:optional/ecmascript-regex.json#/groups/19/tests/1 | ascii non-digits | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:optional/float-overflow.json#/groups/0/tests/0 | valid if optional overflow handling is implemented | WRONG | {"keyword":"multipleOf","instancePath":"","schemaPath":"#/multipleOf","message":"must be multiple of 0.5"} |
| draft4:optional/format/date-time.json#/groups/0/tests/12 | an invalid date-time past leap second, UTC | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/13 | an invalid date-time with leap second on a wrong minute, UTC | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/14 | an invalid date-time with leap second on a wrong hour, UTC | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/15 | an invalid hour in date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/16 | an invalid minute in date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/17 | an invalid offset minute in date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/18 | an invalid day in date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/19 | an invalid offset in date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/20 | an invalid closing Z after time-zone offset | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/21 | an invalid date-time string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/23 | only RFC3339 not all of ISO 8601 are valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/24 | invalid non-padded month dates | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/25 | invalid non-padded day dates | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/26 | invalid non-ASCII '৪' (a Bengali 4) in date portion | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/27 | invalid non-ASCII '৪' (a Bengali 4) in time portion | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/date-time.json#/groups/0/tests/28 | invalid extended year | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"date-time\""} |
| draft4:optional/format/email.json#/groups/0/tests/7 | an invalid e-mail address | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft4:optional/format/email.json#/groups/0/tests/11 | dot before local part is not valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft4:optional/format/email.json#/groups/0/tests/12 | dot after local part is not valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft4:optional/format/email.json#/groups/0/tests/14 | two subsequent dots inside local part are not valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft4:optional/format/email.json#/groups/0/tests/15 | two email addresses is not valid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft4:optional/format/email.json#/groups/0/tests/16 | full "From" header is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft4:optional/format/email.json#/groups/0/tests/17 | local part is required | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft4:optional/format/email.json#/groups/0/tests/18 | domain is required | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft4:optional/format/email.json#/groups/0/tests/19 | unquoted space in local part is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"email\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/9 | a host name starting with an illegal character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/10 | a host name containing illegal characters | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/11 | a host name with a component too long | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/12 | starts with hyphen | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/13 | ends with hyphen | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/14 | starts with underscore | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/15 | ends with underscore | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/16 | contains underscore | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/18 | exceeds maximum label length | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/23 | empty string | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/24 | single dot | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/25 | leading dot | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/hostname.json#/groups/0/tests/27 | IDN label separator | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"hostname\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/7 | an IP address with too many components | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/8 | an IP address with out-of-range values | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/9 | an IP address without 4 components | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/10 | a 2-part address resolving to a routable IP (inet_aton shorthand) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/11 | a 3-part address resolving to a routable IP (inet_aton shorthand) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/12 | an IP address as an integer | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/13 | an IP address as an integer (decimal) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/14 | invalid non-ASCII '২' (a Bengali 2) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/15 | invalid fullwidth digits (non-ASCII) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/16 | invalid mathematical bold digits (non-ASCII) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/17 | netmask is not a part of ipv4 address | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/18 | leading whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/19 | trailing whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/20 | trailing newline is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/21 | hexadecimal notation is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/22 | octal notation explicit is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/23 | empty part (double dot) is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/24 | leading dot is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/25 | trailing dot is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/28 | empty string is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/29 | plus sign is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/30 | negative sign is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/31 | exponential notation is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/32 | alpha characters are invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/33 | internal whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/34 | tab character is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/35 | additional content after an embedded NUL byte | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/36 | with port number is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv4.json#/groups/0/tests/37 | single octet out of range in last position | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv4\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/7 | a group with 5 hex digits is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/9 | trailing 5 hex symbols is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/10 | an IPv6 address with too many components | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/11 | an IPv6 address containing illegal characters | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/15 | missing leading octet is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/16 | missing trailing octet is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/17 | missing leading octet with omitted octets later | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/19 | two sets of double colons is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/22 | mixed format with ipv4 section with octet out of range | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/23 | mixed format with ipv4 section with a hex octet | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/25 | triple colons is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/27 | insufficient octets without double colons | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/28 | no colons is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/29 | ipv4 is not ipv6 | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/30 | ipv4 segment must have 4 octets | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/31 | leading whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/32 | trailing whitespace is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/33 | netmask is not a part of ipv6 address | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/34 | zone id is not a part of ipv6 address | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/36 | a long invalid ipv6, below length limit, first | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/37 | a long invalid ipv6, below length limit, second | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/38 | invalid non-ASCII '৪' (a Bengali 4) | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/ipv6.json#/groups/0/tests/39 | invalid non-ASCII '৪' (a Bengali 4) in the IPv4 portion | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"ipv6\""} |
| draft4:optional/format/uri.json#/groups/0/tests/19 | an invalid protocol-relative URI Reference | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/20 | an invalid relative URI Reference | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/21 | an invalid URI | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/22 | an invalid URI though valid URI reference | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/23 | an invalid URI with spaces | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/24 | an invalid URI with spaces and missing scheme | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/25 | an invalid URI with comma in scheme | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/26 | invalid userinfo | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/27 | unescaped non US-ASCII characters | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/28 | invalid backslash character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/29 | invalid " character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/30 | invalid <> characters | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/31 | invalid {} characters | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/32 | invalid ^ character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/33 | invalid ` character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/34 | invalid SPACE character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/35 | invalid \| character | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/38 | invalid percent-encoding with non-hex digits | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/39 | incomplete percent-encoding triplet | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/40 | lone percent sign is invalid | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/41 | scheme must start with a letter | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/format/uri.json#/groups/0/tests/42 | invalid character in scheme | PASS | {"keyword":"format","instancePath":"","schemaPath":"#/format","message":"must match format \"uri\""} |
| draft4:optional/id.json#/groups/0/tests/2 | no match on enum or $ref to id | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/definitions/id_in_enum/enum","message":"must be equal to one of the allowed values"} |
| draft4:optional/non-bmp-regex.json#/groups/0/tests/3 | doesn't match one | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^🐲*$\""} |
| draft4:optional/non-bmp-regex.json#/groups/0/tests/4 | doesn't match two | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^🐲*$\""} |
| draft4:optional/non-bmp-regex.json#/groups/0/tests/5 | doesn't match one ASCII | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^🐲*$\""} |
| draft4:optional/non-bmp-regex.json#/groups/0/tests/6 | doesn't match two ASCII | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^🐲*$\""} |
| draft4:optional/non-bmp-regex.json#/groups/1/tests/3 | doesn't match one | PASS | {"keyword":"type","instancePath":"/🐲","schemaPath":"#/patternProperties/%5E%F0%9F%90%B2*%24/type","message":"must be integer"} |
| draft4:optional/non-bmp-regex.json#/groups/1/tests/4 | doesn't match two | PASS | {"keyword":"type","instancePath":"/🐲🐲","schemaPath":"#/patternProperties/%5E%F0%9F%90%B2*%24/type","message":"must be integer"} |
| draft4:pattern.json#/groups/0/tests/1 | a non-matching pattern is invalid | PASS | {"keyword":"pattern","instancePath":"","schemaPath":"#/pattern","message":"must match pattern \"^a*$\""} |
| draft4:patternProperties.json#/groups/0/tests/2 | a single invalid match is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/patternProperties/f.*o/type","message":"must be integer"} |
| draft4:patternProperties.json#/groups/0/tests/3 | multiple invalid matches is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/patternProperties/f.*o/type","message":"must be integer"} |
| draft4:patternProperties.json#/groups/1/tests/3 | an invalid due to one is invalid | PASS | {"keyword":"type","instancePath":"/a","schemaPath":"#/patternProperties/a*/type","message":"must be integer"} |
| draft4:patternProperties.json#/groups/1/tests/4 | an invalid due to the other is invalid | PASS | {"keyword":"maximum","instancePath":"/aaaa","schemaPath":"#/patternProperties/aaa*/maximum","message":"must be <= 20"} |
| draft4:patternProperties.json#/groups/1/tests/5 | an invalid due to both is invalid | PASS | {"keyword":"type","instancePath":"/aaa","schemaPath":"#/patternProperties/a*/type","message":"must be integer"} |
| draft4:patternProperties.json#/groups/2/tests/1 | recognized members are accounted for | PASS | {"keyword":"type","instancePath":"/a31b","schemaPath":"#/patternProperties/%5B0-9%5D%7B2%2C%7D/type","message":"must be boolean"} |
| draft4:patternProperties.json#/groups/2/tests/3 | regexes are case sensitive, 2 | PASS | {"keyword":"type","instancePath":"/a_X_3","schemaPath":"#/patternProperties/X_/type","message":"must be string"} |
| draft4:properties.json#/groups/0/tests/1 | one property invalid is invalid | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/properties/bar/type","message":"must be string"} |
| draft4:properties.json#/groups/0/tests/2 | both properties invalid is invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/properties/foo/type","message":"must be integer"} |
| draft4:properties.json#/groups/1/tests/1 | property invalidates property | PASS | {"keyword":"maxItems","instancePath":"/foo","schemaPath":"#/properties/foo/maxItems","message":"must NOT have more than 3 items"} |
| draft4:properties.json#/groups/1/tests/2 | patternProperty invalidates property | PASS | {"keyword":"minItems","instancePath":"/foo","schemaPath":"#/patternProperties/f.o/minItems","message":"must NOT have fewer than 2 items"} |
| draft4:properties.json#/groups/1/tests/4 | patternProperty invalidates nonproperty | PASS | {"keyword":"minItems","instancePath":"/fxo","schemaPath":"#/patternProperties/f.o/minItems","message":"must NOT have fewer than 2 items"} |
| draft4:properties.json#/groups/1/tests/7 | additionalProperty invalidates others | PASS | {"keyword":"type","instancePath":"/quux","schemaPath":"#/additionalProperties/type","message":"must be integer"} |
| draft4:properties.json#/groups/2/tests/1 | object with strings is invalid | PASS | {"keyword":"type","instancePath":"/foo\nbar","schemaPath":"#/properties/foo%0Abar/type","message":"must be number"} |
| draft4:properties.json#/groups/4/tests/2 | none of the properties mentioned | WRONG | {"keyword":"type","instancePath":"/constructor","schemaPath":"#/properties/constructor/type","message":"must be number"} |
| draft4:properties.json#/groups/4/tests/3 | __proto__ not valid | PASS | {"keyword":"type","instancePath":"/constructor","schemaPath":"#/properties/constructor/type","message":"must be number"} |
| draft4:properties.json#/groups/4/tests/4 | toString not valid | PASS | {"keyword":"type","instancePath":"/toString/length","schemaPath":"#/properties/toString/properties/length/type","message":"must be string"} |
| draft4:properties.json#/groups/4/tests/5 | constructor not valid | PASS | {"keyword":"type","instancePath":"/constructor","schemaPath":"#/properties/constructor/type","message":"must be number"} |
| draft4:ref.json#/groups/0/tests/2 | mismatch | PASS | {"keyword":"additionalProperties","instancePath":"","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:ref.json#/groups/0/tests/3 | recursive mismatch | PASS | {"keyword":"additionalProperties","instancePath":"/foo","schemaPath":"#/additionalProperties","message":"must NOT have additional properties"} |
| draft4:ref.json#/groups/1/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"/bar","schemaPath":"#/properties/foo/type","message":"must be integer"} |
| draft4:ref.json#/groups/2/tests/1 | mismatch array | PASS | {"keyword":"type","instancePath":"/1","schemaPath":"#/items/0/type","message":"must be integer"} |
| draft4:ref.json#/groups/3/tests/0 | slash invalid | PASS | {"keyword":"type","instancePath":"/slash","schemaPath":"#/definitions/slash~1field/type","message":"must be integer"} |
| draft4:ref.json#/groups/3/tests/1 | tilde invalid | PASS | {"keyword":"type","instancePath":"/tilde","schemaPath":"#/definitions/tilde~0field/type","message":"must be integer"} |
| draft4:ref.json#/groups/3/tests/2 | percent invalid | PASS | {"keyword":"type","instancePath":"/percent","schemaPath":"#/definitions/percent%25field/type","message":"must be integer"} |
| draft4:ref.json#/groups/4/tests/1 | nested ref invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/definitions/c/type","message":"must be integer"} |
| draft4:ref.json#/groups/5/tests/1 | ref valid, maxItems ignored | WRONG | {"keyword":"maxItems","instancePath":"/foo","schemaPath":"#/properties/foo/maxItems","message":"must NOT have more than 2 items"} |
| draft4:ref.json#/groups/5/tests/2 | ref invalid | PASS | {"keyword":"type","instancePath":"/foo","schemaPath":"#/definitions/reffed/type","message":"must be array"} |
| draft4:ref.json#/groups/6/tests/1 | $ref resolves to /definitions/base_foo, data validates | WRONG | {"keyword":"type","instancePath":"","schemaPath":"foo.json/type","message":"must be string"} |
| draft4:ref.json#/groups/7/tests/1 | remote ref invalid | PASS | {"keyword":"minimum","instancePath":"/minLength","schemaPath":"#/definitions/positiveInteger/minimum","message":"must be >= 0"} |
| draft4:ref.json#/groups/8/tests/1 | property named $ref invalid | PASS | {"keyword":"type","instancePath":"/$ref","schemaPath":"#/properties/%24ref/type","message":"must be string"} |
| draft4:ref.json#/groups/9/tests/1 | property named $ref invalid | PASS | {"keyword":"type","instancePath":"/$ref","schemaPath":"#/definitions/is-string/type","message":"must be string"} |
| draft4:ref.json#/groups/10/tests/1 | invalid tree | PASS | {"keyword":"type","instancePath":"/nodes/0/subtree/nodes/0/value","schemaPath":"#/properties/value/type","message":"must be number"} |
| draft4:ref.json#/groups/11/tests/1 | object with strings is invalid | PASS | {"keyword":"type","instancePath":"/foo\"bar","schemaPath":"#/definitions/foo%22bar/type","message":"must be number"} |
| draft4:ref.json#/groups/12/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"","schemaPath":"#foo/type","message":"must be integer"} |
| draft4:ref.json#/groups/13/tests/1 | mismatch | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://localhost:1234/nested.json#foo/type","message":"must be integer"} |
| draft4:ref.json#/groups/14/tests/0 | do not evaluate the $ref inside the enum, matching any string | PASS | {"keyword":"enum","instancePath":"","schemaPath":"#/enum","message":"must be equal to one of the allowed values"} |
| draft4:ref.json#/groups/15/tests/1 | non-number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://example.com/b/d.json/type","message":"must be number"} |
| draft4:ref.json#/groups/16/tests/1 | non-number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/definitions/foo/type","message":"must be number"} |
| draft4:ref.json#/groups/17/tests/1 | non-number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/definitions/foo/type","message":"must be number"} |
| draft4:ref.json#/groups/18/tests/1 | non-number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/definitions//definitions//type","message":"must be number"} |
| draft4:refRemote.json#/groups/0/tests/1 | remote ref invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://localhost:1234/integer.json/type","message":"must be integer"} |
| draft4:refRemote.json#/groups/1/tests/1 | remote fragment invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://localhost:1234/draft4/subSchemas.json#/definitions/integer/type","message":"must be integer"} |
| draft4:refRemote.json#/groups/2/tests/1 | ref within ref invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"http://localhost:1234/draft4/subSchemas.json#/definitions/refToInteger/type","message":"must be integer"} |
| draft4:refRemote.json#/groups/3/tests/1 | base URI change ref invalid | PASS | {"keyword":"type","instancePath":"/0/0","schemaPath":"folderInteger.json/type","message":"must be integer"} |
| draft4:refRemote.json#/groups/4/tests/1 | string is invalid | PASS | {"keyword":"type","instancePath":"/list/0","schemaPath":"folderInteger.json/type","message":"must be integer"} |
| draft4:refRemote.json#/groups/5/tests/1 | string is invalid | PASS | {"keyword":"type","instancePath":"/list/0","schemaPath":"folderInteger.json/type","message":"must be integer"} |
| draft4:refRemote.json#/groups/6/tests/2 | object is invalid | PASS | {"keyword":"type","instancePath":"/name","schemaPath":"#/anyOf/0/type","message":"must be null"} |
| draft4:refRemote.json#/groups/7/tests/1 | string is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#foo/type","message":"must be integer"} |
| draft4:required.json#/groups/0/tests/1 | non-present required property is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'foo'"} |
| draft4:required.json#/groups/2/tests/1 | object with some properties missing is invalid | PASS | {"keyword":"required","instancePath":"","schemaPath":"#/required","message":"must have required property 'foo\\bar'"} |
| draft4:type.json#/groups/0/tests/1 | a float is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft4:type.json#/groups/0/tests/2 | a string is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft4:type.json#/groups/0/tests/3 | a string is still not an integer, even if it looks like one | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft4:type.json#/groups/0/tests/4 | an object is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft4:type.json#/groups/0/tests/5 | an array is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft4:type.json#/groups/0/tests/6 | a boolean is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft4:type.json#/groups/0/tests/7 | null is not an integer | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer"} |
| draft4:type.json#/groups/1/tests/3 | a string is not a number | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft4:type.json#/groups/1/tests/4 | a string is still not a number, even if it looks like one | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft4:type.json#/groups/1/tests/5 | an object is not a number | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft4:type.json#/groups/1/tests/6 | an array is not a number | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft4:type.json#/groups/1/tests/7 | a boolean is not a number | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft4:type.json#/groups/1/tests/8 | null is not a number | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be number"} |
| draft4:type.json#/groups/2/tests/0 | 1 is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft4:type.json#/groups/2/tests/1 | a float is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft4:type.json#/groups/2/tests/5 | an object is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft4:type.json#/groups/2/tests/6 | an array is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft4:type.json#/groups/2/tests/7 | a boolean is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft4:type.json#/groups/2/tests/8 | null is not a string | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft4:type.json#/groups/3/tests/0 | an integer is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft4:type.json#/groups/3/tests/1 | a float is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft4:type.json#/groups/3/tests/2 | a string is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft4:type.json#/groups/3/tests/4 | an array is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft4:type.json#/groups/3/tests/5 | a boolean is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft4:type.json#/groups/3/tests/6 | null is not an object | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be object"} |
| draft4:type.json#/groups/4/tests/0 | an integer is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft4:type.json#/groups/4/tests/1 | a float is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft4:type.json#/groups/4/tests/2 | a string is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft4:type.json#/groups/4/tests/3 | an object is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft4:type.json#/groups/4/tests/5 | a boolean is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft4:type.json#/groups/4/tests/6 | null is not an array | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array"} |
| draft4:type.json#/groups/5/tests/0 | an integer is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft4:type.json#/groups/5/tests/1 | zero is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft4:type.json#/groups/5/tests/2 | a float is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft4:type.json#/groups/5/tests/3 | a string is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft4:type.json#/groups/5/tests/4 | an empty string is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft4:type.json#/groups/5/tests/5 | an object is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft4:type.json#/groups/5/tests/6 | an array is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft4:type.json#/groups/5/tests/9 | null is not a boolean | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be boolean"} |
| draft4:type.json#/groups/6/tests/0 | an integer is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft4:type.json#/groups/6/tests/1 | a float is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft4:type.json#/groups/6/tests/2 | zero is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft4:type.json#/groups/6/tests/3 | a string is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft4:type.json#/groups/6/tests/4 | an empty string is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft4:type.json#/groups/6/tests/5 | an object is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft4:type.json#/groups/6/tests/6 | an array is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft4:type.json#/groups/6/tests/7 | true is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft4:type.json#/groups/6/tests/8 | false is not null | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be null"} |
| draft4:type.json#/groups/7/tests/2 | a float is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer,string"} |
| draft4:type.json#/groups/7/tests/3 | an object is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer,string"} |
| draft4:type.json#/groups/7/tests/4 | an array is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer,string"} |
| draft4:type.json#/groups/7/tests/5 | a boolean is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer,string"} |
| draft4:type.json#/groups/7/tests/6 | null is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be integer,string"} |
| draft4:type.json#/groups/8/tests/1 | number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be string"} |
| draft4:type.json#/groups/9/tests/2 | number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array,object"} |
| draft4:type.json#/groups/9/tests/3 | string is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array,object"} |
| draft4:type.json#/groups/9/tests/4 | null is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array,object"} |
| draft4:type.json#/groups/10/tests/3 | number is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array,object,null"} |
| draft4:type.json#/groups/10/tests/4 | string is invalid | PASS | {"keyword":"type","instancePath":"","schemaPath":"#/type","message":"must be array,object,null"} |
| draft4:uniqueItems.json#/groups/0/tests/1 | non-unique array of integers is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft4:uniqueItems.json#/groups/0/tests/2 | non-unique array of more than two integers is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 2 are identical)"} |
| draft4:uniqueItems.json#/groups/0/tests/3 | numbers are unique if mathematically unequal | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 1 and 2 are identical)"} |
| draft4:uniqueItems.json#/groups/0/tests/7 | non-unique array of strings is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 2 are identical)"} |
| draft4:uniqueItems.json#/groups/0/tests/9 | non-unique array of objects is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft4:uniqueItems.json#/groups/0/tests/10 | property order of array of objects is ignored | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft4:uniqueItems.json#/groups/0/tests/12 | non-unique array of nested objects is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft4:uniqueItems.json#/groups/0/tests/14 | non-unique array of arrays is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft4:uniqueItems.json#/groups/0/tests/15 | non-unique array of more than two arrays is invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 2 are identical)"} |
| draft4:uniqueItems.json#/groups/0/tests/23 | non-unique heterogeneous types are invalid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 4 are identical)"} |
| draft4:uniqueItems.json#/groups/0/tests/25 | objects are non-unique despite key order | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft4:uniqueItems.json#/groups/1/tests/2 | [false, false] from items array is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft4:uniqueItems.json#/groups/1/tests/3 | [true, true] from items array is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft4:uniqueItems.json#/groups/1/tests/6 | non-unique array extended from [false, true] is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 2 and 3 are identical)"} |
| draft4:uniqueItems.json#/groups/1/tests/7 | non-unique array extended from [true, false] is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 2 and 3 are identical)"} |
| draft4:uniqueItems.json#/groups/2/tests/2 | [false, false] from items array is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft4:uniqueItems.json#/groups/2/tests/3 | [true, true] from items array is not valid | PASS | {"keyword":"uniqueItems","instancePath":"","schemaPath":"#/uniqueItems","message":"must NOT have duplicate items (items ## 0 and 1 are identical)"} |
| draft4:uniqueItems.json#/groups/2/tests/4 | extra items are invalid even if unique | PASS | {"keyword":"additionalItems","instancePath":"","schemaPath":"#/additionalItems","message":"must NOT have more than 2 items"} |
| draft4:uniqueItems.json#/groups/5/tests/4 | extra items are invalid even if unique | PASS | {"keyword":"additionalItems","instancePath":"","schemaPath":"#/additionalItems","message":"must NOT have more than 2 items"} |

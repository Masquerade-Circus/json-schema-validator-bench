# draft2020-12 base [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) RUNTIME errors

Phase: execution

Exact matching records: 8

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2020-12:defs.json#/groups/0/tests/0 | valid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "https://json-schema.org/draft/2020-12/schema". Known schemas: - https://github.com/cfworker |
| draft2020-12:defs.json#/groups/0/tests/1 | invalid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "https://json-schema.org/draft/2020-12/schema". Known schemas: - https://github.com/cfworker |
| draft2020-12:dynamicRef.json#/groups/2/tests/0 | An array of strings is valid | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "#items".  Absolute URI "https://test.json-schema.org/ref-dynamicAnchor-same-schema/root#items". Known schemas: - https://test.json-schema.org/ref-dynamicAnchor-same-schema/root - https://test.json-schema.org/ref-dynamicAnchor-same-schema/root#/items - https://test.json-schema.org/ref-dynamicAnchor-same-schema/root#/$defs/foo |
| draft2020-12:dynamicRef.json#/groups/2/tests/1 | An array containing non-strings is invalid | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "#items".  Absolute URI "https://test.json-schema.org/ref-dynamicAnchor-same-schema/root#items". Known schemas: - https://test.json-schema.org/ref-dynamicAnchor-same-schema/root - https://test.json-schema.org/ref-dynamicAnchor-same-schema/root#/items - https://test.json-schema.org/ref-dynamicAnchor-same-schema/root#/$defs/foo |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/3/tests/0 | match | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "#/examples/0".  Absolute URI "https://github.com/cfworker#/examples/0". Known schemas: - https://github.com/cfworker |
| draft2020-12:optional/refOfUnknownKeyword.json#/groups/3/tests/1 | mismatch | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "#/examples/0".  Absolute URI "https://github.com/cfworker#/examples/0". Known schemas: - https://github.com/cfworker |
| draft2020-12:ref.json#/groups/6/tests/0 | remote ref valid | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "https://json-schema.org/draft/2020-12/schema". Known schemas: - https://github.com/cfworker |
| draft2020-12:ref.json#/groups/6/tests/1 | remote ref invalid | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "https://json-schema.org/draft/2020-12/schema". Known schemas: - https://github.com/cfworker |

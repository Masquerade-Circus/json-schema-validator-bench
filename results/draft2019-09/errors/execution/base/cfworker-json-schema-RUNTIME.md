# draft2019-09 base [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) RUNTIME errors

Phase: execution

Exact matching records: 6

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2019-09:defs.json#/groups/0/tests/0 | valid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "https://json-schema.org/draft/2019-09/schema". Known schemas: - https://github.com/cfworker |
| draft2019-09:defs.json#/groups/0/tests/1 | invalid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "https://json-schema.org/draft/2019-09/schema". Known schemas: - https://github.com/cfworker |
| draft2019-09:optional/refOfUnknownKeyword.json#/groups/3/tests/0 | match | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "#/examples/0".  Absolute URI "https://github.com/cfworker#/examples/0". Known schemas: - https://github.com/cfworker |
| draft2019-09:optional/refOfUnknownKeyword.json#/groups/3/tests/1 | mismatch | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "#/examples/0".  Absolute URI "https://github.com/cfworker#/examples/0". Known schemas: - https://github.com/cfworker |
| draft2019-09:ref.json#/groups/6/tests/0 | remote ref valid | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "https://json-schema.org/draft/2019-09/schema". Known schemas: - https://github.com/cfworker |
| draft2019-09:ref.json#/groups/6/tests/1 | remote ref invalid | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "https://json-schema.org/draft/2019-09/schema". Known schemas: - https://github.com/cfworker |

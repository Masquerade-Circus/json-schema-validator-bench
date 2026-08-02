# draft4 base [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) RUNTIME errors

Phase: cold-execution

Exact matching records: 4

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft4:definitions.json#/groups/0/tests/0 | valid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-04/schema#".  Absolute URI "http://json-schema.org/draft-04/schema". Known schemas: - https://github.com/cfworker |
| draft4:definitions.json#/groups/0/tests/1 | invalid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-04/schema#".  Absolute URI "http://json-schema.org/draft-04/schema". Known schemas: - https://github.com/cfworker |
| draft4:ref.json#/groups/7/tests/0 | remote ref valid | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-04/schema#".  Absolute URI "http://json-schema.org/draft-04/schema". Known schemas: - https://github.com/cfworker |
| draft4:ref.json#/groups/7/tests/1 | remote ref invalid | RUNTIME | FAST_RUNTIME_ERROR: Unresolved $ref "http://json-schema.org/draft-04/schema#".  Absolute URI "http://json-schema.org/draft-04/schema". Known schemas: - https://github.com/cfworker |

# draft2020-12 base [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) COMPILE errors

Phase: compile

Exact matching records: 9

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2020-12:defs.json#/groups/0/tests/0 | valid definition schema | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:defs.json#/groups/0/tests/1 | invalid definition schema | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:ref.json#/groups/6/tests/0 | remote ref valid | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:ref.json#/groups/6/tests/1 | remote ref invalid | COMPILE | FAST_COMPILE_ERROR: failed to resolve $ref: "https://json-schema.org/draft/2020-12/schema" at # |
| draft2020-12:vocabulary.json#/groups/0/tests/0 | applicator vocabulary still works | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-no-validation.json" at # |
| draft2020-12:vocabulary.json#/groups/0/tests/1 | no validation: valid number | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-no-validation.json" at # |
| draft2020-12:vocabulary.json#/groups/0/tests/2 | no validation: invalid number, but it still validates | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-no-validation.json" at # |
| draft2020-12:vocabulary.json#/groups/1/tests/0 | string value | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-optional-vocabulary.json" at # |
| draft2020-12:vocabulary.json#/groups/1/tests/1 | number value | COMPILE | FAST_COMPILE_ERROR: Unexpected schema version: "https://localhost:1234/draft2020-12/metaschema-optional-vocabulary.json" at # |

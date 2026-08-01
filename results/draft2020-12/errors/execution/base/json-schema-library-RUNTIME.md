# draft2020-12 base [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) RUNTIME errors

Phase: execution

Exact matching records: 4

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2020-12:defs.json#/groups/0/tests/0 | valid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Invalid $ref: Could not resolve $ref 'https://json-schema.org/draft/2020-12/schema' from '#' |
| draft2020-12:defs.json#/groups/0/tests/1 | invalid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Invalid $ref: Could not resolve $ref 'https://json-schema.org/draft/2020-12/schema' from '#' |
| draft2020-12:ref.json#/groups/6/tests/0 | remote ref valid | RUNTIME | FAST_RUNTIME_ERROR: Invalid $ref: Could not resolve $ref 'https://json-schema.org/draft/2020-12/schema' from '#' |
| draft2020-12:ref.json#/groups/6/tests/1 | remote ref invalid | RUNTIME | FAST_RUNTIME_ERROR: Invalid $ref: Could not resolve $ref 'https://json-schema.org/draft/2020-12/schema' from '#' |

# draft6 base [json-schema-library](https://www.npmjs.com/package/json-schema-library) (11.6.2) RUNTIME errors

Phase: cold-execution

Exact matching records: 6

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft6:definitions.json#/groups/0/tests/0 | valid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Invalid $ref: Could not resolve $ref 'http://json-schema.org/draft-06/schema#' from '#' |
| draft6:definitions.json#/groups/0/tests/1 | invalid definition schema | RUNTIME | FAST_RUNTIME_ERROR: Invalid $ref: Could not resolve $ref 'http://json-schema.org/draft-06/schema#' from '#' |
| draft6:ref.json#/groups/7/tests/0 | remote ref valid | RUNTIME | FAST_RUNTIME_ERROR: Invalid $ref: Could not resolve $ref 'http://json-schema.org/draft-06/schema#' from '#' |
| draft6:ref.json#/groups/7/tests/1 | remote ref invalid | RUNTIME | FAST_RUNTIME_ERROR: Invalid $ref: Could not resolve $ref 'http://json-schema.org/draft-06/schema#' from '#' |
| draft6:refRemote.json#/groups/8/tests/0 | integer is valid | RUNTIME | FAST_RUNTIME_ERROR: Invalid $ref: Could not resolve $ref 'http://localhost:1234/draft6/locationIndependentIdentifier.json#/definitions/refToInteger' from '#' |
| draft6:refRemote.json#/groups/8/tests/1 | string is invalid | RUNTIME | FAST_RUNTIME_ERROR: Invalid $ref: Could not resolve $ref 'http://localhost:1234/draft6/locationIndependentIdentifier.json#/definitions/refToInteger' from '#' |

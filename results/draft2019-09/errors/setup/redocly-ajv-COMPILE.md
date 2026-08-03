# draft2019-09 Setup [redocly-ajv](https://www.npmjs.com/package/@redocly/ajv) (8.18.3) COMPILE errors

Phase: setup

Exact matching records: 19

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2019-09:enum.json#/groups/14/tests/0 | string is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2019-09:enum.json#/groups/14/tests/1 | number is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2019-09:enum.json#/groups/14/tests/2 | null is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2019-09:enum.json#/groups/14/tests/3 | object is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2019-09:enum.json#/groups/14/tests/4 | array is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2019-09:enum.json#/groups/14/tests/5 | boolean is invalid | COMPILE | FAST_SETUP_ERROR: enum must have non-empty array |
| draft2019-09:optional/cross-draft.json#/groups/0/tests/0 | first item not a string is invalid | COMPILE | FAST_SETUP_ERROR: no schema with key or ref "https://json-schema.org/draft/2020-12/schema" |
| draft2019-09:optional/cross-draft.json#/groups/0/tests/1 | first item is a string is valid | COMPILE | FAST_SETUP_ERROR: no schema with key or ref "https://json-schema.org/draft/2020-12/schema" |
| draft2019-09:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | COMPILE | FAST_SETUP_ERROR: reference "https://localhost:1234/draft2019-09/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2019-09:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | COMPILE | FAST_SETUP_ERROR: reference "https://localhost:1234/draft2019-09/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2019-09:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | COMPILE | FAST_SETUP_ERROR: reference "https://localhost:1234/draft2019-09/unknownKeyword/my_identifier.json" resolves to more than one schema |
| draft2019-09:ref.json#/groups/15/tests/0 | invalid on inner field | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2019-09:ref.json#/groups/15/tests/1 | invalid on outer field | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2019-09:ref.json#/groups/15/tests/2 | valid on both fields | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2019-09:ref.json#/groups/16/tests/0 | invalid on inner field | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2019-09:ref.json#/groups/16/tests/1 | invalid on outer field | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2019-09:ref.json#/groups/16/tests/2 | valid on both fields | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2019-09:ref.json#/groups/28/tests/0 | a string is valid | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |
| draft2019-09:ref.json#/groups/28/tests/1 | a non-string is invalid | COMPILE | FAST_SETUP_ERROR: Maximum call stack size exceeded |

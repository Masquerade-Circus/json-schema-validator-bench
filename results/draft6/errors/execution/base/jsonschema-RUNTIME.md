# draft6 base [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) RUNTIME errors

Phase: execution

Exact matching records: 22

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft6:definitions.json#/groups/0/tests/0 | valid definition schema | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://json-schema.org/draft-06/schema#> |
| draft6:definitions.json#/groups/0/tests/1 | invalid definition schema | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://json-schema.org/draft-06/schema#> |
| draft6:ref.json#/groups/7/tests/0 | remote ref valid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://json-schema.org/draft-06/schema#> |
| draft6:ref.json#/groups/7/tests/1 | remote ref invalid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://json-schema.org/draft-06/schema#> |
| draft6:ref.json#/groups/20/tests/0 | valid under the URN IDed schema | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/20/tests/1 | invalid under the URN IDed schema | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/21/tests/0 | a string is valid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/21/tests/1 | a non-string is invalid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/22/tests/0 | a string is valid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/22/tests/1 | a non-string is invalid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/23/tests/0 | a string is valid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/23/tests/1 | a non-string is invalid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/24/tests/0 | a string is valid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/24/tests/1 | a non-string is invalid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/25/tests/0 | a string is valid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/25/tests/1 | a non-string is invalid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/26/tests/0 | a string is valid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:ref.json#/groups/26/tests/1 | a non-string is invalid | RUNTIME | ERR_INVALID_URL: Invalid URL |
| draft6:refRemote.json#/groups/4/tests/0 | number is valid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://localhost:1234/folderInteger.json> |
| draft6:refRemote.json#/groups/4/tests/1 | string is invalid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://localhost:1234/folderInteger.json> |
| draft6:refRemote.json#/groups/5/tests/0 | number is valid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://localhost:1234/folderInteger.json> |
| draft6:refRemote.json#/groups/5/tests/1 | string is invalid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://localhost:1234/folderInteger.json> |

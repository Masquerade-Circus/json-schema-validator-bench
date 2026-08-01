# draft4 base [jsonschema](https://www.npmjs.com/package/jsonschema) (1.5.0) RUNTIME errors

Phase: execution

Exact matching records: 8

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft4:definitions.json#/groups/0/tests/0 | valid definition schema | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://json-schema.org/draft-04/schema#> |
| draft4:definitions.json#/groups/0/tests/1 | invalid definition schema | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://json-schema.org/draft-04/schema#> |
| draft4:ref.json#/groups/7/tests/0 | remote ref valid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://json-schema.org/draft-04/schema#> |
| draft4:ref.json#/groups/7/tests/1 | remote ref invalid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://json-schema.org/draft-04/schema#> |
| draft4:refRemote.json#/groups/4/tests/0 | number is valid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://localhost:1234/folderInteger.json> |
| draft4:refRemote.json#/groups/4/tests/1 | string is invalid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://localhost:1234/folderInteger.json> |
| draft4:refRemote.json#/groups/5/tests/0 | number is valid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://localhost:1234/folderInteger.json> |
| draft4:refRemote.json#/groups/5/tests/1 | string is invalid | RUNTIME | FAST_RUNTIME_ERROR: no such schema <http://localhost:1234/folderInteger.json> |

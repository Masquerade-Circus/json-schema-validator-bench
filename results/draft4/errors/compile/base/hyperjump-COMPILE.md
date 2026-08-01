# draft4 base [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) COMPILE errors

Phase: compile

Exact matching records: 6

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft4:ref.json#/groups/16/tests/0 | number is valid | COMPILE | FAST_COMPILE_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///folder/file.json |
| draft4:ref.json#/groups/16/tests/1 | non-number is invalid | COMPILE | FAST_COMPILE_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///folder/file.json |
| draft4:ref.json#/groups/17/tests/0 | number is valid | COMPILE | FAST_COMPILE_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///c:/folder/file.json |
| draft4:ref.json#/groups/17/tests/1 | non-number is invalid | COMPILE | FAST_COMPILE_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///c:/folder/file.json |
| draft4:refRemote.json#/groups/5/tests/0 | number is valid | COMPILE | FAST_COMPILE_ERROR: Value at '/definitions/baz/definitions' is undefined and does not have property 'bar' |
| draft4:refRemote.json#/groups/5/tests/1 | string is invalid | COMPILE | FAST_COMPILE_ERROR: Value at '/definitions/baz/definitions' is undefined and does not have property 'bar' |

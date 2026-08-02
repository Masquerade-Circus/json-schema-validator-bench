# draft7 Setup [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) COMPILE errors

Phase: setup

Exact matching records: 6

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft7:ref.json#/groups/32/tests/0 | number is valid | COMPILE | FAST_COMPILE_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///folder/file.json |
| draft7:ref.json#/groups/32/tests/1 | non-number is invalid | COMPILE | FAST_COMPILE_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///folder/file.json |
| draft7:ref.json#/groups/33/tests/0 | number is valid | COMPILE | FAST_COMPILE_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///c:/folder/file.json |
| draft7:ref.json#/groups/33/tests/1 | non-number is invalid | COMPILE | FAST_COMPILE_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///c:/folder/file.json |
| draft7:refRemote.json#/groups/5/tests/0 | number is valid | COMPILE | FAST_COMPILE_ERROR: Value at '/definitions/baz/definitions' is undefined and does not have property 'bar' |
| draft7:refRemote.json#/groups/5/tests/1 | string is invalid | COMPILE | FAST_COMPILE_ERROR: Value at '/definitions/baz/definitions' is undefined and does not have property 'bar' |

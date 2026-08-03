# draft6 Setup [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema) (1.17.7) COMPILE errors

Phase: setup

Exact matching records: 6

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft6:ref.json#/groups/28/tests/0 | number is valid | COMPILE | FAST_SETUP_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///folder/file.json |
| draft6:ref.json#/groups/28/tests/1 | non-number is invalid | COMPILE | FAST_SETUP_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///folder/file.json |
| draft6:ref.json#/groups/29/tests/0 | number is valid | COMPILE | FAST_SETUP_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///c:/folder/file.json |
| draft6:ref.json#/groups/29/tests/1 | non-number is invalid | COMPILE | FAST_SETUP_ERROR: Registering a schema with a 'file:' URI scheme is not allowed: file:///c:/folder/file.json |
| draft6:refRemote.json#/groups/5/tests/0 | number is valid | COMPILE | FAST_SETUP_ERROR: Value at '/definitions/baz/definitions' is undefined and does not have property 'bar' |
| draft6:refRemote.json#/groups/5/tests/1 | string is invalid | COMPILE | FAST_SETUP_ERROR: Value at '/definitions/baz/definitions' is undefined and does not have property 'bar' |

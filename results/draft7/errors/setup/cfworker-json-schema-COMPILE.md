# draft7 Setup [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) COMPILE errors

Phase: setup

Exact matching records: 3

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft7:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/unknownKeyword/my_identifier.json". |
| draft7:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/unknownKeyword/my_identifier.json". |
| draft7:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/unknownKeyword/my_identifier.json". |

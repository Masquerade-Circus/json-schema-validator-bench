# draft2019-09 Setup [cfworker-json-schema](https://www.npmjs.com/package/@cfworker/json-schema) (4.1.1) COMPILE errors

Phase: setup

Exact matching records: 5

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2019-09:anchor.json#/groups/3/tests/0 | $ref resolves to /$defs/A/allOf/1 | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "http://localhost:1234/draft2019-09/child2". |
| draft2019-09:anchor.json#/groups/3/tests/1 | $ref does not resolve to /$defs/A/allOf/0 | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "http://localhost:1234/draft2019-09/child2". |
| draft2019-09:optional/unknownKeyword.json#/groups/0/tests/0 | type matches second anyOf, which has a real schema in it | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/draft2019-09/unknownKeyword/my_identifier.json". |
| draft2019-09:optional/unknownKeyword.json#/groups/0/tests/1 | type matches non-schema in first anyOf | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/draft2019-09/unknownKeyword/my_identifier.json". |
| draft2019-09:optional/unknownKeyword.json#/groups/0/tests/2 | type matches non-schema in third anyOf | COMPILE | FAST_SETUP_ERROR: Duplicate schema URI "https://localhost:1234/draft2019-09/unknownKeyword/my_identifier.json". |

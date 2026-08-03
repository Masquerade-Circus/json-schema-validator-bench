# draft4 Setup [schemasafe](https://www.npmjs.com/package/@exodus/schemasafe) (1.3.0) COMPILE errors

Phase: setup

Exact matching records: 11

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft4:definitions.json#/groups/0/tests/0 | valid definition schema | COMPILE | FAST_SETUP_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |
| draft4:definitions.json#/groups/0/tests/1 | invalid definition schema | COMPILE | FAST_SETUP_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/0 | unknown formats ignore integers | COMPILE | FAST_SETUP_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/1 | unknown formats ignore floats | COMPILE | FAST_SETUP_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/2 | unknown formats ignore objects | COMPILE | FAST_SETUP_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/3 | unknown formats ignore arrays | COMPILE | FAST_SETUP_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/4 | unknown formats ignore booleans | COMPILE | FAST_SETUP_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/5 | unknown formats ignore nulls | COMPILE | FAST_SETUP_ERROR: Unrecognized format used: "unknown" at # |
| draft4:optional/format/unknown.json#/groups/0/tests/6 | unknown formats ignore strings | COMPILE | FAST_SETUP_ERROR: Unrecognized format used: "unknown" at # |
| draft4:ref.json#/groups/7/tests/0 | remote ref valid | COMPILE | FAST_SETUP_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |
| draft4:ref.json#/groups/7/tests/1 | remote ref invalid | COMPILE | FAST_SETUP_ERROR: failed to resolve $ref: "http://json-schema.org/draft-04/schema#" at # |

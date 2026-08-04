# draft2020-12 Setup [schema-shield](https://www.npmjs.com/package/schema-shield) (1.3.0) COMPILE errors

Phase: setup

Exact matching records: 9

| Case ID | Description | Status | Error |
| --- | --- | --- | --- |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/0 | format-assertion: false: valid string | COMPILE | UNKNOWN_METASCHEMA: Unknown metaschema: http://localhost:1234/draft2020-12/format-assertion-false.json |
| draft2020-12:optional/format-assertion.json#/groups/0/tests/1 | format-assertion: false: invalid string | COMPILE | UNKNOWN_METASCHEMA: Unknown metaschema: http://localhost:1234/draft2020-12/format-assertion-false.json |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/0 | format-assertion: true: valid string | COMPILE | UNKNOWN_METASCHEMA: Unknown metaschema: http://localhost:1234/draft2020-12/format-assertion-true.json |
| draft2020-12:optional/format-assertion.json#/groups/1/tests/1 | format-assertion: true: invalid string | COMPILE | UNKNOWN_METASCHEMA: Unknown metaschema: http://localhost:1234/draft2020-12/format-assertion-true.json |
| draft2020-12:vocabulary.json#/groups/0/tests/0 | applicator vocabulary still works | COMPILE | UNKNOWN_METASCHEMA: Unknown metaschema: http://localhost:1234/draft2020-12/metaschema-no-validation.json |
| draft2020-12:vocabulary.json#/groups/0/tests/1 | no validation: valid number | COMPILE | UNKNOWN_METASCHEMA: Unknown metaschema: http://localhost:1234/draft2020-12/metaschema-no-validation.json |
| draft2020-12:vocabulary.json#/groups/0/tests/2 | no validation: invalid number, but it still validates | COMPILE | UNKNOWN_METASCHEMA: Unknown metaschema: http://localhost:1234/draft2020-12/metaschema-no-validation.json |
| draft2020-12:vocabulary.json#/groups/1/tests/0 | string value | COMPILE | UNKNOWN_METASCHEMA: Unknown metaschema: http://localhost:1234/draft2020-12/metaschema-optional-vocabulary.json |
| draft2020-12:vocabulary.json#/groups/1/tests/1 | number value | COMPILE | UNKNOWN_METASCHEMA: Unknown metaschema: http://localhost:1234/draft2020-12/metaschema-optional-vocabulary.json |

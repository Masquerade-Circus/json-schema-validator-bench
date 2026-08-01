# Mutation report: jsonschema

- **Validator:** jsonschema
- **Version:** 1.5.0
- **Total unique mutations:** 12
- **Displayed unique mutations:** 10
- **Omitted unique mutations:** 2
- **Source:** conformance checks on disposable schema, data, and resource copies.
- **Deduplication:** validator, draft, scope, subjectId, target, mutationClass, path, kind, and stable structural before/after define one logical mutation. Tracker-local identity numbers, profile, and moment share that identity.

## Configuration

### draft4

    {
      "reportOptions": {
        "base": {
          "formatProfile": "base",
          "nestedErrors": false
        },
        "format-assertion": {
          "formatProfile": "format-assertion",
          "nestedErrors": false
        }
      },
      "reportOptionsSha256": {
        "base": "f3f56475d9760630f9fb6f9dd18ebc23bea360fca7f0aeb432849172230714ca",
        "format-assertion": "ffcd045c69dc72b783b4f23af1311b6107c545aac0ed13eac87058014e9e57c7"
      }
    }

### draft6

    {
      "reportOptions": {
        "base": {
          "formatProfile": "base",
          "nestedErrors": false
        },
        "format-assertion": {
          "formatProfile": "format-assertion",
          "nestedErrors": false
        }
      },
      "reportOptionsSha256": {
        "base": "f3f56475d9760630f9fb6f9dd18ebc23bea360fca7f0aeb432849172230714ca",
        "format-assertion": "ffcd045c69dc72b783b4f23af1311b6107c545aac0ed13eac87058014e9e57c7"
      }
    }

### draft7

    {
      "reportOptions": {
        "base": {
          "formatProfile": "base",
          "nestedErrors": false
        },
        "format-assertion": {
          "formatProfile": "format-assertion",
          "nestedErrors": false
        }
      },
      "reportOptionsSha256": {
        "base": "f3f56475d9760630f9fb6f9dd18ebc23bea360fca7f0aeb432849172230714ca",
        "format-assertion": "ffcd045c69dc72b783b4f23af1311b6107c545aac0ed13eac87058014e9e57c7"
      }
    }

## Linked views

<a id="mutation-view-adfba42c92469421de6b4c3a65ecf948e06f57bc78ec45bf3c610957c597ce72"></a>
### All drafts conformance

Unique mutations in this view: 12
Displayed mutation links: 10
Omitted mutation links: 2. Full records remain in JSON results.

- [data validation draft4:properties.json\#/groups/4/tests/2](#mutation-event-b96a860fb65da173f0f93627781a23a15aea7b7e1e6e9d645418e41d68872bf6)
- [data validation draft4:properties.json\#/groups/4/tests/3](#mutation-event-dcac4b0c26dea89d47c7a40ef6629e5f3a61a7747cdc9b7b2c4afde4d315ede8)
- [data validation draft4:properties.json\#/groups/4/tests/4](#mutation-event-d632b9c709e5b27b836fe1b2b1609f08fe780d9e1b33e4d2880717991621b691)
- [data validation draft4:properties.json\#/groups/4/tests/5](#mutation-event-497495ad06ae19bce54ad9b5556f1f42d6ff7761514606b19b2c99458beaafcd)
- [data validation draft6:properties.json\#/groups/5/tests/2](#mutation-event-d225a8e8e26d67cf1bc42782c0ceffb6796cc84becbf4bf6d499ab3e76a1e001)
- [data validation draft6:properties.json\#/groups/5/tests/3](#mutation-event-b4cd94b4f0fff3bdf41aeb1be0b3703a5846e7c26f8c50fe25db80aa4c3453cb)
- [data validation draft6:properties.json\#/groups/5/tests/4](#mutation-event-beb2366c882969098a03ef0e5a98d3bda49bab9eb4058a67a2f8ead28517becc)
- [data validation draft6:properties.json\#/groups/5/tests/5](#mutation-event-781318811522fe9fe345d43cddf25fd4a9718f2c5ae35095b5d44f08ca509be5)
- [data validation draft7:properties.json\#/groups/5/tests/2](#mutation-event-3885a4b41ffba00fce111dfa838512b6ee594ec64984506d9aa598c093f00085)
- [data validation draft7:properties.json\#/groups/5/tests/3](#mutation-event-85abb657a71422ac7f1bed5032cb4fea47834d07d1f187ab90f0c54e5a5a361a)

<a id="mutation-view-213ff59f4482ae08c1de1695176aa1996a48dd8be9af032a47fbfd5195063af2"></a>
### draft4 conformance

Unique mutations in this view: 4

- [data validation draft4:properties.json\#/groups/4/tests/2](#mutation-event-b96a860fb65da173f0f93627781a23a15aea7b7e1e6e9d645418e41d68872bf6)
- [data validation draft4:properties.json\#/groups/4/tests/3](#mutation-event-dcac4b0c26dea89d47c7a40ef6629e5f3a61a7747cdc9b7b2c4afde4d315ede8)
- [data validation draft4:properties.json\#/groups/4/tests/4](#mutation-event-d632b9c709e5b27b836fe1b2b1609f08fe780d9e1b33e4d2880717991621b691)
- [data validation draft4:properties.json\#/groups/4/tests/5](#mutation-event-497495ad06ae19bce54ad9b5556f1f42d6ff7761514606b19b2c99458beaafcd)

<a id="mutation-view-e1c8792ef89991bc9294679c04e72f6da05340ac259c82993af0ae13bef1052a"></a>
### draft6 conformance

Unique mutations in this view: 4

- [data validation draft6:properties.json\#/groups/5/tests/2](#mutation-event-d225a8e8e26d67cf1bc42782c0ceffb6796cc84becbf4bf6d499ab3e76a1e001)
- [data validation draft6:properties.json\#/groups/5/tests/3](#mutation-event-b4cd94b4f0fff3bdf41aeb1be0b3703a5846e7c26f8c50fe25db80aa4c3453cb)
- [data validation draft6:properties.json\#/groups/5/tests/4](#mutation-event-beb2366c882969098a03ef0e5a98d3bda49bab9eb4058a67a2f8ead28517becc)
- [data validation draft6:properties.json\#/groups/5/tests/5](#mutation-event-781318811522fe9fe345d43cddf25fd4a9718f2c5ae35095b5d44f08ca509be5)

<a id="mutation-view-f6bddd0a037fe3eb9f68eddd16af7f57af80e8bb2e7b694c1d21babc7cf4597e"></a>
### draft7 conformance

Unique mutations in this view: 4
Displayed mutation links: 2
Omitted mutation links: 2. Full records remain in JSON results.

- [data validation draft7:properties.json\#/groups/5/tests/2](#mutation-event-3885a4b41ffba00fce111dfa838512b6ee594ec64984506d9aa598c093f00085)
- [data validation draft7:properties.json\#/groups/5/tests/3](#mutation-event-85abb657a71422ac7f1bed5032cb4fea47834d07d1f187ab90f0c54e5a5a361a)

<a id="mutation-view-536cbcb7c56e21de37040aa770c7a7a12b6f3935ecdc63fbca781864d3e14b33"></a>
### draft4/base/conformance

Unique mutations in this view: 4

- [data validation draft4:properties.json\#/groups/4/tests/2](#mutation-event-b96a860fb65da173f0f93627781a23a15aea7b7e1e6e9d645418e41d68872bf6)
- [data validation draft4:properties.json\#/groups/4/tests/3](#mutation-event-dcac4b0c26dea89d47c7a40ef6629e5f3a61a7747cdc9b7b2c4afde4d315ede8)
- [data validation draft4:properties.json\#/groups/4/tests/4](#mutation-event-d632b9c709e5b27b836fe1b2b1609f08fe780d9e1b33e4d2880717991621b691)
- [data validation draft4:properties.json\#/groups/4/tests/5](#mutation-event-497495ad06ae19bce54ad9b5556f1f42d6ff7761514606b19b2c99458beaafcd)

<a id="mutation-view-36704b9c44d181a4097c9b025b14a2f8eb77be2eb04a5e93b00406e9f653466e"></a>
### draft6/base/conformance

Unique mutations in this view: 4

- [data validation draft6:properties.json\#/groups/5/tests/2](#mutation-event-d225a8e8e26d67cf1bc42782c0ceffb6796cc84becbf4bf6d499ab3e76a1e001)
- [data validation draft6:properties.json\#/groups/5/tests/3](#mutation-event-b4cd94b4f0fff3bdf41aeb1be0b3703a5846e7c26f8c50fe25db80aa4c3453cb)
- [data validation draft6:properties.json\#/groups/5/tests/4](#mutation-event-beb2366c882969098a03ef0e5a98d3bda49bab9eb4058a67a2f8ead28517becc)
- [data validation draft6:properties.json\#/groups/5/tests/5](#mutation-event-781318811522fe9fe345d43cddf25fd4a9718f2c5ae35095b5d44f08ca509be5)

<a id="mutation-view-d92695ba0cd6af69610741ad5f2f0f418ab0dbcc6580d72e2d22fc41627273fb"></a>
### draft7/base/conformance

Unique mutations in this view: 4
Displayed mutation links: 2
Omitted mutation links: 2. Full records remain in JSON results.

- [data validation draft7:properties.json\#/groups/5/tests/2](#mutation-event-3885a4b41ffba00fce111dfa838512b6ee594ec64984506d9aa598c093f00085)
- [data validation draft7:properties.json\#/groups/5/tests/3](#mutation-event-85abb657a71422ac7f1bed5032cb4fea47834d07d1f187ab90f0c54e5a5a361a)

## Event details

<a id="mutation-event-b96a860fb65da173f0f93627781a23a15aea7b7e1e6e9d645418e41d68872bf6"></a>
### data validation draft4:properties.json\#/groups/4/tests/2

- **Draft:** draft4
- **Profile:** base
- **Phase:** conformance
- **Round:** N/A
- **Moment:** fast validation
- **Target:** data
- **mutationClass:** validation
- **Scope:** case
- **subjectId:** draft4:properties.json\#/groups/4/tests/2
- **Path:** $.toString
- **Kind:** added
- **Related status:** PASS
- **Related cause/error:** Unreported

Conformance used a disposable copy, and the case retained PASS status.

#### Before

    null

#### After

    {
      "descriptorType": "data",
      "configurable": true,
      "enumerable": true,
      "writable": true,
      "value": {
        "type": "undefined"
      }
    }

<a id="mutation-event-dcac4b0c26dea89d47c7a40ef6629e5f3a61a7747cdc9b7b2c4afde4d315ede8"></a>
### data validation draft4:properties.json\#/groups/4/tests/3

- **Draft:** draft4
- **Profile:** base
- **Phase:** conformance
- **Round:** N/A
- **Moment:** fast validation
- **Target:** data
- **mutationClass:** validation
- **Scope:** case
- **subjectId:** draft4:properties.json\#/groups/4/tests/3
- **Path:** $.toString
- **Kind:** added
- **Related status:** PASS
- **Related cause/error:** {"path":\["\_\_proto\_\_"\],"property":"instance.\_\_proto\_\_","message":"is not of a type\(s\) number","schema":{"type":"number"},"instance":"foo","name":"type","argument":\["number"\],"stack":"instance.\_\_proto\_\_ is not of a type\(s\) number"}

Conformance used disposable copies and recorded the related error or non-PASS result below.

#### Before

    null

#### After

    {
      "descriptorType": "data",
      "configurable": true,
      "enumerable": true,
      "writable": true,
      "value": {
        "type": "undefined"
      }
    }

<a id="mutation-event-d632b9c709e5b27b836fe1b2b1609f08fe780d9e1b33e4d2880717991621b691"></a>
### data validation draft4:properties.json\#/groups/4/tests/4

- **Draft:** draft4
- **Profile:** base
- **Phase:** conformance
- **Round:** N/A
- **Moment:** fast validation
- **Target:** data
- **mutationClass:** validation
- **Scope:** case
- **subjectId:** draft4:properties.json\#/groups/4/tests/4
- **Path:** $.constructor
- **Kind:** added
- **Related status:** PASS
- **Related cause/error:** {"path":\["toString","length"\],"property":"instance.toString.length","message":"is not of a type\(s\) string","schema":{"type":"string"},"instance":37,"name":"type","argument":\["string"\],"stack":"instance.toString.length is not of a type\(s\) string"}

Conformance used disposable copies and recorded the related error or non-PASS result below.

#### Before

    null

#### After

    {
      "descriptorType": "data",
      "configurable": true,
      "enumerable": true,
      "writable": true,
      "value": {
        "type": "undefined"
      }
    }

<a id="mutation-event-497495ad06ae19bce54ad9b5556f1f42d6ff7761514606b19b2c99458beaafcd"></a>
### data validation draft4:properties.json\#/groups/4/tests/5

- **Draft:** draft4
- **Profile:** base
- **Phase:** conformance
- **Round:** N/A
- **Moment:** fast validation
- **Target:** data
- **mutationClass:** validation
- **Scope:** case
- **subjectId:** draft4:properties.json\#/groups/4/tests/5
- **Path:** $.toString
- **Kind:** added
- **Related status:** PASS
- **Related cause/error:** {"path":\["constructor"\],"property":"instance.constructor","message":"is not of a type\(s\) number","schema":{"type":"number"},"instance":{"length":37},"name":"type","argument":\["number"\],"stack":"instance.constructor is not of a type\(s\) number"}

Conformance used disposable copies and recorded the related error or non-PASS result below.

#### Before

    null

#### After

    {
      "descriptorType": "data",
      "configurable": true,
      "enumerable": true,
      "writable": true,
      "value": {
        "type": "undefined"
      }
    }

<a id="mutation-event-d225a8e8e26d67cf1bc42782c0ceffb6796cc84becbf4bf6d499ab3e76a1e001"></a>
### data validation draft6:properties.json\#/groups/5/tests/2

- **Draft:** draft6
- **Profile:** base
- **Phase:** conformance
- **Round:** N/A
- **Moment:** fast validation
- **Target:** data
- **mutationClass:** validation
- **Scope:** case
- **subjectId:** draft6:properties.json\#/groups/5/tests/2
- **Path:** $.toString
- **Kind:** added
- **Related status:** PASS
- **Related cause/error:** Unreported

Conformance used a disposable copy, and the case retained PASS status.

#### Before

    null

#### After

    {
      "descriptorType": "data",
      "configurable": true,
      "enumerable": true,
      "writable": true,
      "value": {
        "type": "undefined"
      }
    }

<a id="mutation-event-b4cd94b4f0fff3bdf41aeb1be0b3703a5846e7c26f8c50fe25db80aa4c3453cb"></a>
### data validation draft6:properties.json\#/groups/5/tests/3

- **Draft:** draft6
- **Profile:** base
- **Phase:** conformance
- **Round:** N/A
- **Moment:** fast validation
- **Target:** data
- **mutationClass:** validation
- **Scope:** case
- **subjectId:** draft6:properties.json\#/groups/5/tests/3
- **Path:** $.toString
- **Kind:** added
- **Related status:** PASS
- **Related cause/error:** {"path":\["\_\_proto\_\_"\],"property":"instance.\_\_proto\_\_","message":"is not of a type\(s\) number","schema":{"type":"number"},"instance":"foo","name":"type","argument":\["number"\],"stack":"instance.\_\_proto\_\_ is not of a type\(s\) number"}

Conformance used disposable copies and recorded the related error or non-PASS result below.

#### Before

    null

#### After

    {
      "descriptorType": "data",
      "configurable": true,
      "enumerable": true,
      "writable": true,
      "value": {
        "type": "undefined"
      }
    }

<a id="mutation-event-beb2366c882969098a03ef0e5a98d3bda49bab9eb4058a67a2f8ead28517becc"></a>
### data validation draft6:properties.json\#/groups/5/tests/4

- **Draft:** draft6
- **Profile:** base
- **Phase:** conformance
- **Round:** N/A
- **Moment:** fast validation
- **Target:** data
- **mutationClass:** validation
- **Scope:** case
- **subjectId:** draft6:properties.json\#/groups/5/tests/4
- **Path:** $.constructor
- **Kind:** added
- **Related status:** PASS
- **Related cause/error:** {"path":\["toString","length"\],"property":"instance.toString.length","message":"is not of a type\(s\) string","schema":{"type":"string"},"instance":37,"name":"type","argument":\["string"\],"stack":"instance.toString.length is not of a type\(s\) string"}

Conformance used disposable copies and recorded the related error or non-PASS result below.

#### Before

    null

#### After

    {
      "descriptorType": "data",
      "configurable": true,
      "enumerable": true,
      "writable": true,
      "value": {
        "type": "undefined"
      }
    }

<a id="mutation-event-781318811522fe9fe345d43cddf25fd4a9718f2c5ae35095b5d44f08ca509be5"></a>
### data validation draft6:properties.json\#/groups/5/tests/5

- **Draft:** draft6
- **Profile:** base
- **Phase:** conformance
- **Round:** N/A
- **Moment:** fast validation
- **Target:** data
- **mutationClass:** validation
- **Scope:** case
- **subjectId:** draft6:properties.json\#/groups/5/tests/5
- **Path:** $.toString
- **Kind:** added
- **Related status:** PASS
- **Related cause/error:** {"path":\["constructor"\],"property":"instance.constructor","message":"is not of a type\(s\) number","schema":{"type":"number"},"instance":{"length":37},"name":"type","argument":\["number"\],"stack":"instance.constructor is not of a type\(s\) number"}

Conformance used disposable copies and recorded the related error or non-PASS result below.

#### Before

    null

#### After

    {
      "descriptorType": "data",
      "configurable": true,
      "enumerable": true,
      "writable": true,
      "value": {
        "type": "undefined"
      }
    }

<a id="mutation-event-3885a4b41ffba00fce111dfa838512b6ee594ec64984506d9aa598c093f00085"></a>
### data validation draft7:properties.json\#/groups/5/tests/2

- **Draft:** draft7
- **Profile:** base
- **Phase:** conformance
- **Round:** N/A
- **Moment:** fast validation
- **Target:** data
- **mutationClass:** validation
- **Scope:** case
- **subjectId:** draft7:properties.json\#/groups/5/tests/2
- **Path:** $.toString
- **Kind:** added
- **Related status:** PASS
- **Related cause/error:** Unreported

Conformance used a disposable copy, and the case retained PASS status.

#### Before

    null

#### After

    {
      "descriptorType": "data",
      "configurable": true,
      "enumerable": true,
      "writable": true,
      "value": {
        "type": "undefined"
      }
    }

<a id="mutation-event-85abb657a71422ac7f1bed5032cb4fea47834d07d1f187ab90f0c54e5a5a361a"></a>
### data validation draft7:properties.json\#/groups/5/tests/3

- **Draft:** draft7
- **Profile:** base
- **Phase:** conformance
- **Round:** N/A
- **Moment:** fast validation
- **Target:** data
- **mutationClass:** validation
- **Scope:** case
- **subjectId:** draft7:properties.json\#/groups/5/tests/3
- **Path:** $.toString
- **Kind:** added
- **Related status:** PASS
- **Related cause/error:** {"path":\["\_\_proto\_\_"\],"property":"instance.\_\_proto\_\_","message":"is not of a type\(s\) number","schema":{"type":"number"},"instance":"foo","name":"type","argument":\["number"\],"stack":"instance.\_\_proto\_\_ is not of a type\(s\) number"}

Conformance used disposable copies and recorded the related error or non-PASS result below.

#### Before

    null

#### After

    {
      "descriptorType": "data",
      "configurable": true,
      "enumerable": true,
      "writable": true,
      "value": {
        "type": "undefined"
      }
    }


- REST interface
    - at least GET/POST
        - better also PATCH/DELETE
    - predefine url, leave placeholders
    - fill placeholders on send request

- Types (self casting types)
    - integer
    - float
    - date
    - ...

- Toast, PopOver, etc.
    - create one interface for all
    - create on top responsive overlay for all notifications
        - set sections
        - multiple notifications...
            - dont stack
            - sections can expand
        - blend in and out (transitions)
        - limit notification count (?)
            - buffer notifications and show them after another went down
    - create multiple layer, set target element for interface
        - body is not ideal for everything

- search config builder
```JSON
{
    "query": "pet",
    "columns": [
        "index",
        "lastname",
        "firstname"
    ],
    "filter": {
        "index": {
            "null": false,
            "gt": 20
        },
        "firstname": {
            "contains": "den"
        }
    },
    "sort": {
        "lastname": "asc",
        "firstname": "asc"
    },
    "start": 0,
    "count": 50
}

query=pet
columns=index,lastname,firstname
filter=index:notnull,index:gt:20,firstname:contains:den
sort=lastname:asc,firstname:asc
start=0
count=50

?query=pet&columns=index,lastname,firstname&filter=index:notnull,index:gt:20,firstname:contains:den&sort=lastname:asc,firstname:asc&start=0&count=50
```
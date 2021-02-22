# Brryle

A simple search engine demonstrating full-text search capabilities of Elasticsearch.

## Configuration

App supports configuration by using environment variables:

* `PAGE_SIZE` *[int]* - max number of records per page (defaults to `5`)
* `ES_INDEX` *[str]* - name of index (or index alias) used in search (defaults to `news`)
* `ES_QUERY_TEMPLATE` *[str]* - name of search query template used in search (defaults to `brryle`)

### Elasticsearch index

Any Elasticsearch index that will be used with `Brylle` needs to contain following properties:

* `title` - title of the document
* `description` - description of the document
* `category` - main category of the document
* `subcategory` - subcategory for the document
* `url` - url of the original document
* `labels` - string containing labels relevant to document (doesn't need to be an array)
* `labelsSplit` - optional array of labels to display under the description of the document

### Query template

Any query template that will be used with `Brylle` needs to accept 3 parameters:

* `pQuery` - query string
* `pFrom` - index of page to start displaying results from (mapping to `from` property of Elasticsearch query)
* `pSize` - max size of single page of data (mapping to `size` property of Elasticsearch query)

## Local development

1. Run `node server.js` to start server
2. Run `npm run-script build` to overwrite served content

## Running sample instance

1. Instantiate installation using docker

```shell script
docker-compose up -d
```

2. Setup sample Elasticsearch objects

```shell script
make dummy-setup
```

It will register:

* Dummy data containing 500 documents (loaded into `news-dummy` index)
* Index alias pointing `news` to `news-dummy`
* Search query template named `brryle`

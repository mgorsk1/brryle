remove-index:
	curl -XDELETE http://localhost:9200/news-dummy

load-data:
	curl -XPUT http://localhost:9200/news-dummy/_bulk -H 'Content-Type: application/json' --data-binary @./resources/elasticsearch/dummy-data.json

register-alias:
	curl -XPOST http://localhost:9200/_aliases -H 'Content-Type: application/json' --data '@./resources/elasticsearch/index-alias.json'

register-query-template:
	curl -XPOST http://localhost:9200/_scripts/brryle -H 'Content-Type: application/json' --data '@./resources/elasticsearch/query-template.json'

dummy-setup: remove-index load-data register-alias register-query-template
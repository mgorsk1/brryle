register-index-alias:
	curl -XPOST http://localhost:9200/_aliases -H 'Content-Type: application/json' --data '@./resources/elasticsearch/index-alias.json'

register-query-template:
	curl -XPOST http://localhost:9200/_scripts/brryle -H 'Content-Type: application/json' --data '@./resources/elasticsearch/query-template.json'

setup: load-dummy-data register-alias register-query-template
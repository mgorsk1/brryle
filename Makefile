register-query-template:
	curl -XPOST http://localhost:9200/_scripts/brryle -H 'Content-Type: application/json' --data '@./resources/elasticsearch/query-template.json'

setup: register-query-template
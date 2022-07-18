print("""
-----------------------------------------------------------------
✨ Brryle!
-----------------------------------------------------------------
""".strip())

docker_build('brryle:dev', context='.')

k8s_yaml(helm('helm-chart', name='brryle-deployment', values='values/dev-values.yaml'))

k8s_resource('brryle', port_forwards='5000:80')
k8s_resource('elastic', port_forwards='9200:9200')

# /notices

### Todas as notícias (sem filtro):
```
curl http://192.168.1.12:3001/notices
```

### Só as de uma keyword:
```
curl "http://192.168.1.12:3001/notices?keyword=bitcoin"
```

### Filtrar por fonte (ex.: “Globo”):
```
curl "http://192.168.1.12:3001/notices?fonte=Globo"
```

### Intervalo de datas:
```
curl "http://192.168.1.12:3001/notices?dateFrom=2025-04-01&dateTo=2025-04-20"
```

### Combinações:
```
curl "http://192.168.1.12:3001/notices?keyword=transparencia&dateFrom=2025-04-10"
```
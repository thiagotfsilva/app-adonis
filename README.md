# Como rodar o projeto

## Para iniciar o ambiente

`docker compose up -d --build`

## Verificar se os containres subiram

`docker ps`

## Verificar os logs da api

`docker logs app-api`

### "entrar" no container da api

`docker exec -it app-api bash`

### comando para migracao

` npm run migrations`

### comando para rodar os tests

` npm run migrations`

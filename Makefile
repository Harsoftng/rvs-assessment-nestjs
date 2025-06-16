SHELL := /bin/bash

-include .env

# Docker operations.

configure-env:
	rm -rf .env;\
	cp .env.dist .env;\

setup-local:
	make configure-env;\
	make start;\
	yarn install;\
	make setup:db;\
	make seed;\
	yarn dev;\

start:
	docker-compose up -d ;\

stop:
	docker-compose down ;\

restart:
	docker-compose down ;\
	make start

list:
	docker-compose ps ;\

seed:
	yarn seed

setup-db:
	yarn setup:db

docker-update: stop
	docker-compose pull ;\
	docker volume prune -f || true ;\
	docker-compose up -d --build ;\

docker-clean:
	docker ps -qa --no-trunc --filter "status=exited" | xargs docker rm || true ;\
	docker images -f "dangling=true" -q | xargs docker rmi || true ;\
	docker volume prune -f || true ;\

ssh-backend:
	docker-compose exec app_backend sh
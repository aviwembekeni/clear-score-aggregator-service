# First attempt at a makefile to simplify some of the common commands.
# 	Goal: maintain reasonable cross-platform capability between:
# 		- MacOS,
# 		- WSL on Windows and
# 		- native Linux
.DEFAULT_GOAL := help

# General Variables
project := $(shell basename `pwd`)
workspace := "$(env)"
container := $(project)
docker-filecheck := /.dockerenv
backend := ../backend.tfvars
docker-warning := ""
env-resources := ""

# Buiild up Terraform argument variables
terraform-backend-vars := -var-file=$(backend)
terraform-backend-config := -backend-config=$(backend)
ifeq ($(env), global)
	env-resources := ./resources/global
else
	env-resources := ./resources/env
endif
terraform-env-vars := -var-file=$(env).tfvars

s3-url-raw := s3://$(env)-clear-score-aggregator-service/
replace-prod-string := prod.
s3-url := $(subst $(replace-prod-string),,$(s3-url-raw))

# Docker Warning
ifeq ("$(wildcard $(docker-filecheck))","")
	docker-warning = "⚠️  WARNING: Can't find /.dockerenv - it's strongly recommended that you run this from within the docker container."
endif

# Targets
help:
	@echo "Docker-Helper functions for building & running the the $(project) container(s)"
	@echo "---------------------------------------------------------------------------------------------"
	@echo "Targets:"
	@echo "  Docker Targets (run from local machine)"
	@echo "   - up     : brings up the contaier(s) & attach to the default container ($(default-container))"
	@echo "   - down   : stops the container(s)"
	@echo "   - build  : (re)builds the container(s)"
	@echo "  Service Targets (should only be run inside the docker container)"
	@echo "   - run    : run the service"
	@echo "   - deploy : deploy the service"
	@echo ""
	@echo "Options:"
	@echo " - env    : sets the environment - supported environments are: global | dev | prod"
	@echo ""
	@echo "Examples:"
	@echo " - Start Docker Container            : make up"
	@echo " - Rebuild Docker Container          : make build"
	@echo " - Rebuild & Start Docker Container  : make build up"

set-credentials:
	@echo "Validating the environment:"
	@# HACK: This is needed for WSL on Windows 10, since WSL has no way to map ~/.aws into a docker container,
	@#       as the ~ folder in WSL seems to be inaccessible to Docker for Windows
	@# TODO: Find a better way.
	@rsync -rup ~/.aws .

up: set-credentials down docker-network-required
	@echo "Starting containers..."
	@docker-compose up -d
	@echo "Attachig shell..."
	@docker-compose exec $(container) bash

shell: set-credentials
	@echo "Attachig shell..."
	@docker-compose exec $(container) bash

down: set-credentials
	@echo "Stopping containers..."
	@docker-compose down

build: set-credentials down
	@echo "Stopping containers..."
	@docker-compose down
	@echo "Building containers..."
	@docker-compose build

generate: docker-check
	@echo "(RE)Generating Typedefs..."
	yarn generate

yarn:
	@echo "Doing base yarn install"
	@yarn

run: yarn docker-check
	@echo "Starting the  $(project) service..."
	serverless offline --noTimeout --dontPrintOutput --watch --webpack-use-polling --stage local

deploy: yarn lint test env-check docker-check
	@echo "Deplopying the  $(project) service..."
	sls deploy --stage $(env) -v

create_domain: yarn env-check docker-check
	@echo "Creating the API Gateway Domain for Serverless..."
	sls create_domain --stage $(env)

test: yarn
	@echo "Testing the  $(project) service..."
	@yarn test

lint: yarn
	@echo "Checking Linting..."
	@yarn lint

docker-check:
	$(call assert-file-exists,$(docker-filecheck), This step should only be run from Docker. Please run `make up` first.)

env-check:
	$(call assert, env, No environment set. Supported environments are: [ dev | prod ]. Please set the env variable. e.g. `make env=dev plan`)

docker-network-required:
		@if [ ! "$$(docker network ls | grep clear-score)" ]; then \
			echo "Creating Docker Network grep clear-score ..." ;\
			docker network create grep clear-score ;\
		else \
			echo "Docker Network grep clear-score exists." ;\
		fi

# Check that given variables are set and all have non-empty values,
# die with an error otherwise.
#
# Params:
#   1. Variable name(s) to test.
#   2. (optional) Error message to print.
check_defined = \
    $(strip $(foreach 1,$1, \
    	$(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
    $(if $(value $1),, \
    	$(error Undefined $1$(if $2, ($2))))

define assert
  $(if $1,,$(error Assertion failed: $2))
endef

define assert_warn
  $(if $1,,$(warn Assertion failed: $2))
endef

define assert-file-exists
  $(call assert,$(wildcard $1),$1 does not exist. $2)
endef
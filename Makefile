.PHONY: start

PORT ?= 8080

start:
	@echo "Starting local server on http://localhost:$(PORT)"
	@python3 -m http.server $(PORT)
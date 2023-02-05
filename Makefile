NPX := npx

src := $(wildcard src/**/*.ts)

# .DEFAULT_GOAL := build

.PHONY : build check clean clobber

build : dist
dist : tsconfig.json $(src)
	$(NPX) tsc --project $<

check : jest.config.mjs $(src)
	$(NPX) jest --config $< --color

docs : typedoc.js $(src)
	$(NPX) typedoc --options $<

clean :
	-rm -r dist/ docs/
	find . \
		-name "*.js" \
		! -path ./typedoc.js \
		-type f \
		! -path "./node_modules/*" \
		-exec rm {} +

clobber :
	$(confirm)
	@$(MAKE) clean
	-rm -r node_modules/

define confirm
@while : ; do \
	printf %s "Do you want to continue? (y/n) [n]: " && \
	read -r && \
	case $$REPLY in \
		(Y|y) exit 0 ;; \
		(''|N|n) exit 1 ; \
	esac \
done
endef

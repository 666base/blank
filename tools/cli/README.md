# Blank Monorepo Cli

## Start

```bash
yarn blank -h
```

### Run build command defined in package.json

```bash
yarn blank i18n build
# or
yarn build -p i18n
```

### Run dev command defined in package.json

```bash
yarn blank web dev
# or
yarn dev -p i18n
```

### Clean

```bash
yarn blank clean --dist --rust
# clean node_modules
yarn blank clean --node-modules
```

### Init

> Generate files that make the monorepo work properly, the per project codegen will not be included anymore

```bash
yarn blank init
```

## Tricks

### Define scripts to run a .ts files without manually wiring a TypeScript loader

`blank run` will automatically inject `tsx` for your scripts

```json
{
  "name": "@blank/demo",
  "scripts": {
    "dev": "node ./dev.ts"
  }
}
```

```bash
blank @blank/demo dev
```

or

```json
{
  "name": "@blank/demo",
  "scripts": {
    "dev": "r ./src/index.ts"
  },
  "devDependencies": {
    "@blank-tools/cli": "workspace:*"
  }
}
```

### Short your key presses

```bash
# af is also available for running the scripts
yarn af web build
```

#### by custom shell script

> personally, I use 'af'

create file `af` in the root of Blank project with the following content

```bash
#!/usr/bin/env sh
./tools/scripts/bin/runner.js blank.ts $@
```

or on windows:

```cmd
node "./tools/cli/bin/runner.js" blank.ts %*
```

and give it executable permission

```bash
chmod a+x ./af

# now you can run scripts with simply
./af web build
```

if you want to go further, but for vscode(or other forks) only, add the following to your `.vscode/settings.json`

```json
{
  "terminal.integrated.env.osx": {
    "PATH": "${env:PATH}:${cwd}"
  },
  "terminal.integrated.env.linux": {
    "PATH": "${env:PATH}:${cwd}"
  },
  "terminal.integrated.env.windows": {
    "PATH": "${env:PATH};${cwd}"
  }
}
```

restart all the integrated terminals and now you get:

```bash
af web build
```

```

```

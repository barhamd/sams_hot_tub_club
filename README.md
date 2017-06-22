# Sam's Hot Tub Club

## Installation

1. clone the repo
2. `npm install`
3. `bower install`
4. `gulp`

## Setting Environmental Variables

Deploying and building require environmental variables. Set them in
`.env.json`. See an example in `.env.json.example`.

## Watching

`gulp`

## Building

`gulp build`

### Build with minimization
`NODE_ENV=[production|staging] gulp build`

## Deploy

`NODE_ENV=[production|staging] gulp deploy`

*Note*: Not including `NODE_ENV` in the command will deploy to
`process.env.stagHost` without compressing or minifying assets.

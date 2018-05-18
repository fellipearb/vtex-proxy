# VTEX Proxy

## Pre-requisites

* Node - http://nodejs.org/

## Install

Clone this repo or download and unzip it.

## Quick Start

Enter the folder you cloned or downloaded, install dependencies and run `npm run dev`:

```shell
    cd vtex-proxy
    npm install
    npm run dev
```

First, open your browser here to authenticate:

https://your-store-account-name.vtexcommercestable.com.br/admin/Site/Login.aspx

AND

https://your-store-account-name.vtexlocal.com.br:3000/admin/Site/Login.aspx

## Features

All files in `src/` are compiled, optimized and copied to `build/` when you run `gulp`.

Currently supported:

- LiveReload of assets HTTPS
- SASS compilation
- JS and CSS Minification

## FAQ

### Release History

- 2018-05-08    v1.0.0      Create Vtex Proxy
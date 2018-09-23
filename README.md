# Workspace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.2.

# Projects

## Catchy-name library

Angular library exporting a single ngModule `CatchyNameModule` and a component `CatchyNameComponent`.

### Build

```
npm run build:lib
```

### Usage

1. Install `catchy-name` and save it as dependency.
``` bash
npm i --save catchy-name
```

2. Import the `CatchyNameModule` in the root module of the application.

**app.module.ts**
``` ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CatchyNameModule } from 'catchy-name';

@NgModule({
  imports: [
    BrowserModule,
    CatchyNameModule,
  ],
  // ...
})
export class AppModule { }
```

3. Now you can use the `CatchyNameComponent`. Its selector is`awe-catchy-name`.

**app.component.html**
``` html
<awe-catchy-name></awe-catchy-name>
```

## Demo application

Angular application demonstrating how to use the `catchy-name` library.

### Run
``` bash
npm run build:demo
```


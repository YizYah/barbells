
[//]: # ( ns__file unit: standard, comp: README.md )

[//]: # ( ns__custom_start beginning )

[//]: # ( ns__custom_end beginning )

[//]: # ( ns__start_section intro )

[//]: # ( ns__custom_start description )
![](src/custom/images/barbells.gif)

simple management of helpers and partials for handlebars

[//]: # ( ns__custom_end description )

[//]: # ( ns__custom_start afterDescription )

[//]: # ( ns__custom_end afterDescription )

[//]: # ( ns__custom_start badges )

[//]: # ( ns__start_section usageSection )
[![codecov](https://codecov.io/gh/YizYah/barbells/branch/main/graph/badge.svg?token=G5W08HMFMM)](https://codecov.io/gh/YizYah/barbells)
[![Version](https://img.shields.io/npm/v/barbells.svg)](https://npmjs.org/package/barbells)
[![Downloads/week](https://img.shields.io/npm/dw/barbells.svg)](https://npmjs.org/package/barbells)
[![License](https://img.shields.io/npm/l/barbells.svg)](https://github.com/YizYah/barbells/blob/master/package.json)

[![Geenee](https://img.shields.io/badge/maintained%20by-geenee-brightgreen)](https://npmjs.org/package/geenee)
[![Template](https://img.shields.io/badge/template-ts--packrat-blue)](https://npmjs.org/package/ts-packrat)

[//]: # ( ns__custom_end badges )

[//]: # ( ns__end_section intro )


[//]: # ( ns__start_section api )


[//]: # ( ns__custom_start APIIntro )

<!-- toc -->
* [:clipboard: Why](#clipboard-why)
* [:white_check_mark: What](#white_check_mark-what)
* [:wrench: Basic Usage](#wrench-basic-usage)
* [:paperclip: Built In Handlers](#paperclip-built-in-handlers)
* [:thumbsup: Adding Helpers](#thumbsup-adding-helpers)
* [:computer: Adding Partials](#computer-adding-partials)
* [:ledger: API](#ledger-api)
<!-- tocstop -->

# <a name="clipboard-why"></a>:clipboard: Why
[Handlebars](https://handlebarsjs.com/guide/) is super simple, but there's a learning curve to getting it set up with template files, helpers and partials.

# <a name="white_check_mark-what"></a>:white_check_mark: What
A tool that provides:
   1. the standard libraries of helpers out of the box
   2. automatic registration of custom helpers and partials
   3. a tool for loading a template from a file.

# <a name="wrench-basic-usage"></a>:wrench: Basic Usage
Include the package:
```
npm i barbells
```

Then:
1. create a handlebars instance with all the handlebars helpers and partials for the project;
2. use it by loading a template from a file.
```
const {prepareHandlebars} = require('barbells')
const {loadFileTemplate} = require('barbells')
const projectDir = "path/to/parentDir" // where parentDir has optional `partials` and `helpers` directories

const Handlebars = await prepareHandlebars(projectDir)

const myContext = {foo: "bar"}  // an object with whatever you want...
cond pathString = "~/templates/myTemplate.hbs"

const fileTemplate = await loadFileTemplate(pathString, null, Handlebars)

const fileText = await fileTemplate(context)

```
# <a name="paperclip-built-in-handlers"></a>:paperclip: Built In Handlers
1. You have full use of two packages of helpers:
* [handlebars-helpers](https://www.npmjs.com/package/handlebars-helpers)
* [just-handlebars-helpers](https://www.npmjs.com/package/just-handlebars-helpers)

  For instance, `{{capitalizeFirst 'super cat'}}` produces `Super cat` and `{{and value1 value2}}` will result in the `value1 && value2`.

2. There are a few added helpers, really just for legacy usage:
    * `{{safe text}}` shows `text` without escape characters.  That is helpful if you are getting unwanted escapes of certain special characters such as quote marks.
    * `{{curly true}}` produces a left curly brace `{`,  {{curly}} returns `}`. 
    
  And if you want to use this with a [geenee](https://www.npmjs.com/package/geenee) template you can add the [geenee abbreviations](https://geenee.nostack.net/Making-Files-Customizable) as well.
    
# <a name="thumbsup-adding-helpers"></a>:thumbsup: Adding Helpers
3. The `helpers` directory should contain any additional helpers that you create.  Since `geenee-rate` is written with typescript, your helpers should be in typescript as well, with a `.ts` extension.

   See [this example](https://github.com/YizYah/basicNsFrontTemplate/tree/master/helpers) for some ideas.

# <a name="computer-adding-partials"></a>:computer: Adding Partials
You have access everywhere to the full list of partials in the `partials` directory.  A partial is specified within a Handlebars file of the same name (not counting the file extension).  You can add as many as you like, and create as many subdirectories as you need.  But, there are two naming constraints:
1. The name of each partial must be unique.
2. Each partial file should have an '.hbs' extension.

[This example](https://github.com/YizYah/basicNsFrontTemplate/tree/master/partials) shows some subdirectories and a number of examples.  Many clauses that appear in multiple types of files are used.

# <a name="ledger-api"></a>:ledger: API

## prepareHandlebars function
```
prepareHandlebars(projectDir: string) 
```

Returns a handlebars with all the built-in and provided handlers and partials provided.

The `projectDir` is the path to a directory containing optional `partials` and `handlers` folders.

## loadFileTemplate function
```
async function loadFileTemplate(
  pathString: string, 
  Handlebars: any, 
  fileFilter: string|null, noFileInfo = false
)
```

The `pathString` tells where the template to load is stored.  The file contains the contents of the template.

The `Handlebars` is a handlebars instance, typically created with `prepareHandlebars`.

You can optionally provide a `fileFilter` string to `loadFileTemplate` which is a glob.  `barbells` will then prepare a template for use in with the [geenee-rate](https://www.npmjs.com/package/geenee-rate) generator by adding a [geenee](https://www.npmjs.com/package/geenee) file info tag at the beginning of the template whenever a filename matches the `fileFilter`.

`noFileInfo` suppresses generation of a file info tag even if the filename matches the `fileFilter`.

[//]: # ( ns__custom_end APIIntro )


[//]: # ( ns__custom_start constantsIntro )


[//]: # ( ns__custom_end constantsIntro )



[//]: # ( ns__start_section types )


[//]: # ( ns__end_section types )


[//]: # ( ns__end_section api )


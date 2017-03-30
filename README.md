# generator-biztalkpipelinecomponent ![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Generator for BizTalk PipelineComponents

A hughe part of the work involved in creating a pipeline component is setting upp boiler plate code. This generator aims to relieve you of that.

This generator generates this project structure:

```
<pipelinecomponentname>.sln
│   .gitignore
│   nuget.config    
│   .gitattributes
│
└───Src
│   |
│   └───<pipelinecomponentname>.csproj
│       |   <componentname>.cs
│       |   <componentname>.component.cs
|       |   <componentname>.nuspec
│       |   <packages>.config
│       │
│       └───BizTalkComponents.Utils
│   
└───Tests
│    |
│    └───UnitTests
|       |
│       └───UnitTests.csproj
└───Build
│   
└───   <pipelinecomponentname>.proj
```

## Compatability
Works with:
- BizTalk Server 2013
- BizTalk Server 2013R2
- BizTalk Server 2016

## Installation

First, install [node.js and npm](https://nodejs.org/en/download/current/) (we assume you are running Windows since this is a BizTalk generator).
Install [Yeoman](http://yeoman.io) and generator-biztalk using [npm](https://www.npmjs.com/). Then in PowerShell run:

```bash
npm install -g yo
npm install -g generator-biztalkpipelinecomponent
```

Then generate your new project:

```bash
yo biztalkpipelinecomponent
```
## License

MIT © [Robin Hultman]()


[npm-image]: https://badge.fury.io/js/generator-biztalkpipelinecomponent.svg
[npm-url]: https://npmjs.org/package/generator-biztalkpipelinecomponent
[travis-image]: https://travis-ci.org/robinhultman/generator-biztalkpipelinecomponent.svg?branch=master
[travis-url]: https://travis-ci.org/robinhultman/generator-biztalkpipelinecomponent
[daviddm-image]: https://david-dm.org/robinhultman/generator-biztalkpipelinecomponent.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/robinhultman/generator-biztalkpipelinecomponent

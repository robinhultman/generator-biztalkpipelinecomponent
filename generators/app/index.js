'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var uuid = require('uuid');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the bee\'s knees ' + chalk.red('generator-biztalkpipelinecomponent') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'namespace',
        message: 'Namespace of the component?',
        default: 'Shared.PipelineComponents'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Name of the component?',
        default: 'MyComponent'
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Project homepage?',
        default: 'myhomepage'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author?',
        default: 'Author'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe the component',
        default: 'description of component'
      },
      {
        type: 'list',
        name: 'pipelinestage',
        message: 'Which pipeline stage?',
        default: 'Any',
        choices: [
          {
            name: 'Any',
            value: 'any'
          },
          {
            name: 'Decode',
            value: 'decode'
          },

          {
            name: 'Disassemble',
            value: 'disassemble'
          },
          {
            name: 'Validate',
            value: 'validate'
          }
          ,
          {
            name: 'ResolveParty',
            value: 'resolveparty'
          },
          {
            name: 'PreAssemble',
            value: 'preassemble'
          },
          {
            name: 'Assemble',
            value: 'assemble'
          }
          ,
          {
            name: 'Encode',
            value: 'encode'
          }
        ]
      },
      {
        type: 'list',
        name: 'dotnetversion',
        message: 'Which .NET version?',
        default: 'v46',
        choices: [
          {
            name: 'v4.6',
            value: 'v46'
          },
          {
            name: 'v4.5',
            value: 'v45'
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    var dotnetversion = "";
    switch (this.props.dotnetversion) {
      case "v46":
        dotnetversion = "v4.6";
        break;
      case "v45":
        dotnetversion = "v4.5";
        break;
    }
    var stage = "";
    var folder = "";
    switch (this.props.pipelinestage) {
      case "decode":
        stage = "CATID_Decoder";
        folder = "PipelineComponents"
        break;
      case "any":
        stage = "CATID_Any";
        folder = "PipelineComponents"
        break;
      case "disassemble":
        stage = "CATID_DisassemblingParser";
        folder = "Disassembler"
        break;
      case "validate":
        stage = "CATID_Validate";
        folder = "PipelineComponents"
        break;
      case "resolveparty":
        stage = "CATID_PartyResolve";
        folder = "PipelineComponents"
        break;
      case "preassemble":
        stage = "CATID_Any";
        folder = "PipelineComponents"
        break;
      case "assemble":
        stage = "CATID_AssemblingSerializer";
        folder = "Assembler"
        break;
      case "encode":
        stage = "CATID_Encoder";
        folder = "PipelineComponents"
        break;
    }

    var options = {
      name: this.props.name,
      namespace: this.props.namespace,
      componentUUID: uuid.v1().toUpperCase(),
      componentProjectUUID: uuid.v1().toUpperCase(),
      testUUID: uuid.v1().toUpperCase(),
      compomentClassUUID: uuid.v1().toUpperCase(),
      assemblyUUID: uuid.v1().toUpperCase(),
      dotnetversion: dotnetversion,
      author: this.props.author,
      projecturl: this.props.homepage,
      description: this.props.description,
      pipelinestage: stage
    };

    this.fs.copy(
      this.templatePath(folder + '/_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath(folder + '/_gitattributes'),
      this.destinationPath('.gitattributes')
    );
    this.fs.copy(
      this.templatePath(folder + '/nuget.config'),
      this.destinationPath('nuget.config')
    );
    this.fs.copyTpl(
      this.templatePath(folder + '/PipelineComponent.sln'),
      this.destinationPath(this.props.namespace + "." + this.props.name + '.sln'),
      options
    );
    this.fs.copy(
      this.templatePath(folder + '/Tests/UnitTests/packages.config'),
      this.destinationPath('Tests/UnitTests/packages.config')
    );
    this.fs.copyTpl(
      this.templatePath(folder + '/Tests/UnitTests/Tests.csproj'),
      this.destinationPath('Tests/UnitTests/UnitTests.csproj'),
      options
    );
    this.fs.copyTpl(
      this.templatePath(folder + '/Tests/UnitTests/Tests.cs'),
      this.destinationPath('Tests/UnitTests/' + this.props.name + 'Tests.cs'),
      options
    );
    this.fs.copyTpl(
      this.templatePath(folder + '/Tests/UnitTests/Properties/AssemblyInfo.cs'),
      this.destinationPath('Tests/UnitTests/Properties/AssemblyInfo.cs'),
      options
    );
    this.fs.copy(
      this.templatePath(folder + '/Src/packages.config'),
      this.destinationPath('Src/packages.config')
    );
    this.fs.copy(
      this.templatePath(folder + '/Src/BizTalkComponents.Utils/ContextExtensions.cs'),
      this.destinationPath('Src/BizTalkComponents.Utils/ContextExtensions.cs')
    );
    this.fs.copy(
      this.templatePath(folder + '/Src/BizTalkComponents.Utils/ContextProperties.cs'),
      this.destinationPath('Src/BizTalkComponents.Utils/ContextProperties.cs')
    );
    this.fs.copy(
      this.templatePath(folder + '/Src/BizTalkComponents.Utils/ContextProperty.cs'),
      this.destinationPath('Src/BizTalkComponents.Utils/ContextProperty.cs')
    );
    this.fs.copy(
      this.templatePath(folder + '/Src/BizTalkComponents.Utils/PropertyBagHelper.cs'),
      this.destinationPath('Src/BizTalkComponents.Utils/PropertyBagHelper.cs')
    );
    this.fs.copy(
      this.templatePath(folder + '/Src/BizTalkComponents.Utils/RequiredRuntimeAttribute.cs'),
      this.destinationPath('Src/BizTalkComponents.Utils/RequiredRuntimeAttribute.cs')
    );
    this.fs.copy(
      this.templatePath(folder + '/Src/BizTalkComponents.Utils/ValidationHelper.cs'),
      this.destinationPath('Src/BizTalkComponents.Utils/ValidationHelper.cs')
    );

    this.fs.copyTpl(
      this.templatePath(folder + '/Src/component.nuspec'),
      this.destinationPath('Src/' + this.props.namespace + '.' + this.props.name + '.nuspec'),
      options
    );
    this.fs.copyTpl(
      this.templatePath(folder + '/Src/Component.csproj'),
      this.destinationPath('Src/' + this.props.name + '.csproj'),
      options
    );
    this.fs.copyTpl(
      this.templatePath(folder + '/Src/Component.cs'),
      this.destinationPath('Src/' + this.props.name + '.cs'),
      options
    );
    this.fs.copyTpl(
      this.templatePath(folder + '/Src/Component.Component.cs'),
      this.destinationPath('Src/' + this.props.name + '.Component.cs'),
      options
    );
    this.fs.copyTpl(
      this.templatePath(folder + '/Src/Properties/AssemblyInfo.cs'),
      this.destinationPath('Src/Properties/AssemblyInfo.cs'),
      options
    );
    this.fs.copyTpl(
      this.templatePath(folder + '/Build/Build.proj'),
      this.destinationPath('Build/' + this.props.namespace + '.' + this.props.name + '.proj'),
      options
    );
  }
};

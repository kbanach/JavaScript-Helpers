"use strict";function capitalizeFirstLetter(a){return a.charAt(0).toUpperCase()+a.slice(1)}function reverseString(a){return a.split("").reverse().join("")}function beautifyTypeOutput(a,b){var c="";return _.forEach(a,function(a,d){a.trim()&&(d&&(c+="\n"+b.andWrapper+b.andLiteral+reverseString(b.andWrapper)+" "),c+=a)}),c}function getHeader(a){var b="";return _.isEmpty(a.header.trim())?b:(b+=a.headerWrapper+a.header+reverseString(a.headerWrapper)+"\n",a.spaceBetween&&(b+="\n"),b)}function getReadableOutput(a){var b="";return b+=getHeader(a),_.forEach(a.fieldTypes,function(c,d){var e=a[c];d&&(b+="\n"),b+=a.typeWrapper+e.readableName+reverseString(a.typeWrapper)+" "+beautifyTypeOutput(e.getValues(),a),a.spaceBetween&&(b+="\n")}),b}function bddTicketsCtrl(a){function b(a){_.isArray(a.fieldTypes)&&_.forEach(a.fieldTypes,function(b){a[b]=new FieldType(b),a[b].add()})}function c(){i=!0,a.options=angular.copy(j),b(a.options),i=!1,d()}function d(){i||(a.output=getReadableOutput(a.options))}function e(b){return _.get(a.options,b)?a.options[b].add():void 0}function f(b,c){var e;return _.get(a.options,b)?(e=a.options[b].remove(c),d(),e):void 0}function g(b){var c;return _.get(a.options,b)&&(c=a.options[b].getValues()),d(),c}function h(){b(a.options),d()}var i=!1,j={fieldTypes:["given","when","then"],fieldTypesPlaceholders:["state of app, e.g. logged as Administrator to Reports site",'action/trigger of behaviour, e.g. button "Generate report" is clicked',"expected result, e.g. download popup is visible"],typeWrapper:"*",andWrapper:"_",andLiteral:"And",header:"Scenario #1",headerWrapper:"_*",spaceBetween:!0,showOptions:!1,placeholder:{typeWrapper:"char which will be around step name, e.g. * will wrap Given to *Given*",andWrapper:"char which will be around And, e.g. _ will wrap it to _And_",header:"e.g. Scenario #1",headerWrapper:"char which will be around And, e.g. _* will wrap it to _*Secenario #1*_"}};a.reset=c,a.calculateOutput=d,a.updateStepFieldsTypes=h,a.addField=e,a.removeField=f,a.updateFields=g,c(),d()}function charChain(a,b){for(var c="",d=0;b>d;d++)c+=a;return c}function escapeCharInWholeString(a,b){return b.replace(new RegExp(a,"g"),"\\"+a)}function fillLine(a,b,c){var d="",e=b-a.length,f=Math.round(e/2),g=e-f,h=charChain(c.fillChar,f+1*c.borderAround),i=charChain(c.fillChar,g+1*c.borderAround);return d+=h,c.additionalEmptySpacer&&(d+=" "),d+=a,c.additionalEmptySpacer&&(d+=" "),d+=i,c.escapeStringEscapeChars&&(d=escapeCharInWholeString(c.stringEscapeChar,d)),d}function wrapLineInChars(a,b){var c="";if(a){var d=2*b.fillChar.length*b.borderAround+2*b.additionalEmptySpacer,e=b.lineLength-d;if(a.length<e)c=b.lineStart+b.stringEscapeChar+fillLine(a,e,b)+b.stringEscapeChar+b.lineEnd+b.endOfLineChar;else for(var f,g=0;g<a.length;)f=a.slice(g,g+e),c+=b.lineStart+b.stringEscapeChar+fillLine(f,e,b)+b.stringEscapeChar+b.lineEnd+b.endOfLineChar,g+=e}return c}function generateEmptyLine(a){var b="";return b+=a.lineStart+a.stringEscapeChar+charChain(a.fillChar,a.lineLength)+a.stringEscapeChar+a.lineEnd+a.endOfLineChar}function generateLine(a,b){var c="";return a&&(c+=wrapLineInChars(a,b)),c}function varLog(a,b){var c="";if(a&&"string"==typeof a){var d=a;b.escapeStringEscapeChars&&(d=escapeCharInWholeString(b.stringEscapeChar,d)),c+=b.lineStart+b.stringEscapeChar+b.fillChar,b.additionalEmptySpacer&&(c+=" "),c+=d+b.varNamePostfix+" "+b.stringEscapeChar+b.varConcatChar+b.varEscapePrefix+a+b.varEscapePostfix+b.lineEnd+b.endOfLineChar}return c}function generateComment(a){var b="",c=a.input.split("\n");a.borderAround&&(b+=generateEmptyLine(a));for(var d=0;d<c.length;d++)b+=generateLine(c[d].trim(),a);if(a.varsToList)for(var e=a.varsToList.split(a.varsToListSeparator),d=0;d<e.length;d++)a.borderAround&&(b+=generateEmptyLine(a)),b+=varLog(e[d].trim(),a);return a.borderAround&&(b+=generateEmptyLine(a)),b}function commentWrapperCtrl(a){function b(){e||(a.output=generateComment(a.options))}function c(){e=!0,a.options=angular.copy(f),e=!1,b()}function d(c){e=!0,angular.extend(a.options,c),e=!1,b()}var e=!1,f={lineStart:"console.log(",lineEnd:");",stringEscapeChar:"'",lineLength:60,fillChar:"*",showAdvancedOptions:!1,additionalEmptySpacer:!0,borderAround:!0,escapeStringEscapeChars:!0,endOfLineChar:"\n",varsToList:"",varNamePostfix:":",varsToListSeparator:",",varConcatChar:",",varEscapePrefix:"",varEscapePostfix:"",placeholder:{lineStart:"console.log(",lineEnd:");",fillChar:'e.g. "*" or "="',varConcatChar:'e.g. "," or "+"',varsToList:"lorem, ipsum, dolor",varEscapePrefix:"JSON.stringify(",varEscapePostfix:', false, "\\t")',varNamePostfix:'e.g. ":" or "="'},input:"Put your comment\nhere"},g={androidstudio:{presetName:"Android Studio",lineStart:"Log.i(TAG, ",lineEnd:");",lineLength:80,stringEscapeChar:'"',varConcatChar:"+",varEscapePrefix:"",varEscapePostfix:".toString()",input:"Android Studio preset loaded!\nLoad LOG class and add an TAG string"},browser:{lineStart:"console.log(",lineEnd:");",escapeStringEscapeChars:!0,stringEscapeChar:"'",presetName:"Browser",lineLength:60,varEscapePrefix:"",varEscapePostfix:"",varConcatChar:",",input:"Browser preset loaded!"},javascriptcomment:{presetName:"JS Comment",lineStart:"// ",lineEnd:"",stringEscapeChar:"",lineLength:60,fillChar:"*",additionalEmptySpacer:!0,borderAround:!0,escapeStringEscapeChars:!1,endOfLineChar:"\n",input:"JS Comment preset loaded!"},nodejs:{lineStart:"console.log(",lineEnd:");",escapeStringEscapeChars:!0,stringEscapeChar:"'",presetName:"NodeJS",lineLength:60,varEscapePrefix:"util.inspect(",varEscapePostfix:", false, 3)",varConcatChar:",",input:'NodeJS preset loaded!\nDon`t forget to require "util" Node package'},python3:{lineStart:"print(",lineEnd:")",escapeStringEscapeChars:!0,stringEscapeChar:"'",presetName:"Python 3.x",lineLength:60,varEscapePrefix:"str(",varEscapePostfix:")",varConcatChar:" + ",input:"Python 3.x preset loaded!"}};a.options=angular.copy(f),a.calculateOutput=b,a.presets=g,a.loadPreset=d,a.reset=c,b()}function chopTextBySections(a){function b(a){a.test(g[h])&&(i=!0)}var c=a.input,d=a.sections,e="",f={},g=c.split("\n");for(var h in g)if(g.hasOwnProperty(h)){var i=!1;if(d.forEach(b),i){e=g[h].trim();continue}g[h].trim()[0]===a.listChar?("undefined"==typeof f[e]&&(f[e]=""),f[e]+="\n"+g[h].trim()):e="Others:"}return f}function beautifyOutput(a){var b="";for(var c in a)a.hasOwnProperty(c)&&(b+=c,b+=a[c],b+="\n\n");return b}function parseCommits(a){var b="",c=chopTextBySections(a);return b+=beautifyOutput(c)}function generateSections(a){var b=angular.copy(a.sectionLiterals),c=[];return b.forEach(function(b){var d="";_.isString(b)&&!_.isEmpty(b.trim())&&(a.sectionCaseInsensitive&&(d+="i"),c.push(new RegExp("^"+b.trim(),d)))}),c}function generateTaskTitle(a){var b=angular.copy(a.taskNameInput),c="";return _.isString(b)&&(b=b.trim(),_.isEmpty(b)||(a.taskNameEscape&&b[0]===a.taskNameCharToEscape&&(b=b.substring(1),c+=a.taskNameEscaper),c+=b+"\n\n")),c}function commitParserCtrl(a){function b(){e=!0,a.options=angular.copy(f),e=!1,d(),c()}function c(){e||(a.output=generateTaskTitle(a.options)+parseCommits(a.options))}function d(){a.options.sectionsInput.trim()&&(a.options.sectionLiterals=a.options.sectionsInput.split(a.options.sectionsSeparator)),a.options.sections=generateSections(a.options)}var e=!1,f={showAdvancedOptions:!0,input:"",taskNameInput:"",taskNameEscape:!0,taskNameCharToEscape:"#",taskNameEscaper:" #",listChar:"*",sectionsInput:"",sectionsSeparator:",",sectionLiterals:["added","removed","fixed","modified"],sectionCaseInsensitive:!0,sections:[/added:/i,/removed:/i,/fixed:/i,/modified:/i],placeholder:{sections:"Defaults: added, removed, fixed, modified",listChar:'e.g. "*" or "-"',input:"// example how to fill this field:\n\nAdded:\n* thing added\n* another thing added\n\nRemoved:\n* unwanted feature to remove\n\nNot matched section:\n* this will be in Others\n\nThis text will be totaly ignored"}};a.reset=b,a.calculateOutput=c,a.updateSections=d,b(),c()}function selectElementsContent(a){var b=document;if(a instanceof HTMLElement){if(b.body.createTextRange){var c=b.body.createTextRange();c.moveToElementText(a),c.select()}else if(window.getSelection){var d=window.getSelection(),c=b.createRange();c.selectNodeContents(a),d.removeAllRanges(),d.addRange(c)}return!0}throw new Error("You can select only HTMLElement")}function selectOutput(a){selectElementsContent(document.getElementById(a))}function outputFieldDirective(){return{templateUrl:"views/partials/output-field.html",restrict:"E",scope:{value:"="},link:function(a){a.select=selectOutput,a.output_id="commentWrapper_output"}}}angular.module("jsUtilsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/",{templateUrl:"views/comment-wrapper.html",controller:"CommentWrapperCtrl",controllerAs:"commentWrapper"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl",controllerAs:"contact"}).when("/commits",{templateUrl:"views/commit-parser.html",controller:"CommitParserCtrl",controllerAs:"commitParser"}).when("/bdd",{templateUrl:"views/bdd-tickets.html",controller:"BddTicketsCtrl",controllerAs:"bddTickets"}).otherwise({redirectTo:"/"})}]),angular.module("jsUtilsApp").controller("MainCtrl",function(){}),angular.module("jsUtilsApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("jsUtilsApp").controller("BddTicketsCtrl",bddTicketsCtrl);var InputField=function(){function a(a){this.label=a,this.value=""}return a}(),FieldType=function(){function a(a){this.type=a,this.readableName=capitalizeFirstLetter(a),this.fields=[]}return a.prototype.add=function(){var a=_.uniqueId(this.type+"_");this.fields.push(new InputField(a))},a.prototype.remove=function(a){var b=_.remove(this.fields,function(b){return b.label===a});return b},a.prototype.getValues=function(){return _.map(this.fields,"value")},a}();bddTicketsCtrl.$inject=["$scope"],angular.module("jsUtilsApp").controller("CommentWrapperCtrl",["$scope",commentWrapperCtrl]),angular.module("jsUtilsApp").controller("CommitParserCtrl",commitParserCtrl),commitParserCtrl.$inject=["$scope"],angular.module("jsUtilsApp").controller("ContactCtrl",["$scope",function(a){a.gitHubLink="https://github.com/kbanach/JavaScript-Helpers"}]),angular.module("jsUtilsApp").directive("mainMenu",function(){return{templateUrl:"views/partials/main-menu.html",restrict:"E"}}),angular.module("jsUtilsApp").directive("outputField",outputFieldDirective),angular.module("jsUtilsApp").run(["$templateCache",function(a){a.put("views/about.html","<h2>About</h2> <p>This site will be filled with some content. I promise.</p>"),a.put("views/bdd-tickets.html",'<h2>BDD Tickets</h2> <h3> Settings <div class="btn-group pull-right"> <a class="btn btn-sm pull-right" ng-class="{true: \'btn-primary\', false: \'btn-danger\'}[!options.showOptions]" ng-click="options.showOptions = !options.showOptions"> {{!options.showOptions && \'Show\' || \'Hide\'}} settings </a> </div> </h3> <div ng-show="options.showOptions"> <div class="form-group"> <label>Steps</label> <form class="form-inline"> <div class="form-group"> <label class="sr-only" for="bddTickets_steps_given">Given</label> <input type="text" ng-model="options.fieldTypes[0]" ng-blur="updateStepFieldsTypes()" class="form-control" id="bddTickets_steps_given" placeholder="e.g. Given"> </div> <div class="form-group"> <label class="sr-only" for="bddTickets_steps_when">When</label> <input type="text" ng-model="options.fieldTypes[1]" ng-blur="updateStepFieldsTypes()" class="form-control" id="bddTickets_steps_when" placeholder="e.g. When"> </div> <div class="form-group"> <label class="sr-only" for="bddTickets_steps_then">Then</label> <input type="text" ng-model="options.fieldTypes[2]" ng-blur="updateStepFieldsTypes()" class="form-control" id="bddTickets_steps_then" placeholder="e.g. Then"> </div> </form> </div> <div class="form-group"> <label class="checkbox-inline"> <input type="checkbox" ng-model="options.spaceBetween" ng-change="calculateOutput()">Additional empty line between steps </label> </div> <div class="form-group"> <label for="bddTickets_andWrapper">Header wrap char (up to 3 chars, closing ones will be in reverse order)</label> <input type="text" ng-model="options.headerWrapper" ng-change="calculateOutput()" maxlength="3" class="form-control" placeholder="{{options.placeholder.headerWrapper}}" id="bddTickets_headerWrapper"> </div> <div class="form-group"> <label for="bddTickets_typeWrapper">Step name wrap char (up to 3 chars, closing ones will be in reverse order)</label> <input type="text" ng-model="options.typeWrapper" ng-change="calculateOutput()" maxlength="3" class="form-control" placeholder="{{options.placeholder.typeWrapper}}" id="bddTickets_typeWrapper"> </div> <div class="form-group"> <label for="bddTickets_andWrapper">"And" wrap char (up to 3 chars, closing ones will be in reverse order)</label> <input type="text" ng-model="options.andWrapper" ng-change="calculateOutput()" maxlength="3" class="form-control" placeholder="{{options.placeholder.andWrapper}}" id="bddTickets_andWrapper"> </div> </div> <h3>BDD tickets description <div class="btn-group pull-right"> <a class="btn btn-default btn-sm pull-right" ng-click="reset()">Clear form</a> </div> </h3> <div class="form-group"> <label for="bddTickets_header">Header</label> <input type="text" ng-model="options.header" ng-change="calculateOutput()" class="form-control" id="bddTickets_header"> </div> <label>Steps</label> <div ng-repeat="(index, fieldType) in options.fieldTypes"> <div class="row form-group" ng-repeat="givenField in options[fieldType].fields"> <div class="col-md-11"> <div class="input-group"> <div class="input-group-addon" ng-if="!$first">and </div> <div class="input-group-addon" ng-if="$first">{{ options[fieldType].readableName }} </div> <input type="text" ng-model="givenField.value" ng-blur="updateFields(fieldType)" class="form-control input-sm" placeholder="{{options.fieldTypesPlaceholders[index]}}" id="{{givenField.label}}"> </div> </div> <div class="col-md-1 text-right"> <a class="btn btn-danger btn-sm" ng-click="removeField(fieldType, givenField.label)">X</a> </div> </div> <div class="row form-group col-md-12"> <input class="btn btn-default btn-sm" type="button" value="Add next &quot;{{options[fieldType].readableName}}&quot;" ng-click="addField(fieldType)"> </div> </div> <output-field value="output"></output-field>'),a.put("views/comment-wrapper.html",'<h2>Comments Generator</h2> <h3>Default Presets</h3> <div class="btn-group"> <a class="btn btn-default btn-sm" ng-repeat="(key, value) in presets" ng-click="loadPreset(value)"> {{value.presetName}} preset </a> </div> <h3>Basic Settings</h3> <div class="form-group"> <label for="commentWrapper_fillChar">Char to use as filler</label> <input type="text" ng-model="options.fillChar" ng-change="calculateOutput()" ng-maxlength="1" class="form-control" placeholder="{{options.placeholder.fillChar}}" id="commentWrapper_fillChar"> </div> <div class="form-group"> <label for="commentWrapper_lineLength">Line length</label> <input type="number" ng-model="options.lineLength" ng-blur="calculateOutput()" class="form-control" id="commentWrapper_lineLength"> </div> <h3> Advanced Settings <div class="btn-group pull-right"> <a class="btn btn-sm pull-right" ng-class="{true: \'btn-primary\', false: \'btn-danger\'}[!options.showAdvancedOptions]" ng-click="options.showAdvancedOptions = !options.showAdvancedOptions"> {{!options.showAdvancedOptions && \'Show\' || \'Hide\'}} advanced settings </a> </div> </h3> <div ng-show="options.showAdvancedOptions"> <div class="form-group"> <label for="commentWrapper_lineStart">Line start</label> <input type="text" ng-model="options.lineStart" ng-trim="false" ng-change="calculateOutput()" class="form-control" placeholder="{{options.placeholder.lineStart}}" id="commentWrapper_lineStart"> </div> <div class="form-group"> <label for="commentWrapper_lineEnd">Line end</label> <input type="text" ng-model="options.lineEnd" ng-trim="false" ng-change="calculateOutput()" class="form-control" placeholder="{{options.placeholder.lineEnd}}" id="commentWrapper_lineEnd"> </div> <div class="form-group"> <label for="commentWrapper_stringEscapeChar"> Char escaper</label> <input type="text" ng-model="options.stringEscapeChar" ng-change="calculateOutput()" ng-maxlength="1" class="form-control" id="commentWrapper_stringEscapeChar"> </div> <div class="form-group"> <label class="checkbox-inline"> <input type="checkbox" ng-model="options.additionalEmptySpacer" ng-change="calculateOutput()" id="commentWrapper_additionalEmptySpacer">Put additional empty space between fill and content </label> </div> <div class="form-group"> <label class="checkbox-inline"> <input type="checkbox" ng-model="options.borderAround" ng-change="calculateOutput()" id="commentWrapper_borderAround">Put "border" around comments </label> </div> <div class="form-group"> <label class="checkbox-inline"> <input type="checkbox" ng-model="options.escapeStringEscapeChars" ng-change="calculateOutput()" id="commentWrapper_escapeStringEscapeChars">Escape string starting/ending char </label> </div> <div class="form-group"> <label for="commentWrapper_varsToListSeparator">Variable separator</label> <input type="text" ng-model="options.varsToListSeparator" ng-change="calculateOutput()" ng-maxlength="1" class="form-control" id="commentWrapper_varsToListSeparator"> </div> <div class="form-group"> <label for="commentWrapper_varConcatChar">Variable concatenate char</label> <input type="text" ng-model="options.varConcatChar" ng-change="calculateOutput()" ng-maxlength="1" class="form-control" placeholder="{{options.placeholder.varConcatChar}}" id="commentWrapper_varConcatChar"> </div> <div class="form-group"> <label for="commentWrapper_varEscapePrefix">Variable wrapper code prefix</label> <input type="text" ng-model="options.varEscapePrefix" ng-change="calculateOutput()" class="form-control" placeholder="{{options.placeholder.varEscapePrefix}}" id="commentWrapper_varEscapePrefix"> </div> <div class="form-group"> <label for="commentWrapper_varNamePostfix">Variable name postfix</label> <input type="text" ng-model="options.varNamePostfix" ng-change="calculateOutput()" class="form-control" placeholder="{{options.placeholder.varNamePostfix}}" id="commentWrapper_varNamePostfix"> </div> <div class="form-group"> <label for="commentWrapper_varEscapePostfix">Variable wrapper code postfix</label> <input type="text" ng-model="options.varEscapePostfix" ng-change="calculateOutput()" class="form-control" placeholder="{{options.placeholder.varEscapePostfix}}" id="commentWrapper_varEscapePostfix"> </div> </div> <!-- advanced options --> <h3> Make comment <div class="btn-group pull-right"> <a class="btn btn-default btn-sm pull-right" ng-click="reset()">Clear form</a> </div> </h3> <div class="form-group"> <label for="commentWrapper_varsToList">Variable names to list (use <code>{{options.varsToListSeparator}}</code> as separator) </label> <input type="text" ng-model="options.varsToList" ng-change="calculateOutput()" class="form-control" placeholder="{{options.placeholder.varsToList}}" id="commentWrapper_varsToList"> </div> <div class="form-group"> <label for="commentWrapper_input">Input</label> <textarea ng-model="options.input" ng-change="calculateOutput()" id="commentWrapper_input" class="form-control" rows="10">\n    </textarea> </div> <output-field value="output"></output-field>'),a.put("views/commit-parser.html",'<h2>Commit Parser</h2> <h3>Basic Settings</h3> <div class="form-group"> <label for="commitParser_sections">Sections (use <code>{{options.sectionsSeparator}}</code> as separator) </label> <input type="text" ng-model="options.sectionsInput" ng-change="updateSections()" class="form-control" placeholder="{{options.placeholder.sections}}" id="commitParser_sections"> </div> <div class="form-group"> <label for="commitParser_listChar">Char to begin each feature</label> <input type="text" ng-model="options.listChar" ng-change="calculateOutput()" ng-maxlength="1" class="form-control" placeholder="{{options.placeholder.listChar}}" id="commitParser_listChar"> </div> <div class="form-group"> <label class="checkbox-inline"> <input type="checkbox" ng-model="options.sectionCaseInsensitive" ng-change="updateSections()" id="commitParser_sectionCaseInsensitive">Case-insensitive section names </label> </div> <h3> Parse commits <div class="btn-group pull-right"> <a class="btn btn-default btn-sm pull-right" ng-click="reset()">Clear form</a> </div> </h3> <div class="form-group"> <label for="commitParser_taskNameInput">Current task name</label> <input type="text" ng-model="options.taskNameInput" ng-change="calculateOutput()" class="form-control" id="commitParser_taskNameInput"> </div> <div class="form-group"> <label for="commitParser_input">Commit squash messages</label> <textarea ng-model="options.input" ng-change="calculateOutput()" uib-tooltip-template="\'commitParser_inputTooltip.html\'" tooltip-placement="top" id="commitParser_input" class="form-control" rows="10">\n    </textarea> </div> <output-field value="output"></output-field> <script type="text/ng-template" id="commitParser_inputTooltip.html"><div id="commitParser_inputPlaceholder" class="text-left">{{options.placeholder.input}}</div></script>'),a.put("views/contact.html",'<h2>Contact</h2> <p>...but not form. If you want to know anything more about this page, please go to <a ng-href="{{gitHubLink}}">GitHub project</a> site.</p> <p>Feel free to copy/break/blastoff site code as you want.</p>'),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),a.put("views/partials/main-menu.html",'<div class="navbar navbar-default" role="navigation"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/">JS Utils</a> </div> <div class="collapse navbar-collapse" id="js-navbar-collapse"> <ul class="nav navbar-nav"> <li><a ng-href="#/">Comments Generator</a></li> <li><a ng-href="#/commits">Commit Parser</a></li> <li><a ng-href="#/bdd">BDD helper</a></li> <li><a ng-href="#/contact">Contact</a></li> </ul> </div> </div> </div>'),a.put("views/partials/output-field.html",'<h3> Output <div class="btn-group pull-right"> <a class="btn btn-default btn-sm pull-right" ng-click="select(output_id)">Select output</a> </div> </h3> <div class="form-group"> <pre id="{{output_id}}">{{value}}</pre> </div>')}]);
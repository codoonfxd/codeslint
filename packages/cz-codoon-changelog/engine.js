var wrap = require('word-wrap');
var map = require('lodash.map');
var longest = require('longest');
var rightPad = require('right-pad');

var filter = function(array) {
  return array.filter(function(x) {
    return x;
  });
};

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = function(options) {
  var types = options.types;

  var length = longest(Object.keys(types)).length + 1;
  var choices = map(types, function(type, key) {
    return {
      name: rightPad(key + ':', length) + ' ' + type.description,
      value: key,
    };
  });

  return {
    // When a user runs `git cz`, prompter will
    // be executed. We pass you cz, which currently
    // is just an instance of inquirer.js. Using
    // this you can ask questions and get answers.
    //
    // The commit callback should be executed when
    // you're ready to send back a commit template
    // to git.
    //
    // By default, we'll de-indent your commit
    // template and will keep empty lines.
    prompter: function(cz, commit) {
      console.log(
        '\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n'
      );

      // Let's ask some questions of the user
      // so that we can populate our commit
      // template.
      //
      // See inquirer.js docs for specifics.
      // You can also opt to use another input
      // collection library if you prefer.
      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: '请选择你提交的commit类型：',
          choices: choices,
          default: options.defaultType,
        },
        {
          type: 'input',
          name: 'scope',
          message:
            '这次改变的作用域(scope)是？ (例如组件或文件名)? (点击enter跳过)\n',
          default: options.defaultScope,
        },
        {
          type: 'input',
          name: 'subject',
          message: '写一段对本次变动简短的描述:\n',
          default: options.defaultSubject,
        },
        {
          type: 'input',
          name: 'body',
          message: '写一段本次变动的长描述: (点击enter跳过)\n',
          default: options.defaultBody,
        },
        {
          type: 'confirm',
          name: 'isBreaking',
          message: '是否有重要的改动？(默认没有)',
          default: false,
        },
        {
          type: 'input',
          name: 'breaking',
          message: '请描述该重要改动:\n',
          when: function(answers) {
            return answers.isBreaking;
          },
        },
        {
          type: 'confirm',
          name: 'isIssueAffected',
          message: '有影响到issue吗？(默认没有)',
          default: false,
        },
        {
          type: 'input',
          name: 'issues',
          message: '添加issue引用 (比如 "fix #123", "re #123".):\n',
          when: function(answers) {
            return answers.isIssueAffected;
          },
          default: options.defaultIssues ? options.defaultIssues : undefined,
        },
      ]).then(function(answers) {
        var maxLineWidth = 100;

        var wrapOptions = {
          trim: true,
          newline: '\n',
          indent: '',
          width: maxLineWidth,
        };

        // parentheses are only needed when a scope is present
        var scope = answers.scope.trim();
        scope = scope ? '(' + answers.scope.trim() + ')' : '';

        // Hard limit this line
        var head = (answers.type + scope + ': ' + answers.subject.trim()).slice(
          0,
          maxLineWidth
        );

        // Wrap these lines at 100 characters
        var body = wrap(answers.body, wrapOptions);

        // Apply breaking change prefix, removing it if already present
        var breaking = answers.breaking ? answers.breaking.trim() : '';
        breaking = breaking
          ? '重要改动: ' + breaking.replace(/^重要改动: /, '')
          : '';
        breaking = wrap(breaking, wrapOptions);

        var issues = answers.issues ? wrap(answers.issues, wrapOptions) : '';

        var footer = filter([breaking, issues]).join('\n\n');

        commit(head + '\n\n' + body + '\n\n' + footer);
      });
    },
  };
};

'use strict';

const compareFunc = require(`compare-func`);
const Q = require(`q`);
const readFile = Q.denodeify(require(`fs`).readFile);
const resolve = require(`path`).resolve;

module.exports = Q.all([
  readFile(resolve(__dirname, `./templates/template.hbs`), `utf-8`),
  readFile(resolve(__dirname, `./templates/header.hbs`), `utf-8`),
  readFile(resolve(__dirname, `./templates/commit.hbs`), `utf-8`),
  readFile(resolve(__dirname, `./templates/footer.hbs`), `utf-8`),
]).spread((template, header, commit, footer) => {
  const writerOpts = getWriterOpts();

  writerOpts.mainTemplate = template;
  writerOpts.headerPartial = header;
  writerOpts.commitPartial = commit;
  writerOpts.footerPartial = footer;

  return writerOpts;
});

function getWriterOpts() {
  return {
    transform: (commit, context) => {
      let discard = true;
      const issues = [];

      commit.notes.forEach(note => {
        note.title = `BREAKING CHANGES`;
        discard = false;
      });

      // 适配gitlab的commit格式
      context.commit = 'commit';

      if (commit.type === 'feat') {
        commit.type = '🎊 新增功能';
      } else if (commit.type === 'fix') {
        commit.type = '🐛 bug修复';
      } else if (commit.type === 'perf') {
        commit.type = '🚀 性能提升';
      } else if (commit.type === 'revert') {
        commit.type = '✂️ git回滚';
      } else if (discard) {
        return;
      } else if (commit.type === 'docs') {
        commit.type = '📄 文档更新';
      } else if (commit.type === 'style') {
        commit.type = '✨ 代码格式改动';
      } else if (commit.type === 'refactor') {
        commit.type = '✈️ 代码重构';
      } else if (commit.type === 'test') {
        commit.type = '🛠 测试相关';
      } else if (commit.type === 'chore') {
        commit.type = '⚙️ 构建或工具变动';
      }

      if (commit.scope === '*') {
        commit.scope = '😃 其他变更';
      }

      if (typeof commit.hash === `string`) {
        commit.shortHash = commit.hash.substring(0, 7);
      }

      if (typeof commit.subject === `string`) {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl;
        if (url) {
          url = `${url}/issues/`;
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue);
            return `[#${issue}](${url}${issue})`;
          });
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(
            /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
            (_, username) => {
              if (username.includes('/')) {
                return `@${username}`;
              }

              return `[@${username}](${context.host}/${username})`;
            }
          );
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true;
        }

        return false;
      });

      return commit;
    },
    groupBy: `type`,
    commitGroupsSort: `title`,
    commitsSort: [`scope`, `subject`],
    noteGroupsSort: `title`,
    notesSort: compareFunc,
  };
}

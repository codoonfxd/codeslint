# `commitlint-config`

> 根据公司项目定制化的 git commit message 规范。

需要注意的是，该配置基于`angular`的规范，并稍稍做了一些改动。如果对这方面还不够了解，可以参考阮一峰的[这篇文章](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)。

## 安装与配置

该配置必须配合[commitlint](https://github.com/marionebl/commitlint)使用，具体细节请参考其官方文档。

### (1) 安装

需要在项目中安装`husky`和`commitlint`。

```bash
yarn add -D @codoonfxd/commitlint-config @commitlint/cli husky
```

### (2) 配置

在项目中的`package.json`中添加以下内容。

```json
/* package.json */
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "commitlint": {
    "extends": ["@codoonfxd/commitlint-config"]
  }
}
```

## 规则简介

该配置项目包含以下配置，所有的配置列表请查看[这里](https://github.com/marionebl/commitlint/blob/master/docs/reference-rules.md)。

#### header-max-length

- 条件: `header`的最大长度不能超过 72

#### body-leading-blank

- 条件: `body`要以空行开始，即`\n`

#### footer-leading-blank

- 条件: `footer`要以空行开始，即`\n`

#### scope-case

- 条件: 允许的`scope`格式，支持以下三种。

```
// 小写形式
lowercase
// 驼峰形式
camelCase
// 蛇形
snake_case
```

#### scope-empty

- 条件: `scope`可以为空，但是会警报。

#### subject-empty

- 条件: `subject`不可为空。

#### type-case

- 条件: `type`必须是小写的格式。

#### type-empty

- 条件: `type`不可以为空。

#### type-enum

- 条件: type 的类型只能是下表中的一个。

```
build
chore
ci
docs
feat
fix
pack
perf
refactor
revert
style
test
```

> **温馨提示**：可以直接使用[`cz-codoon-changelog`](https://github.com/codoonfxd/codeslint/tree/master/packages/cz-codoon-changelog)进行 commit 提交。

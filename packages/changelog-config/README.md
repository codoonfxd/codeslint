# @codoonfxd/changelog-config

> 该库用于配合标准的 commit message 生成基于 tag 的版本变更日志的配置。在使用之前请确保已经安装了[@codoonfxd/commitlint-config](https://github.com/codoonfxd/codeslint/blob/master/packages/commitlint-config/README.md)，并且提交的 commit 都是标准化的。

## 🔩 安装

```bash
# npm
npm install -D @codoonfxd/changelog-config conventional-changelog-cli
# yarn
yarn add -D @codoonfxd/changelog-config conventional-changelog-cli
```

> `conventional-changelog-cli`是生成 changelog 的命令行工具。

## 🛠 配置

推荐的方式是通过 npm scripts 添加对应的指令。

> 此配置库依赖于`conventional-changelog-cli`，具体操作请查看其[文档](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)。

### 1. 添加生成 changelog 命令

> 默认的 Changelog 生成目录为根目录下的`CHANGELOG.md`文件，如果需要改变此文件目录或文件名，请自行更改下面命令中`-i`后面的参数`-i CHANGELOG.md`。

```json
{
  "scripts": {
    "gen-changelog": "conventional-changelog -n ./node_modules/@codoonfxd/changelog-config/index.js -i CHANGELOG.md -s -r 0"
  }
}
```

### 2. 添加 Git 自动提交命令

> 该命令将会自动提交 Changlog 的 commit，并自动 push 到远程，如果不需要可以自行删除部分命令。

```json
{
  "scripts": {
    "changelog": "npm run gen-changelog && git add . && git commit -m 'docs(changelog): update CHANGELOG.md.' && git push"
  }
}
```

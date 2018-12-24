# `commitlint-config`

> 根据公司项目定制化的 git commit message 规范。

## 安装与使用

该配置必须配合[commitlint](https://github.com/marionebl/commitlint)使用，具体使用请参考其官方文档，这里只介绍如果添加配置。

### 安装

```bash
yarn add -D @codoonfxd/commitlint-config
```

### 在项目中配置

> 请确保项目已经安装了`commitlint`。

在项目中的`package.json`中添加以下内容。

```json
/* package.json */
{
  "commitlint": {
    "extends": ["@codoonfxd/commitlint-config"]
  }
}
```

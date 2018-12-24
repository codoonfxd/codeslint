# `@codoonfxd/cz-codoon-changelog`

适用于`commitizen`的，提交`git commit`的适配器。

## 如何使用

### 安装

```bash
# 使用 npm
npm install --save-dev @codoonfxd/cz-codoon-changelog

# 使用 yarn
yarn add -D @codoonfxd/cz-codoon-changelog
```

安装完成后，在`package.json`中添加以下配置：

```json
{
  "config": {
    "commitizen": {
      "path": "node_modules/@codoonfxd/cz-codoon-changelog"
    }
  }
}
```

## 安装`commitizen`

安装完配置之后，就需要安装`commitizen`，安装类型分为以下两类：

### (1) 全局安装

```
npm install -g commitizen
```

运行`git add .`之后，使用`git cz`即可进行`commit`提交。

### (2) 本地安装

```
npm install --save-dev commitizen
```

安装完成之后，在`package.json`中添加以下`scripts`：

```json
{
  "scripts": {
    "commit": "git-cz"
  }
}
```

运行`git add .`之后，使用`npm run commit`既可进行`commit`提交。

如果不想每次都使用`git add .`可以将`scripts`中的`commit`命令改为：`git add . && git-cz`。

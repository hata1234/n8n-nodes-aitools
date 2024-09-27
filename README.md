![横幅图像](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-chromadb

该仓库包含示例节点，帮助您开始构建自己的自定义集成，适用于 [n8n](n8n.io)。它包括节点检查器和其他依赖项。

要使您的自定义节点对社区可用，您必须将其创建为 npm 包，并 [提交到 npm 注册表](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)。

## 先决条件

您需要在开发机器上安装以下内容：

* [git](https://git-scm.com/downloads)
* Node.js 和 pnpm。最低版本 Node 18。您可以在 [这里](https://github.com/nvm-sh/nvm) 找到有关如何使用 nvm（Node 版本管理器）在 Linux、Mac 和 WSL 上安装这两者的说明。对于 Windows 用户，请参考微软的指南 [在 Windows 上安装 NodeJS](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)。
* 使用以下命令安装 n8n：
  ```
  pnpm install n8n -g
  ```
* 推荐：按照 n8n 的指南 [设置您的开发环境](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/)。

## 使用此启动器

以下是使用启动器的基本步骤。有关创建和发布节点的详细指导，请参阅 [文档](https://docs.n8n.io/integrations/creating-nodes/)。

1. 从此模板仓库 [生成一个新仓库](https://github.com/n8n-io/n8n-nodes-starter/generate)。
2. 克隆您的新仓库：
   ```
   git clone https://github.com/<your organization>/<your-repo-name>.git
   ```
3. 运行 `pnpm i` 安装依赖项。
4. 在编辑器中打开项目。
5. 浏览 `/nodes` 和 `/credentials` 中的示例。修改示例，或用您自己的节点替换它们。
6. 更新 `package.json` 以匹配您的详细信息。
7. 运行 `pnpm lint` 检查错误，或运行 `pnpm lintfix` 自动修复错误（如果可能）。
8. 在本地测试您的节点。有关指导，请参阅 [在本地运行您的节点](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/)。
9. 用您节点的文档替换此 README。使用 [README_TEMPLATE](README_TEMPLATE.md) 开始。
10. 更新 LICENSE 文件以使用您的详细信息。
11. [发布](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)您的包到 npm。

## 更多信息

请参阅我们关于创建节点的 [文档](https://docs.n8n.io/integrations/creating-nodes/) 以获取有关构建自己节点的详细信息。

## 许可证

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)

# PiWork-Plugin-Docs

PiWork 插件：插件开发文档面板。插件 id `com.pi.devdocs`。

它本身是一个最小的纯 UI 插件：`manifest.json` + 一张静态网页，没有后端、没有构建步骤。正文覆盖从零做出一个插件、到发布上架的完整流程。

通过 [PiWork-Registry](https://github.com/PiWorkAgent/PiWork-Registry) 发布到 PiWork 插件中心。

## 文档来源（单一事实源）

正文是本仓库的 `docs/plugin-dev-guide.md`，由脚本同步进面板：

```bash
npm install
npm run sync:docs    # docs/ → ui/docs/，并 vendor marked 到 ui/lib/
```

**不要直接改 `ui/docs/` 下的文件** — 下一次同步会覆盖。

## 发布

1. `npm run sync:docs`（如果改了文档）
2. 改 `manifest.json` 的 `version`
3. 提交并推送 tag `v<version>`（或 Actions → Release → Run workflow）

Release 资产：`com.pi.devdocs-<version>.zip` + `index.json`。

## 目录

| 路径 | 说明 |
| --- | --- |
| `manifest.json` | 插件清单 |
| `docs/plugin-dev-guide.md` | 文档源文件 |
| `ui/` | 面板页面（`ui/docs/`、`ui/lib/` 是同步产物） |
| `scripts/sync-devdocs.mjs` | 文档同步 |
| `scripts/release.mjs` | 打包 + 生成单条目索引 |

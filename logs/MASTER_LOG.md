# Sleep Tracker Web - FTWNOW Full Log

## Project

- Name: `sleep-tracker-web`
- Start date: 2026-03-01
- Workflow: FTWNOW (需求对齐 -> SPEC -> 设计与项目管理 -> TDD -> E2E -> 部署 -> 迭代)

## Phase Timeline

- [ ] Phase 1: 需求对齐
- [ ] Phase 2: SPEC (BMAD)
- [ ] Phase 3: 设计与项目管理（Figma/Linear/GitHub/Notion）
- [ ] Phase 4: TDD 并行开发
- [ ] Phase 5: E2E 审计修复
- [ ] Phase 6: 部署发布（Vercel + Supabase）
- [ ] Phase 7: 下一轮迭代输入

## Ongoing Notes

- 所有阶段输出与关键证据将记录在本文件，并保持可追溯。

## Phase 3 Evidence (MCP)

- Figma flow: https://www.figma.com/online-whiteboard/create-diagram/3f411c49-5872-4d31-8c76-ce4c0a9345e2?utm_source=other&utm_content=edit_in_figjam&oai_id=&request_id=826872b3-41ca-44f7-9c8d-b78dfc6583a9
- Linear project: https://linear.app/codexj/project/sleep-tracker-web-b7b62c4e6b39
- Linear issues:
  - COD-5: https://linear.app/codexj/issue/COD-5/mvp-build-sleep-record-crud-ui
  - COD-6: https://linear.app/codexj/issue/COD-6/mvp-implement-sleep-stats-calculation
  - COD-7: https://linear.app/codexj/issue/COD-7/mvp-e2e-smoke-and-release-checklist
- Notion delivery log: https://www.notion.so/315db17e18d48179938ee2c12966a6d7
- GitHub repo: https://github.com/doumr32-bit/sleep-tracker-web
- Supabase project: ldtfiqdgxcafecjgjrxm (table: public.sleep_records)


## Phase 4 - TDD 开发日志

### Red

- 新增测试：`tests/domain.test.js`, `tests/storage.test.js`
- 执行：`npm test`
- 结果：失败（模块不存在）

### Green

- 实现：`src/domain/sleep.js`, `src/storage/repository.js`, `src/app.js`, `src/main.js`, `index.html`, `src/styles.css`
- 执行：`npm test`
- 结果：通过（6/6）

## Phase 5 - E2E 审计

- 启动本地服务：`python3 -m http.server 4173`
- Playwright 路径：打开页面 -> 新增记录 -> 检查统计 -> 删除记录
- 结果：通过
- 截图：`logs/sleep-tracker-e2e.png`

## Phase 6 - 部署发布

- Supabase migration: `create_sleep_records_table` (project `ldtfiqdgxcafecjgjrxm`)
- Vercel deploy: `vercel deploy --yes`
- Production URL: https://sleep-tracker-web.vercel.app
- Health check: `curl -I` -> HTTP 200

## Phase 7 - 迭代输入

- Notion 主日志： https://www.notion.so/315db17e18d48179938ee2c12966a6d7
- 下一轮目标：云端同步、趋势图、提醒系统

## Phase Timeline (Updated)

- [x] Phase 1: 需求对齐
- [x] Phase 2: SPEC (BMAD)
- [x] Phase 3: 设计与项目管理（Figma/Linear/GitHub/Notion）
- [x] Phase 4: TDD 并行开发
- [x] Phase 5: E2E 审计修复
- [x] Phase 6: 部署发布（Vercel + Supabase）
- [x] Phase 7: 下一轮迭代输入

## GitHub 推送记录

- Remote: `https://github.com/doumr32-bit/sleep-tracker-web.git`
- Branch: `main`
- Latest commit: `1dc21a3`
- 状态：已推送完成，可用于下一轮迭代。

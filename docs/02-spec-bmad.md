# Phase 2 - SPEC (BMAD)

## PRD 摘要

## User Stories

- 作为用户，我可以新增一条睡眠记录，以便追踪每日睡眠情况。
- 作为用户，我可以编辑或删除已有记录，以保证数据准确。
- 作为用户，我可以看到睡眠统计，以评估近期睡眠质量。

## 验收标准

- 新增记录后，列表立刻出现该记录。
- 删除记录后，列表和统计同步更新。
- 睡眠时长计算正确（跨午夜也正确）。

## Technical Spec

## Frontend

- `index.html` + 原生 ES Module
- `src/domain.js`: 记录校验、时长与统计计算
- `src/storage.js`: 本地持久化读写
- `src/app.js`: UI 绑定、表单处理、渲染列表和统计

## Data Model

```text
SleepRecord {
  id: string
  date: YYYY-MM-DD
  bedtime: HH:MM
  wakeTime: HH:MM
  quality: 1..5
  notes: string
  durationMinutes: number
}
```

## 测试策略

- 单元测试：
  - 时长计算（同日/跨日）
  - 统计聚合
  - 记录校验
- 集成测试：
  - 本地存储 CRUD
- E2E：
  - 打开页面 -> 新增记录 -> 查看统计更新

## 风险与缓解

- 风险：时间计算跨午夜错误
  - 缓解：TDD 覆盖跨日用例
- 风险：浏览器存储异常
  - 缓解：容错和空值回退

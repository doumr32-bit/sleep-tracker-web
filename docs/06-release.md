# Phase 6 - 部署发布

## Supabase

- Project: `ldtfiqdgxcafecjgjrxm`
- Migration: `create_sleep_records_table`
- Table: `public.sleep_records`

## Vercel

- 生产地址: https://sleep-tracker-web.vercel.app
- Vercel 项目: `sleep-tracker-web`

## 健康检查

- `curl -I https://sleep-tracker-web.vercel.app` -> HTTP 200

## 回滚策略

- 通过 `vercel --prod` 部署上一稳定版本。
- Supabase 通过迁移版本回滚（下一轮补充脚本化回滚）。

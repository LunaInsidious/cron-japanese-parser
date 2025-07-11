# Cron Japanese Parser

Cron式を日本語の説明に変換するTypeScriptライブラリです。

## 機能

このライブラリは、標準的なCron式（5フィールド形式）を読みやすい日本語に変換します。

### 対応するCron式の形式

```
分 時 日 月 曜日
```

- **分**: 0-59
- **時**: 0-23
- **日**: 1-31
- **月**: 1-12
- **曜日**: 0-7 (0と7は日曜日)

### 対応する記法

- `*` - すべての値
- `数値` - 特定の値
- `数値1-数値2` - 範囲指定
- `数値1,数値2,数値3` - 複数値指定
- `*/数値` - 間隔指定

## インストール

```bash
npm install
```

## 使用方法

### コマンドラインツールとして

```bash
npm start "0 9 * * 1-5"
# 出力: 平日の9時0分

npm start "*/15 * * * *"
# 出力: 15分おきに毎時毎日毎月

npm start "0 12 1 * *"
# 出力: 1日の12時0分
```

## 変換例

| Cron式 | 日本語出力 |
|--------|------------|
| `0 9 * * 1-5` | 平日の9時0分 |
| `*/15 * * * *` | 15分おきに毎時毎日毎月 |
| `0 12 1 * *` | 1日の12時0分 |
| `30 14 * * 0` | 日曜日の14時30分 |
| `0 0 1 1 *` | 1月1日の0時0分 |
| `0 */6 * * *` | 6時間おき毎日毎月 |
| `0 9,12,15 * * *` | 9時、12時、15時0分 |

## 開発

### テスト実行

```bash
npm test
```

### テストUIの起動

```bash
npm run test:ui
```

### ビルド

```bash
npm run build
```

## API リファレンス

### `parseCron(cronExpression: string): string`

Cron式全体を日本語に変換します。

**パラメータ:**
- `cronExpression`: 5フィールドのCron式文字列

**戻り値:**
- 日本語での説明文字列

**例外:**
- `Error`: 無効なCron式の場合

### 個別フィールドパーサー

- `parseMinute(minute: string): string` - 分フィールドを解析
- `parseHour(hour: string): string` - 時フィールドを解析  
- `parseDay(day: string): string` - 日フィールドを解析
- `parseMonth(month: string): string` - 月フィールドを解析
- `parseWeekday(weekday: string): string` - 曜日フィールドを解析

## ライセンス

MIT

## 技術スタック

- TypeScript
- Vitest (テスト)
- Biome (リンター・フォーマッター)

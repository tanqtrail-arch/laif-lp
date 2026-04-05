# CLAUDE.md - LaiF 開発ガイド

## 1. プロジェクト概要

### サービス名
**LaiF（ライフ）** — AIで、愛のある時間を取り戻す

### ミッション
LINE対応・営業・予約導線をAIで自動化し「時間」と「売上」を同時に生み出す。
**LaiFはツールではない。売上導線を自動化する仕組み。**

### コアメッセージ
あなたは、目の前のお客さまだけに集中してください。
それ以外は、LaiF が引き受けます。

### サービス哲学
オーナーの仕事は本来「認知」と「対面」の2つだけ。
- 認知活動 — 知ってもらう（SNS・広告・紹介）
- 対面サービス — 目の前のお客さまに集中する
- 間のすべて — LINE返信・ヒアリング・提案・予約・カルテ・フォロー → LaiFが自動化

### ターゲット
- 個人事業主の女性（特にママ）
- 教室・美容・カウンセラー・コーチ
- LINEで顧客対応している人

### 開発優先順位
1. AIチャット（LINE上のAI接客・営業）
2. 予約導線（予約カレンダーURL送信）
3. 顧客AIカルテ（会話→構造化→蓄積）
4. 経営ダッシュボード（売上・予約・顧客分析）

## 2. 技術スタック

### フロントエンド（client/）
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Router v6（またはwouter）
- Zustand + React Query
- Lucide React

### バックエンド（server/）
- Node.js 20+ / Express + TypeScript
- Supabase JS Client
- Anthropic Claude API（claude-sonnet-4-20250514）
- LINE Messaging API（Webhook）
- Zod

### インフラ
- Supabase（PostgreSQL + Auth + Storage）
- Vercel（client）+ Railway or Render（server）

## 3. DB設計（Supabase / PostgreSQL）

### テーブル一覧
1. owners — オーナー（サービス利用者）
2. customers — エンド顧客（LINEユーザー）
3. customer_needs — AIカルテ（ヒアリング結果）
4. chat_messages — 会話ログ
5. bookings — 予約
6. action_logs — 行動履歴
7. ai_configs — AIチャット設定

### owners
- id, auth_id, name, email, business_name, business_type
- line_channel_id, line_channel_secret, line_access_token
- booking_url, booking_system, plan
- created_at, updated_at

### customers
- id, owner_id, line_user_id, display_name, name, avatar_url
- interest_level: hot/warm/cold/unknown
- tags, memo, first_contact_at, last_contact_at
- UNIQUE(owner_id, line_user_id)

### customer_needs
- id, customer_id, category(problem/need/goal/situation)
- content, confidence(0.0-1.0), source_message_id

### chat_messages
- id, customer_id, owner_id, role(user/assistant/system)
- content, message_type, line_message_id
- ai_action(greeting/hearing/proposal/closing/booking_link)
- metadata(JSONB)

### bookings
- id, customer_id, owner_id
- status(pending/confirmed/completed/cancelled/no_show)
- booking_url, scheduled_at, menu, price, notes

### action_logs
- id, customer_id, owner_id
- action_type(link_click/booking_page_visit/booking_complete/follow/unfollow)
- metadata(JSONB)

### ai_configs
- id, owner_id, system_prompt, greeting_message
- business_description, menu_items(JSONB)
- tone(friendly/professional/casual)
- closing_style(soft/direct)
- auto_booking_link, follow_up_hours

### RLS
全テーブルにRLS有効。owner_idベースでauth.uid()と照合。

## 4. API設計

### ベースURL: /api/v1

### LINE Webhook
- POST /api/v1/webhook/line

### 顧客
- GET /api/v1/customers（一覧）
- GET /api/v1/customers/:id（詳細+カルテ）
- PATCH /api/v1/customers/:id（更新）
- GET /api/v1/customers/:id/messages（会話ログ）
- GET /api/v1/customers/:id/needs（ヒアリング結果）

### 予約
- GET /api/v1/bookings
- PATCH /api/v1/bookings/:id

### ダッシュボード
- GET /api/v1/dashboard/summary
- GET /api/v1/dashboard/revenue
- GET /api/v1/dashboard/interest

### AI設定
- GET /api/v1/ai-config
- PUT /api/v1/ai-config

### 認証
- POST /api/v1/auth/signup
- POST /api/v1/auth/login
- GET /api/v1/auth/me

## 5. デザインルール

### カラーパレット
- mint: #7ECEC1 / light: #B5E4DC / pale: #E4F5F1
- pink: #D4A0A0 / light: #EACECE / pale: #F7ECEC
- beige: #F5EDE3 / dark: #E8DDD0
- white: #FEFDFB
- text: #4A4543 / soft: #6B6563 / light: #8A8280

### UIルール
- 角丸: rounded-2xl（カード）/ rounded-full（ボタン）
- 余白多め、柔らかい影（shadow-sm/md）
- フォント: 見出し Zen Maru Gothic / 本文 Noto Sans JP
- パステルグラデーション背景。黒ベース禁止

### NG
- 黒ベース、ネオン、硬いUI、押し売りコピー

### コピーガイドライン
- 効率化❌ → 少し楽になる⭕
- 爆速❌ → そっと⭕
- 自動化ツール❌ → あなたの代わりに⭕

## 6. 設計思想

### オーナーの仕事は2つだけ
Before: 認知→LINE返信→ヒアリング→提案→予約調整→カルテ→フォロー→対面（全部ひとり）
After: 認知（オーナー）→ LaiF が全自動 → 対面（オーナー）

### AIチャットは「売るAI」
ただ返答する❌ → 予約したい状態をつくる⭕

### AIの応答フェーズ
1. 挨拶（greeting）
2. ヒアリング（hearing）
3. 提案（proposal）
4. クロージング（closing）
5. 予約リンク（booking_link）

### コピー体系
- タグライン: AIで、愛のある時間を取り戻す
- コアメッセージ: あなたは、目の前のお客さまだけに集中してください。
- サブコピー: LINE返信も、予約も、営業も。ぜんぶLaiFが引き受けます。

### 最終ビジョン
忙しい毎日を、少しやさしくするAI

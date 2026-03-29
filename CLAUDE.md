# CLAUDE.md - LaiF 開発ガイド

## 1. プロジェクト概要

### サービス名
**LaiF（ライフ）** — AIで、愛のある時間を取り戻す

### ミッション
LINE対応・営業・予約導線をAIで自動化し「時間」と「売上」を同時に生み出す。
**LaiFはツールではない。売上導線を自動化する仕組み。**

### ターゲット
- 個人事業主の女性（特にママ）
- 教室・美容・カウンセラー・コーチ
- LINEで顧客対応している人

### 全体導線
```
LP → AIチャット相談（LINE） → 予約ページ（外部リンク） → マイページ（顧客カルテ） → リピート・紹介
```

### 開発優先順位
1. AIチャット（LINE上のAI接客・営業）
2. 予約導線（予約カレンダーURL送信）
3. 顧客AIカルテ（会話→構造化→蓄積）
4. 経営ダッシュボード（売上・予約・顧客分析）

---

## 2. 技術スタック

### モノレポ構成
```
laif-lp/
├── client/          # フロントエンド
├── server/          # バックエンドAPI
├── shared/          # 共有型定義・ユーティリティ
├── patches/         # パッチファイル
├── supabase/        # DB マイグレーション・シード
├── CLAUDE.md        # このファイル
└── package.json     # ワークスペースルート
```

### フロントエンド（client/）
| 項目 | 技術 |
|------|------|
| フレームワーク | React 18 + TypeScript |
| ビルドツール | Vite |
| ルーティング | React Router v6 |
| 状態管理 | Zustand（グローバル）+ React Query（サーバー状態） |
| UIライブラリ | Tailwind CSS + shadcn/ui |
| フォーム | React Hook Form + Zod |
| アイコン | Lucide React |

### バックエンド（server/）
| 項目 | 技術 |
|------|------|
| ランタイム | Node.js 20+ |
| フレームワーク | Express + TypeScript |
| ORM | Supabase JS Client（直接クエリ） |
| 認証 | Supabase Auth（オーナーログイン） |
| AI | Anthropic Claude API（claude-sonnet-4-20250514） |
| LINE | LINE Messaging API（Webhook） |
| バリデーション | Zod |

### インフラ・DB
| 項目 | 技術 |
|------|------|
| データベース | Supabase（PostgreSQL） |
| ストレージ | Supabase Storage |
| ホスティング | Vercel（client）+ Railway or Render（server） |
| 環境変数管理 | .env（gitignore済み） |

### 共有（shared/）
```
shared/
├── types/           # 共有型定義
│   ├── customer.ts
│   ├── chat.ts
│   ├── booking.ts
│   └── owner.ts
├── constants/       # 定数
│   ├── interest-levels.ts
│   └── chat-actions.ts
└── validators/      # Zodスキーマ（共有バリデーション）
    ├── customer.ts
    └── booking.ts
```

---

## 3. DB設計（Supabase / PostgreSQL）

### ER概要
```
owners ─┬─< customers ──< chat_messages
        │       │
        │       ├──< customer_needs
        │       │
        │       ├──< bookings
        │       │
        │       └──< action_logs
        │
        └─< ai_configs
```

### テーブル定義

#### `owners`（オーナー = サービス利用者）
```sql
CREATE TABLE owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT,
  business_type TEXT,  -- 'salon' | 'school' | 'coach' | 'counselor' | 'other'
  line_channel_id TEXT,
  line_channel_secret TEXT,
  line_access_token TEXT,
  booking_url TEXT,     -- Calendly等の予約URL
  booking_system TEXT,  -- 'google_calendar' | 'calendly' | 'other'
  plan TEXT DEFAULT 'light',  -- 'light' | 'standard' | 'premium'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `customers`（エンド顧客 = LINEユーザー）
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
  line_user_id TEXT NOT NULL,
  display_name TEXT,
  name TEXT,
  avatar_url TEXT,
  interest_level TEXT DEFAULT 'unknown',
    -- 'hot'（🔥今すぐ検討）| 'warm'（🙂興味あり）| 'cold'（😴様子見）| 'unknown'
  tags TEXT[] DEFAULT '{}',
  memo TEXT,
  first_contact_at TIMESTAMPTZ DEFAULT now(),
  last_contact_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(owner_id, line_user_id)
);

CREATE INDEX idx_customers_owner ON customers(owner_id);
CREATE INDEX idx_customers_interest ON customers(owner_id, interest_level);
```

#### `customer_needs`（AIカルテ：ヒアリング結果）
```sql
CREATE TABLE customer_needs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  category TEXT NOT NULL,  -- 'problem' | 'need' | 'goal' | 'situation'
  content TEXT NOT NULL,
  confidence REAL DEFAULT 0.8,  -- AIの確信度 0.0〜1.0
  source_message_id UUID,       -- 根拠となったメッセージ
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_needs_customer ON customer_needs(customer_id);
```

#### `chat_messages`（会話ログ）
```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES owners(id),
  role TEXT NOT NULL,  -- 'user' | 'assistant' | 'system'
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',  -- 'text' | 'image' | 'sticker' | 'action'
  line_message_id TEXT,
  ai_action TEXT,  -- 'greeting' | 'hearing' | 'proposal' | 'closing' | 'booking_link'
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_messages_customer ON chat_messages(customer_id, created_at);
CREATE INDEX idx_messages_owner ON chat_messages(owner_id, created_at DESC);
```

#### `bookings`（予約）
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES owners(id),
  status TEXT DEFAULT 'pending',
    -- 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
  booking_url TEXT,
  scheduled_at TIMESTAMPTZ,
  menu TEXT,
  price INTEGER,  -- 円単位
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_bookings_owner ON bookings(owner_id, status);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
```

#### `action_logs`（行動履歴）
```sql
CREATE TABLE action_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES owners(id),
  action_type TEXT NOT NULL,
    -- 'link_click' | 'booking_page_visit' | 'booking_complete'
    -- | 'message_read' | 'follow' | 'unfollow' | 'ai_proposal'
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_actions_customer ON action_logs(customer_id, created_at DESC);
```

#### `ai_configs`（AIチャット設定）
```sql
CREATE TABLE ai_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
  system_prompt TEXT NOT NULL,
  greeting_message TEXT,
  business_description TEXT,
  menu_items JSONB DEFAULT '[]',
    -- [{ name, description, price, duration }]
  tone TEXT DEFAULT 'friendly',  -- 'friendly' | 'professional' | 'casual'
  closing_style TEXT DEFAULT 'soft',  -- 'soft' | 'direct'
  auto_booking_link BOOLEAN DEFAULT true,
  follow_up_hours INTEGER DEFAULT 24,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(owner_id)
);
```

### Row Level Security (RLS)
```sql
-- すべてのテーブルにRLSを有効化
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- ...

-- オーナーは自分のデータのみアクセス可能
CREATE POLICY "owners_own_data" ON customers
  FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "owners_own_messages" ON chat_messages
  FOR ALL USING (owner_id = auth.uid());
```

---

## 4. API設計

### ベースURL
```
/api/v1
```

### 認証
- オーナー向けAPI: Supabase Auth JWT（Bearerトークン）
- LINE Webhook: LINE署名検証（x-line-signature）

### エンドポイント一覧

#### LINE Webhook
| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/api/v1/webhook/line` | LINEイベント受信（メッセージ・フォロー等） |

#### 顧客（Customers）
| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/v1/customers` | 顧客一覧（検索・フィルタ対応） |
| GET | `/api/v1/customers/:id` | 顧客詳細（カルテ含む） |
| PATCH | `/api/v1/customers/:id` | 顧客情報更新（タグ・メモ等） |
| GET | `/api/v1/customers/:id/messages` | 会話ログ取得 |
| GET | `/api/v1/customers/:id/needs` | ヒアリング結果取得 |

#### 予約（Bookings）
| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/v1/bookings` | 予約一覧 |
| PATCH | `/api/v1/bookings/:id` | 予約ステータス更新 |

#### ダッシュボード（Dashboard）
| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/v1/dashboard/summary` | サマリー（売上合計・予約数・成約率） |
| GET | `/api/v1/dashboard/revenue` | 売上推移 |
| GET | `/api/v1/dashboard/interest` | 興味レベル分布 |

#### AI設定（AI Config）
| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/v1/ai-config` | AI設定取得 |
| PUT | `/api/v1/ai-config` | AI設定更新 |

#### 認証（Auth）
| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/api/v1/auth/signup` | オーナー新規登録 |
| POST | `/api/v1/auth/login` | ログイン |
| GET | `/api/v1/auth/me` | 自分の情報取得 |

### LINE Webhook処理フロー
```
LINE Event受信
  ↓
署名検証（x-line-signature）
  ↓
イベント種別で分岐
  ├── follow → 顧客作成 + 挨拶メッセージ送信
  ├── message（text）→ AI応答生成 + 返信 + カルテ更新
  ├── message（other）→ テキスト変換 or 定型返信
  └── unfollow → action_log記録
```

### AI応答生成フロー
```
ユーザーメッセージ受信
  ↓
会話履歴取得（直近20件）
  ↓
顧客カルテ取得（needs）
  ↓
AI設定取得（system_prompt, menu_items等）
  ↓
Claude API呼び出し
  ↓
応答解析
  ├── テキスト返信 → LINE reply
  ├── ニーズ抽出 → customer_needs INSERT
  ├── 興味レベル判定 → customers UPDATE
  └── 予約誘導 → booking_url付きメッセージ
  ↓
chat_messages INSERT（user + assistant）
```

---

## 5. ディレクトリ構成（目標）

### client/
```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui ベースコンポーネント
│   │   ├── layout/       # Header, Sidebar, Layout
│   │   ├── customer/     # CustomerCard, CustomerList, Karte
│   │   ├── chat/         # ChatLog, MessageBubble
│   │   ├── booking/      # BookingList, BookingStatus
│   │   └── dashboard/    # StatCard, RevenueChart, InterestPie
│   ├── pages/
│   │   ├── Home.tsx       # LP（ランディングページ）
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Customers.tsx
│   │   ├── CustomerDetail.tsx  # カルテ詳細
│   │   ├── Bookings.tsx
│   │   ├── AiConfig.tsx
│   │   └── NotFound.tsx
│   ├── hooks/            # カスタムフック
│   ├── lib/              # API client, utils
│   ├── stores/           # Zustand stores
│   ├── styles/           # グローバルCSS
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

### server/
```
server/
├── src/
│   ├── routes/
│   │   ├── webhook.ts     # LINE Webhook
│   │   ├── customers.ts
│   │   ├── bookings.ts
│   │   ├── dashboard.ts
│   │   ├── ai-config.ts
│   │   └── auth.ts
│   ├── services/
│   │   ├── ai.ts          # Claude API連携
│   │   ├── line.ts        # LINE Messaging API
│   │   ├── karte.ts       # カルテ自動生成
│   │   └── analytics.ts   # ダッシュボード集計
│   ├── middleware/
│   │   ├── auth.ts        # Supabase JWT検証
│   │   └── line-verify.ts # LINE署名検証
│   ├── lib/
│   │   ├── supabase.ts    # Supabase client
│   │   └── claude.ts      # Anthropic client
│   ├── types/
│   └── index.ts           # Expressエントリーポイント
├── tsconfig.json
└── package.json
```

---

## 6. デザインルール

### ブランドトーン
**やさしいテック** — テクノロジーだけど、あたたかい。

### カラーパレット
```css
:root {
  /* プライマリ */
  --mint:       #7ECEC1;
  --mint-light: #B5E4DC;
  --mint-pale:  #E4F5F1;

  /* セカンダリ */
  --pink:       #D4A0A0;
  --pink-light: #EACECE;
  --pink-pale:  #F7ECEC;

  /* ニュートラル */
  --beige:      #F5EDE3;
  --beige-dark: #E8DDD0;
  --white:      #FEFDFB;

  /* テキスト */
  --text:       #4A4543;
  --text-soft:  #6B6563;
  --text-light: #8A8280;
}
```

### Tailwindカスタムカラー（tailwind.config.ts）
```ts
colors: {
  mint: { DEFAULT: '#7ECEC1', light: '#B5E4DC', pale: '#E4F5F1' },
  rose: { DEFAULT: '#D4A0A0', light: '#EACECE', pale: '#F7ECEC' },
  sand: { DEFAULT: '#F5EDE3', dark: '#E8DDD0' },
  ink:  { DEFAULT: '#4A4543', soft: '#6B6563', light: '#8A8280' },
}
```

### UIルール
- **角丸**: `rounded-2xl`（カード）/ `rounded-full`（ボタン・バッジ）
- **余白**: 多め。セクション間 `py-24`、カード内 `p-6` 以上
- **影**: `shadow-sm` or `shadow-md`。柔らかいドロップシャドウのみ
- **フォント**: 見出し `Zen Maru Gothic`、本文 `Noto Sans JP`
- **背景**: パステルグラデーション or ホワイト。黒ベース禁止

### NG（絶対に使わない）
- ❌ 黒ベース背景
- ❌ ネオン・ビビッドカラー
- ❌ 硬いUI（角張ったボーダー、細い線）
- ❌ 攻撃的・押し売り的なコピー

### コピーガイドライン
| ❌ やらない | ⭕ やる |
|------------|--------|
| 効率化 | 少し楽になる |
| 爆速 | そっと |
| 自動化ツール | あなたの代わりに |
| 業界最安 | 安心して始められる |

---

## 7. コーディング規約

### 共通
- 言語: TypeScript strict mode
- パッケージマネージャ: npm workspaces
- リンター: ESLint + Prettier
- インポート順: 外部 → 共有 → 内部 → 型
- 命名: camelCase（変数・関数）、PascalCase（コンポーネント・型）
- ファイル名: kebab-case（`customer-card.tsx`）、PascalCase（`CustomerCard.tsx`、コンポーネントのみ）

### React規約
```tsx
// ✅ 関数コンポーネント + named export
export function CustomerCard({ customer }: CustomerCardProps) {
  // ...
}

// ✅ Props型は同ファイル内で定義
type CustomerCardProps = {
  customer: Customer;
  onSelect?: (id: string) => void;
};
```

### API規約
```ts
// ✅ レスポンス統一フォーマット
type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: { code: string; message: string };
};
```

### コミットメッセージ
```
feat: 顧客カルテ一覧ページ追加
fix: LINE Webhook署名検証エラー修正
refactor: AI応答生成ロジック分離
style: ダッシュボードカードのレイアウト調整
docs: CLAUDE.md更新
```

---

## 8. 環境変数

### `.env`（サーバー）
```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# LINE Messaging API
LINE_CHANNEL_SECRET=xxxxx
LINE_CHANNEL_ACCESS_TOKEN=xxxxx

# Server
PORT=3000
NODE_ENV=development
```

---

## 9. 開発フロー

### Phase 1: LP + 基盤（現在）
- [x] リポジトリ作成
- [ ] モノレポ設定（npm workspaces）
- [ ] Vite + React + Tailwind セットアップ
- [ ] LPページ実装
- [ ] Supabase プロジェクト作成 + マイグレーション

### Phase 2: AIチャット + LINE連携
- [ ] LINE Messaging API セットアップ
- [ ] Webhook エンドポイント実装
- [ ] Claude API連携（AI応答生成）
- [ ] 会話ログ保存
- [ ] 顧客自動作成（follow イベント）

### Phase 3: 予約導線 + カルテ
- [ ] AI応答から予約リンク自動送信
- [ ] ニーズ自動抽出（Claude structured output）
- [ ] 顧客カルテ自動生成・更新
- [ ] カルテ一覧・詳細ページ

### Phase 4: ダッシュボード
- [ ] 売上サマリー
- [ ] 予約管理
- [ ] 興味レベル分布
- [ ] 成約率推移

---

## 10. 重要な設計思想

### AIチャットは「売るAI」
```
❌ ただ返答する → ⭕ 予約したい状態をつくる
```

### AIの応答フェーズ
1. **挨拶**（greeting）— やさしく迎える
2. **ヒアリング**（hearing）— 悩み・ニーズを引き出す
3. **提案**（proposal）— ぴったりのメニューを提案
4. **クロージング**（closing）— 予約への自然な誘導
5. **予約リンク**（booking_link）— カレンダーURL送信

### 最終ビジョン
```
忙しい毎日を、少しやさしくするAI
```

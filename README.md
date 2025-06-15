# 🍼 OtsumamiCollection

OtsumamiCollection は、おつまみに特化した商品を、ChatGPT を用いたレコメンドロジックと楽天商品APIのレスポンスを連携させ、React + Go でモダンに実装したフルスタックアプリです。

ブラウザ上で商品を検索するだけで、大手ECサイトの価格比較やランキング情報を瞬時に取得。現実的なWeb開発に準じた技術選定と実装力をアピールできるよう配慮した構成になっています。

---

##　構成

```
OtsumamiCollection/
├── client/               # Reactフロントエンド
│   └── Components/...    # UI部品
├── server/               # Goバックエンド
│   ├── main.go           # エントリーポイント
│   └── otsumamiSrc/
│       ├── APIClients/  # ChatGPT / 楽天APIなどを呼び出す
│       └── Utility/     # レスポンスモデルの定義
├── go.mod
├── .env.development
├── .gitignore
└── README.md
```

---

## ⚡️ 使用技術

### 🚀 Frontend

* React 18
* TypeScript
* CSS Modules

### 🛠️ Backend

* Go 1.24
* RESTful API
* OpenAI ChatGPT API
* Rakuten Ichiba API

### 🛡️ Dev Tools

* Visual Studio Code
* GitHub Actions (CI/CD, future integration planned)

---

## 📅 開発の動機

* 実際の商品情報をAPIで取得し、ChatGPTを用いてユーザーにレコメンド
* ReactとGoを組み合わせた現代的なSPA + API Server構成
* 技術適用の素早さと準算能力を聴こえるアピール用に適用

---

## 💡 使用手順

### 1. 環境変数の設定

`.env.development` に以下を設定:

```env
REACT_APP_API_BASE_URL=http://localhost:3001
ALLOWED_ORIGIN=http://localhost:3000
OPENAI_API_KEY=your-openai-key
RAKUTEN_API_KEY=your-rakuten-key
```

### 2. クライアント側 (React)

```bash
cd src/client
npm install
npm start
```

### 3. サーバー側 (Go)

```bash
cd src/server
go run main.go
```

---

## 🔍 実装API

| Endpoint       | 概要                          |
| -------------- | --------------------------- |
| `/api/Rakuten` | 楽天APIを呼び出し商品情報を取得           |
| `/api/ChatGPT` | ChatGPT APIを用いてレコメンドJSONを生成 |

---

## 📚 アピール点

* ChatGPTを用いた商品レコメンドエンジンをGoで実装
* 多様なAPI管理をコードで分離
* モジュール分割や開発環境に対応
* VSCodeでDelveデバッグ + launch.json 設定

---

## ✉️ 連絡先

作成者: [@shii3011](https://github.com/shii3011)
ご意見やIssue / PR の提出は歓迎します！

---

本プロジェクトは、SPA、API、サードパーティクルといった現代のWeb開発技術に対応し、自らの技術選定能力と実装力をワンステップで行動できることを意識して作成しています。

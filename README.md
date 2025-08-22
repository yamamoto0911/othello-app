# Othello App

モダンでかっこいいオセロ（リバーシ）ゲームアプリケーション

## 概要

このプロジェクトは、Vue.js 3 + TypeScriptで作られたモダンなオセロゲームです。美しいUIとスムーズなアニメーションが特徴の2人対戦ゲームです。

## 機能

- 🎮 8x8のオセロボード
- 👥 2人プレイヤー対戦
- ✨ 合法手のハイライト表示とアニメーション
- 📊 リアルタイムスコア表示
- 🏆 ゲーム終了判定と勝者表示
- 🎨 モダンでレスポンシブなUI
- 🔄 ゲームリセット機能

## 技術スタック

- **Frontend**: Vue.js 3 (Composition API)
- **言語**: TypeScript
- **ビルドツール**: Vite
- **スタイリング**: CSS3 (グラデーション、アニメーション)
- **コンテナ**: Docker & Docker Compose

## セットアップ

### Dockerを使用する場合（推奨）

1. リポジトリをクローン
```bash
git clone https://github.com/yamamoto0911/othello-app.git
cd othello-app
```

2. Docker Composeでアプリケーションを起動
```bash
docker-compose up -d
```

3. ブラウザで http://localhost:3000 を開く

### ローカル開発環境

1. 依存関係をインストール
```bash
npm install
```

2. 開発サーバーを起動
```bash
npm run dev
```

3. ブラウザで http://localhost:3000 を開く

## 開発用コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プレビュー
npm run preview

# 型チェック
npm run type-check

# リント
npm run lint
```

## 遊び方

1. 🖤 黒石（プレイヤー1）から開始
2. 🎯 相手の石を挟める場所（緑色のハイライト）をクリックして石を置く
3. 🔄 置ける場所がない場合は自動的にパス
4. 🏁 盤面が埋まるか、両方のプレイヤーが置けなくなったらゲーム終了
5. 🏆 石の数が多い方の勝利！

## アーキテクチャ

- `src/types/game.ts` - ゲーム関連の型定義
- `src/composables/useOthelloGame.ts` - ゲームロジック
- `src/components/GameBoard.vue` - ゲームボードコンポーネント
- `src/components/GameStatus.vue` - スコアと状態表示
- `src/App.vue` - メインアプリケーション

## ライセンス

MIT License
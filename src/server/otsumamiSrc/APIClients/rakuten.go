package APIClients

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/shii3011/OtsumamiCollection/src/server/otsumamiSrc/Utility/models" // models パッケージのパスは実際のプロジェクト構成に合わせて修正してください
)

// GetRakutenAPI は楽天APIを呼び出し、チーズおつまみランキングの情報を取得するハンドラ関数です。
// CORS対応のため、ALLOWED_ORIGIN 環境変数を使用して、許可されたオリジンを設定します。
func GetRakutenAPI(w http.ResponseWriter, r *http.Request) {
	keyword := r.URL.Query().Get("keyword")
	if keyword == "" {
		keyword = "チーズ おつまみ"
	}

	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	if allowedOrigin == "" {
		log.Fatal("⚠️ ALLOWED_ORIGIN is not set")
	}

	w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

	// CORSプリフライト対応
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	appID := os.Getenv("RAKUTEN_API_KEY")
	if appID == "" {
		http.Error(w, "Rakuten API key is not set", http.StatusInternalServerError)
		return
	}

	url := fmt.Sprintf("https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=%s&keyword=%s&format=json&hits=5",
		appID,
		url.QueryEscape(keyword),
	)

	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, "Rakuten API 呼び出しに失敗しました", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body) // ioutil→io
	if err != nil {
		http.Error(w, "レスポンス読み込み失敗", http.StatusInternalServerError)
		return
	}

	result := models.RakutenResponse{} // models パッケージのパスは実際のプロジェクト構成に合わせて修正してください
	if err := json.Unmarshal(body, &result); err != nil {
		http.Error(w, "JSON 解析エラー: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		http.Error(w, "JSON エンコードエラー: "+err.Error(), http.StatusInternalServerError)
	}

	log.Println("Rakuten API 呼び出し成功:", keyword)
}

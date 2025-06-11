package APIClients

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"otsumami-server/otsumamiSrc/Utility/models" // ✅ 正解
)

func GetRakutenAPI(w http.ResponseWriter, r *http.Request) {
	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	if allowedOrigin == "" {
		log.Fatal("⚠️ ALLOWED_ORIGIN is not set")
	}

	w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

	appID := os.Getenv("RAKUTEN_API_KEY")
	if appID == "" {
		http.Error(w, "Rakuten API key is not set", http.StatusInternalServerError)
		return
	}

	url := fmt.Sprintf("https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=%s&keyword=チーズ+おつまみ+ランキング&format=json&hits=5", appID)

	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, "Rakuten API 呼び出しに失敗しました", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "レスポンス読み込み失敗", http.StatusInternalServerError)
		return
	}

	var result models.RakutenResponse
	if err := json.Unmarshal(body, &result); err != nil {
		http.Error(w, "JSON 解析エラー: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// JSON形式でレスポンス
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

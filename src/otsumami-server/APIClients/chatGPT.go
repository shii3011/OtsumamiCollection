package APIClients

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"otsumami-server/Utility/models" // ✅ 正解
)

func GetChatGPTAPI(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

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

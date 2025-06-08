package APIClients

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

func GetChatGPTAPI(w http.ResponseWriter, r *http.Request) {
	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	if allowedOrigin == "" {
		http.Error(w, "ALLOWED_ORIGIN is not set", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

	response, err := callChatGPT()
	if err != nil {
		http.Error(w, "ChatGPT API 呼び出しに失敗しました: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func callChatGPT() (string, error) {
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		return "", fmt.Errorf("OPENAI_API_KEY is not set")
	}

	// プロンプト（JSON構造をChatGPTに伝える）
	prompt := `
あなたは日本のグルメ専門家です。
チーズのおつまみのおすすめ商品を5つ、以下のJSON形式で生成し、おすすめ順にランキング形式で返してください。
すべての商品に実在する商品名・URL・画像URL・価格・店舗名を含めてください。

出力形式は次のJSON構造に正確に従ってください：
{
  "Items": [
    {
      "Item": {
        "itemName": "string",
        "itemUrl": "string",
        "mediumImageUrls": [{"imageUrl": "string"}],
        "shopName": "string",
        "itemPrice": 100
      }
    }
  ]
}

出力は**JSONのみ**、解説や補足は不要です。
`

	// JSON形式でChatGPT APIへ送る
	reqBody := fmt.Sprintf(`{
		"model": "gpt-3.5-turbo",
		"messages": [
			{"role": "user", "content": %q}
		]
	}`, prompt)

	req, err := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", bytes.NewBuffer([]byte(reqBody)))
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}

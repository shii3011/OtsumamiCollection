package main

import (
	"log"
	"net/http"
	"os"

	"otsumami-server/APIClients"
	// "otsumami-server/DBClients" // 必要になったらコメント解除
)

func main() {
	// Render 用ポート番号を取得（なければローカル用 3001）
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API is alive"))
	})

	http.HandleFunc("/api/Rakuten", APIClients.GetRakutenAPI)
	http.HandleFunc("/api/ChatGPT", APIClients.GetChatGPTAPI)
	// http.HandleFunc("/api/Otsumamis", DBClients.GetOtsumamisHandler)

	log.Println("🌐 Starting server on port " + port + "...")
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatalf("💥 ListenAndServe failed: %v", err)
	}
}

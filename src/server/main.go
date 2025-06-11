package main

import (
	"log"
	"net/http"
	"os"
	"otsumami-server/otsumamiSrc/APIClients"

	"github.com/joho/godotenv"
)

func main() {
	// Render 用ポート番号を取得（なければローカル用 3001）
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	// .env.development を明示的に読み込む
	errEnv := godotenv.Load("../../.env")
	if errEnv != nil {
		log.Fatal("Error loading .env file")
	}

	errEnvDev := godotenv.Load("../../.env.development")
	if errEnvDev != nil {
		log.Fatal("Error loading .env.development file")
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API is alive"))
	})

	http.HandleFunc("/api/Rakuten", APIClients.GetRakutenAPI)
	http.HandleFunc("/api/ChatGPT", APIClients.GetChatGPTAPI)

	log.Println("🌐 Starting server on port " + port + "...")
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatalf("💥 ListenAndServe failed: %v", err)
	}
}

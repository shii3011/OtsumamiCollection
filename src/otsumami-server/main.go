package main

import (
	"log"
	"net/http"
	"otsumami-server/APIClients" // ✅ 正解
	// ✅ 正解
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API is alive"))
	})

	// http.HandleFunc("/api/Otsumamis", getOtsumamisHandler)
	http.HandleFunc("/api/Rakuten", APIClients.GetRakutenAPI)
	http.HandleFunc("/api/ChatGPT", APIClients.GetChatGPTAPI)
	// http.HandleFunc("/api/Otsumamis", DBClients.GetOtsumamisHandler) // ✅ 正解

	log.Println("🌐 Starting server on :3001...")
	err := http.ListenAndServe(":3001", nil)
	if err != nil {
		log.Fatalf("💥 ListenAndServe failed: %v", err)
	}
}

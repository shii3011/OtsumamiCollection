package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API is alive"))
	})

	http.HandleFunc("/api/Otsumamis", getOtsumamisHandler)

	log.Println("🌐 Starting server on :3001...")
	err := http.ListenAndServe(":3001", nil)
	if err != nil {
		log.Fatalf("💥 ListenAndServe failed: %v", err)
	}
}

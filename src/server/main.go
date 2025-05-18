package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/Otsumamis", getOtsumamisHandler)
	log.Println("Server is running on :3001")
	log.Fatal(http.ListenAndServe(":3001", nil))
}

package DBClients

import (
	"encoding/json"
	"net/http"
	"otsumami-server/Utility/models" // ✅ 正解
)

func GetOtsumamisHandler(w http.ResponseWriter, r *http.Request) {
	// 追加 ↓↓↓
	w.Header().Set("Access-Control-Allow-Origin", "*")

	db, err := connectDB()
	if err != nil {
		http.Error(w, "Database connection error", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	rows, err := db.Query("SELECT id, shouhin_name, image_path, description, link, likes FROM otsumamis")
	if err != nil {
		http.Error(w, "Query failed", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var results []models.TOtsumami
	for rows.Next() {
		var o models.TOtsumami
		if err := rows.Scan(&o.ID, &o.ShouhinName, &o.ImagePath, &o.Description, &o.Link, &o.Likes); err != nil {
			http.Error(w, "Row scan error", http.StatusInternalServerError)
			return
		}
		results = append(results, o)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}

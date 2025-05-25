package models

type TOtsumami struct {
	ID          int    `json:"id"`
	ShouhinName string `json:"shouhinName"`
	ImagePath   string `json:"imagePath"`
	Description string `json:"description"`
	Link        string `json:"link"`
	Likes       int    `json:"likes"` // ← likesを追加
}

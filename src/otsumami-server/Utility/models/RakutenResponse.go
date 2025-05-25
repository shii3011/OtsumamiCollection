package models

type RakutenResponse struct {
	Items []struct {
		Item struct {
			ItemName string `json:"itemName"`
			ItemUrl  string `json:"itemUrl"`
			// 修正済み：mediumImageUrls は配列
			MediumImageUrls []struct {
				ImageUrl string `json:"imageUrl"`
			} `json:"mediumImageUrls"`
			ShopName  string `json:"shopName"`
			ItemPrice int    `json:"itemPrice"`
		} `json:"Item"`
	} `json:"Items"`
}

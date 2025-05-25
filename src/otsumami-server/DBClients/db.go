package DBClients

import (
	"database/sql"
	// _ "github.com/go-sql-driver/mysql"
)

func connectDB() (*sql.DB, error) {
	// ユーザー・パスワード・DB名は適宜変更してください
	return sql.Open("mysql", "root:YaSuTaKa-0717@tcp(127.0.0.1:3306)/otsumami_db")
}

package config

import (
	_ "liontravel.tech/internal/pkg/env"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/spf13/viper"
	"log"
)

var DB *gorm.DB

func NewDB() (db *gorm.DB, err error) {
	dialect := viper.GetString("database.dialect")
	user := viper.GetString("database.user")
	password := viper.GetString("database.password")
	host := viper.GetString("database.host")
	port := viper.GetString("database.port")
	dbname := viper.GetString("database.dbname")

	if DB != nil {
		return DB, nil
	}else {
		db, err := gorm.Open(dialect, user + ":" + password + "@(" + host + ":" + port + ")/" + dbname + "?charset=utf8mb4&parseTime=True&loc=Local")

		if err != nil {
			log.Printf("Connect db error %v", err)
			return nil, err
		}

		DB = db

		return DB, nil
	}

	//defer db.Close()
}
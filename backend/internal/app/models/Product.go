package models

import (
	"liontravel.tech/config"
	"log"
	"time"
)

type Product struct {
	ID        int        `json:"id"`
	No        string     `json:"no"`
	Name      string     `json:"name"`
	Qty       int        `json:"qty"`
	ListPrice *float64   `json:"list_price"`
	SalePrice float64    `json:"sale_price"`
	Brief     *string    `json:"brief"`
	Desp      *string    `json:"desp"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at"`
}

func (m *Product) FindByNo(no string) error{
	db, _ := config.NewDB()
	db.Where("no = ?", no).First(m)

	if db.Error != nil {
		log.Printf("Error: %v", db.Error)
		return db.Error
	}

	return nil
}
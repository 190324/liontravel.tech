package models

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"liontravel.tech/config"
	"log"
	"strconv"
	"time"
)

type Product struct {
	ID        int        `json:"id"`
	UserID    int        `json:"user_id"`
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

type Products []*Product

func (m *Product) BeforeCreate() (err error) {
	t := time.Now()
	year, _ := strconv.Atoi(t.Format("2006"))
	diffYear := year - 1911
	middle := fmt.Sprintf("%v%v",diffYear, t.Format("0102"))
	m.No = GenerateNo("P", middle, 7)

	return
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

func (m *Product) Save() {
	db, _ := config.NewDB()

	if m.No != "" {
		db = db.FirstOrInit(m, Product{
			No: m.No,
		})
	}

	db.Save(m)
}

func (m *Product) Find(where []Where) (*gorm.DB, interface{},  error) {
	db, _ := config.NewDB()

	query := db.Where("1=1")

	for _, item := range where {
		if item.Column == "name" {
			value := fmt.Sprintf("%%%v%%", item.Value)
			query = query.Where(item.Column + " LIKE ?", value)
		} else {
			value := item.Value
			query = query.Where(item.Column + " = ?", value)
		}
	}

	query = query.Order("id ASC")

	if db.Error != nil {
		return nil, nil, db.Error
	}

	return query, &Products{}, nil
}
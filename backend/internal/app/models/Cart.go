package models

import (
    "github.com/jinzhu/gorm"
    "liontravel.tech/config"
    "time"
)

type Cart struct {
    ID        int        `json:"id"`
    UserID    int        `json:"user_id"`
    ProductID int        `json:"product_id"`
    Next      int        `json:"next"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `json:"deleted_at"`
}

func (m *Cart) Save() {
    db, _ := config.NewDB()

    db = db.FirstOrInit(m, Cart{
        ProductID: m.ProductID,
        UserID: m.UserID,
    })

    db.Save(m)
}

func (m *Cart) Find(where []Where) (*gorm.DB, interface{},  error) {
    db, _ := config.NewDB()

    query := db.Where("1=1")

    for _, item := range where {
        value := item.Value
        query = query.Where(item.Column + " = ?", value)
    }

    query = query.Order("id ASC")

    if db.Error != nil {
        return nil, nil, db.Error
    }

    return query, &Cart{}, nil
}
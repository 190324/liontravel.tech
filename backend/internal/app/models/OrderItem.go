package models

import (
    "liontravel.tech/config"
    "time"
)

type OrderItem struct {
    ID        int        `json:"id"`
    OrderID   int        `json:"order_id"`
    ProductID int        `json:"product_id"`
    Discount  float64    `json:"discount"`
    Qty       int        `json:"qty"`
    Price     float64    `json:"price"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `json:"deleted_at"`
    Product   Product
}

type OrderItems []*OrderItem

func (m *OrderItems) FindAllByOrderID(orderID int) {

    db, _ := config.NewDB()

    db.Preload("Product").Where("order_id = ?", orderID).Find(m)

}
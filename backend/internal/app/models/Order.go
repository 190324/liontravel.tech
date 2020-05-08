package models

import (
    "go.mongodb.org/mongo-driver/x/mongo/driver/uuid"
    "liontravel.tech/config"
    "strconv"
    "time"
    "fmt"
)

type Order struct {
    ID              int        `json:"id" db:"id"`
    No              string     `json:"no"`
    UserID          int        `json:"user_id"`
    UserName        string     `json:"user_name"`
    UserPhone       string     `json:"user_phone"`
    UserAddress     string     `json:"user_address"`
    ReceiverName    string     `json:"receiver_name"`
    ReceiverPhone   string     `json:"receiver_phone"`
    ReceiverAddress string     `json:"receiver_address"`
    Discount        float64    `json:"discount"`
    Total           float64    `json:"total"`
    PaymentType     int        `json:"payment_type"`
    PaymentVendor   int     `json:"paymnet_vendor"`
    CreatedAt       time.Time  `json:"created_at"`
    UpdatedAt       time.Time  `json:"updated_at"`
    DeletedAt       *time.Time `json:"deleted_at"`
}

func (m *Order) BeforeCreate() (err error) {
    t := time.Now()
    year, _ := strconv.Atoi(t.Format("2006"))
    diffYear := year - 1911
    middle := fmt.Sprintf("%v%v",diffYear, t.Format("0102"))
    uuid, _ := uuid.New()
    subUuid := fmt.Sprintf("%x", uuid)[:5]
    m.No = GenerateNo("O", middle, 7) + subUuid

    return
}

func (m *Order) Save() {
    db, _ := config.NewDB()
    db.Save(m)
}
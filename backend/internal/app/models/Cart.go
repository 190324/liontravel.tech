package models

import (
    "fmt"
    "github.com/jinzhu/gorm"
    "go.mongodb.org/mongo-driver/x/mongo/driver/uuid"
    "liontravel.tech/config"
    "strconv"
    "time"
    "log"
)

type Cart struct {
    ID        int        `json:"id"`
    UserID    int        `json:"user_id"`
    No        string     `json:"no"`
    ProductID int        `json:"product_id"`
    Qty       int        `json:"qty"`
    Next      int        `json:"next"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `json:"deleted_at"`
}

type Carts []*Cart

type ICartsFilter struct {
    UserID int `json:"user_id"`
}

func (m *Cart) BeforeCreate() (err error) {
    t := time.Now()
    year, _ := strconv.Atoi(t.Format("2006"))
    diffYear := year - 1911
    middle := fmt.Sprintf("%v%v",diffYear, t.Format("0102"))
    uuid, _ := uuid.New()
    subUuid := fmt.Sprintf("%x", uuid)[:5]
    m.No = GenerateNo("C", middle, 7) + subUuid

    return
}

func (m *Cart) FindByNo(no string) error{
    db, _ := config.NewDB()
    db.Where("no = ?", no).First(m)

    if db.Error != nil {
        log.Printf("Error: %v", db.Error)
        return db.Error
    }

    return nil
}


func (m *Cart) FindByPIDnUID(productID int, userID int)  {
    db, _ := config.NewDB()
    db = db.FirstOrInit(m, Cart{
        ProductID: productID,
        UserID: userID,
        DeletedAt: nil,
    })
}

func (m *Cart) Save() {
    db, _ := config.NewDB()
    db.Save(m)
}

func (m *Cart) Find(where []Where) (*gorm.DB, interface{},  error) {
    db, _ := config.NewDB()

    query := db

    for _, item := range where {
       value := item.Value
       query = query.Where(item.Column + " = ?", fmt.Sprintf("%v", value))
    }

    query = query.Order("id ASC")

    if db.Error != nil {
        return nil, nil, db.Error
    }

    return query, &Carts{}, nil
}

func (m *Cart) Delete() {
    db, _ := config.NewDB()
    db.Delete(m)
}

func (m *Cart) DeleteByUserID(userID int) {
    db, _ := config.NewDB()
    db.Delete(&Cart{UserID: userID})
}
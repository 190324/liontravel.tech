package models

import (
    "liontravel.tech/config"
    "liontravel.tech/internal/pkg/encrypt"
    "log"
    "time"
)

type User struct {
    ID        int        `json:"id"`
    No        string     `json:"no"`
    Name      string     `json:"name"`
    Email     *string    `json:"email"`
    Password  *string    `json:"password,omitempty"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `json:"deleted_at"`
}

func (m *User) Save() {
    db, _ := config.NewDB()

    originPassword := m.Password

    _db := db.FirstOrInit(m, User{
        No:        m.No,
    })

    if originPassword != nil {
        hash := encrypt.Bcrypt(*originPassword)
        m.Password = &hash
    }

    _db.Save(m)
}

func (m *User) Check() {
    db, _ := config.NewDB()

    comparePassword := *m.Password

    db.FirstOrInit(m, User{
        Email:    m.Email,
    })

    isValid := false

    if m.ID > 0{
        isValid = encrypt.BcryptCheck(*m.Password, comparePassword)
    }


    log.Printf("=>%v %v %v %v", m.ID, isValid, comparePassword, *m.Password)

}
package models

import (
    "liontravel.tech/config"
    "time"
)

type OpenID struct {
    ID        int        `json:"id"`
    UserID    int        `json:"user_id"`
    AppType   string     `json:"app_type"`
    AppID     string     `json:"app_id"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `json:"deleted_at"`
}

func (m *OpenID) GetUserID() int{
    db, _ := config.NewDB()

    db.FirstOrInit(m, OpenID{
        AppType: m.AppType,
        AppID:   m.AppID,
    })

    userID := 0

    if m.ID > 0{
        userID = m.UserID
    }

    return userID
}

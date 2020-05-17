package models

import (
    "time"
)

type Category struct {
    ID        int        `json:"id"`
    No        string     `json:"no"`
    UserID    int       `json:"user_id"`
    Name      string     `json:"name"`
    Image     *string    `json:"image"`
    ParentID  int       `json:"parent_id"`
    Seq       int        `json:"seq"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `json:"deleted_at"`
}

func (m *Category) BeforeCreate() (err error) {
    m.No = GenerateNo("C", "", 4)
    return
}
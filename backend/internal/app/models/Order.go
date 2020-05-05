package models

import (
    "time"
)

type Order struct {
    ID int `json:"id" db:"id"`
    Prefix string `json:"prefix" db:"prefix"`
    Middle string `json:"middle" db:"middle"`
    Sn int `json:"sn" db:"sn"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `json:"deleted_at"`
}
package models

import "time"

type OpenID struct {
    ID        int        `json:"id"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `json:"deleted_at"`
}

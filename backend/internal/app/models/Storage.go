package models

import (
    "liontravel.tech/config"
    "time"
)

type Storage struct {
    ID          int        `json:"id"`
    TableFrom   string     `json:"table_from"`
    TableID     int        `json:"table_id"`
    ContentType *string     `json:"content_type"`
    Path        string     `json:"path"`
    Seq         int     `json:"seq"`
    CreatedAt   time.Time  `json:"created_at"`
    UpdatedAt   time.Time  `json:"updated_at"`
    DeletedAt   *time.Time `json:"deleted_at"`
}

type Storages []*Storage

func (m *Storages) FindByRelation(tableFrom string, tableID int) {
    db, _ := config.NewDB()

    db.Where("table_from = ?", tableFrom).Where("table_id = ?", tableID).Find(m)
}
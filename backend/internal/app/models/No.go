package models

import (
    "github.com/jinzhu/gorm"
    "liontravel.tech/config"
    "log"
    "fmt"
    "strconv"
    "time"
)

type No struct {
    ID        int        `json:"id"`
    Prefix    string     `json:"prefix"`
    Middle    string     `json:"middle"`
    Sn        int     `json:"sn"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `json:"deleted_at"`
}

func GenerateNo(prefix string, middle string, zeroPad int) string{
    db, _ := config.NewDB()

    var sn = 0

    db.Transaction(func(tx *gorm.DB) error {
        m := &No{}

        var count int
        query := tx.Model(&No{}).Where("prefix = ?", prefix).Where("middle = ?", middle)
        query.Count(&count)

        if count > 0 {
            query.First(m)
        }else {
            m.Sn = 0
            m.Prefix = prefix
            m.Middle = middle
            row := tx.Create(m)

            if err := row.Error; err != nil {
               log.Printf("GenerateNo create error: [%v]", err)
               return err
            }
        }

        // row lock 抓取資料
        row := tx.Raw("SELECT * FROM nos WHERE id = ? FOR UPDATE", m.ID)
        row.Scan(&m)

        if err := row.Error; err != nil {
           log.Fatalf("GenerateNo get row error: [%v]", err)
           return row.Error
        }

        sn = m.Sn + 1

        // 更新流水號 sn
        row = tx.Exec("UPDATE nos SET sn = ? WHERE id = ?", sn, m.ID)

        if err := row.Error; err != nil {
           log.Fatalf("GenerateNo update error: [%v]", err)
           return err
        }

        // return nil will commit
        return nil
    })

    // 流水號格式
    format := "%s%s%0" + strconv.Itoa(zeroPad) + "d"

    return fmt.Sprintf(format, prefix, middle, sn)
}
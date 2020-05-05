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

//func (m *No) GenerateNo(prefix string, middle string, zeroPad int) (no string){
//  db, _ := config.NewDB()
//
//  var sn int
//
//  db.Transaction(func(tx *pop.Connection) error {
//
//      // 建立查詢條件
//      query := tx.Where("prefix = ?", prefix).Where("middle = ?", middle)
//
//      // 查詢條件比數
//      count, err := query.Count(m)
//
//      if err != nil {
//          log.Fatalf("error: table.nos get count [%v]", err)
//          return err
//      }
//
//      if count > 0 {
//          // 確認有資料抓取內容
//          query.First(m)
//      }else {
//          // 無資料建立資料
//          m.Sn = 0
//          m.Prefix = prefix
//          m.Middle = middle
//          err = tx.Create(m)
//          if err != nil {
//              tx.Rollback(func(tx *pop.Connection) {})
//              log.Fatalf("error: table.nos create [%v]", err)
//              return err
//          }
//      }
//
//      // row lock 抓取資料
//      q := tx.RawQuery("SELECT * FROM nos WHERE id = ? FOR UPDATE", m.ID)
//      err = q.First(m)
//
//      if err != nil {
//          log.Fatalf("error: table.nos search for update [%v]", err)
//          return err
//      }
//
//      sn = m.Sn + 1
//
//      // 更新流水號 sn
//      err = tx.RawQuery("UPDATE nos SET sn = ? WHERE id = ?", sn, m.ID).Exec()
//
//      if err != nil {
//          tx.Rollback(func(tx *pop.Connection) {})
//          log.Fatalf("error: table.nos update [%v]", err)
//          return err
//      }
//
//      return  nil
//  })
//
//  // 流水號格式
//  format := "%s%s%0" + strconv.Itoa(zeroPad) + "d"
//
//  return fmt.Sprintf(format, prefix, middle, sn)
//}
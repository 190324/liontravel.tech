package models

import (
	"github.com/iancoleman/strcase"
	"github.com/jinzhu/gorm"
	"liontravel.tech/config"
	"math"
	"reflect"
	"time"
)

type ModelNoDeletedAt struct {
	ID        uint `gorm:"primary_key"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Where struct {
	Column string
	Value interface{}
}

type Paginator interface {
	Find(where []Where, order ...*string) (*gorm.DB, interface{}, error)
}

type PageInfo struct {
	Total int
	PerPage int
	LastPage int
	CurrentPage int
}

type PaginateSetting struct {
	Page int
	PerPage int
	Where []Where
	Order []*string
}

const (
	MaxPerPage = 25
)

// common db operation
func GetRow(model interface{}, where ...interface{}) (err error){
	db, _ := config.NewDB()
	result := db.First(model, where...)

	if err := result.Error; err != nil {
		return err
	}

	return
}

func Save(model interface{}) (err error){
	db, err := config.NewDB()

	if err != nil {
		return
	}

	result := db.Save(model)

	if err = result.Error; err != nil {
		return err
	}

	return
}

// pagination
func Pagination(model Paginator, setting PaginateSetting) (objects interface{}, pageInfo *PageInfo){
	var total int
	var query *gorm.DB

	if setting.Order != nil {
		query, objects, _ = model.Find(setting.Where, setting.Order...)
	}else {
		query, objects, _ = model.Find(setting.Where)
	}

	query.Model(model).Count(&total)

	perPage := setting.PerPage

	if perPage > MaxPerPage {
		perPage = MaxPerPage
	}

	pageInfo = &PageInfo{
		Total: total,
		PerPage: perPage,
		CurrentPage: setting.Page,
	}

	lastPage := math.Ceil( float64(pageInfo.Total) / float64(pageInfo.PerPage))
	pageInfo.LastPage = int(lastPage)

	offset := (pageInfo.CurrentPage - 1) * pageInfo.PerPage

	query.Offset(offset).Limit(setting.PerPage).Find(objects)


	return

}

func HandleWhere(w interface{}) (where []Where){

	if !reflect.ValueOf(w).IsNil() {
		s := reflect.ValueOf(w).Elem()
		typeOfT := s.Type()


		for i := 0; i < s.NumField(); i++ {
			f := s.Field(i)
			//log.Printf("hello=>%d: %s %s = %v\n", i, typeOfT.Field(i).Name, f.Type(), f.Interface())

			// 字串轉換 比如 UserID => user_id
			key := strcase.ToSnake(typeOfT.Field(i).Name)

			switch f.Type().String() {
			case "string":
				where = append(where, Where{
					Column:   key,
					Value: s.FieldByName(typeOfT.Field(i).Name),
				},
				)
			case "*string":
				if s.FieldByName(typeOfT.Field(i).Name).Elem().IsValid() {
					where = append(where, Where{
						Column: key,
						Value:  s.FieldByName(typeOfT.Field(i).Name).Elem().String(),
					},
					)
				}
			case "int":
				where = append(where, Where{
					Column:   key,
					Value: s.FieldByName(typeOfT.Field(i).Name),
				},
				)
			case "*int":
				if s.FieldByName(typeOfT.Field(i).Name).Elem().IsValid() {
					where = append(where, Where{
						Column: key,
						Value:  s.FieldByName(typeOfT.Field(i).Name).Elem().Int(),
					},
					)
				}
			default:
				where = append(where, Where{
					Column:   key,
					Value: s.FieldByName(typeOfT.Field(i).Name).Interface(),
				},
				)
			}
		}
	}

	return
}
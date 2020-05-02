package template

import (
	"errors"
	"fmt"
	"html/template"
	"log"
	"os"
	"time"
)

const (
	TmplModel = "model"
	TmplMigration = "migration"
)

type Artisan struct {}

func (a *Artisan) Create(tmpl string, args map[string]interface{}) (err error){

	switch tmpl {
	case TmplModel:
		config := make(map[string]interface{})
		config["modelName"] = args["name"]

		filename := fmt.Sprintf("%v", config["modelName"])
		err = a.skeleton("./internal/pkg/artisan/template/tmpl/model/model.tmpl", "./internal/app/models/" + filename + ".go", config)
	case TmplMigration:
		var fromUp  string
		var fromDown string
		version := time.Now().Unix()
		config := make(map[string]interface{})
		config["filename"] = args["name"]
		config["createTableName"] = args["createTableName"]
		config["alterTableName"] = args["alterTableName"]

		filename := fmt.Sprintf("%v", config["filename"])

		migrateUpFilename := fmt.Sprintf("%v_%v.up.sql", version, filename)
		migrateDownFilename := fmt.Sprintf("%v_%v.down.sql", version, filename)

		if config["createTableName"] != "" {
			fromUp = "./internal/pkg/artisan/template/tmpl/migration/create.up.sql"
			fromDown = "./internal/pkg/artisan/template/tmpl/migration/create.down.sql"
		} else if config["alterTableName"] != "" {
			fromUp = "./internal/pkg/artisan/template/tmpl/migration/alter.up.sql"
			fromDown = "./internal/pkg/artisan/template/tmpl/migration/alter.down.sql"
		}else {
			log.Fatalf("Insufficient parameters")
			return errors.New("Insufficient parameters")
		}

		a.skeleton(fromUp, "./database/migrations/" + migrateUpFilename, config)
		a.skeleton(fromDown, "./database/migrations/" + migrateDownFilename, config)
	}


	return

}

func (a *Artisan) skeleton(from string, to string, config map[string]interface{})  (err error){

	_, err = os.Stat(to)
	if !os.IsNotExist(err) {
		log.Fatalf("File Exist!")
		return
	}

	t, err := template.ParseFiles(from)
	if err != nil {
		log.Fatal(err)
		return
	}

	f, err := os.Create(to)
	if err != nil {
		log.Fatalf("create file: %v", err)
		return
	}

	err = t.Execute(f, config)
	if err != nil {
		log.Fatalf("execute: %v", err)
		return
	}

	f.Close()

	return nil
}
package migrate

import (
	_ "liontravel.tech/internal/pkg/env"
	"database/sql"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/spf13/viper"
	"log"
)

var m *migrate.Migrate

type MigrateWizard struct {

}

func init() {

	dialect := viper.GetString("database.dialect")
	user := viper.GetString("database.user")
	password := viper.GetString("database.password")
	host := viper.GetString("database.host")
	port := viper.GetString("database.port")
	dbname := viper.GetString("database.dbname")

	db, err := sql.Open(dialect, user + ":" + password + "@tcp(" + host + ":" + port + ")/" + dbname + "?multiStatements=true")
	if err != nil {
		log.Fatalf("Error: %v", err)
	}

	driver, err := mysql.WithInstance(db, &mysql.Config{})
	if err != nil {
		log.Fatalf("Error: %v", err)
	}

	m, err = migrate.NewWithDatabaseInstance("file://database/migrations", "mysql", driver)

	if err != nil {
		log.Fatalf("Error: %v", err)
	}
}

func (mw *MigrateWizard) Up() (err error){
	err = m.Up()

	return
}

func (mw *MigrateWizard) Down() (err error){
	err = m.Down()

	return
}

func (mw *MigrateWizard) Step(t int) (err error){
	err = m.Steps(t)

	return
}
package main

import (
	"liontravel.tech/internal/pkg/artisan/migrate"
	"liontravel.tech/internal/pkg/artisan/template"
	"bytes"
	"flag"
	"fmt"
	"log"
	"os"
	"os/exec"
)

var (
	cli *flag.FlagSet
	h bool
	name string
	createTableName string
	alterTableName string
	modelMigration bool
	migrateUp bool
	migrateDown bool
	migrateStep int
)

func init()  {
	flag.BoolVar(&h, "h", false, "Help")
	flag.Usage = usageRoot
	flag.Parse()
}

func main() {
	if h {
		flag.Usage()
	}else {

		var handle func()
		cli = flag.NewFlagSet(os.Args[0], flag.ExitOnError)
		cli.BoolVar(&h, "h", false, "Help")

		switch os.Args[1] {
		case "model":
			cli.StringVar(&name,"name", "", "The name of model")
			cli.BoolVar(&modelMigration,"m", false, "Create a new migration file for the model")
			cli.Usage = usageModel
			handle = handleModel
		case "migration":
			cli.StringVar(&name,"name", "", "The name of migration")
			cli.StringVar(&createTableName,"create", "", "Create table name")
			cli.StringVar(&alterTableName,"table", "", "Alter table name")
			cli.Usage = usageMigration
			handle = handleMigration
		case "migrate":
			cli.BoolVar(&migrateUp,"up", false, "Migration schema")
			cli.BoolVar(&migrateDown,"down", false, "Rolled back once")
			cli.IntVar(&migrateStep, "step", 0, "Force the migrations to be run so they can be rolled back individually")
			cli.Usage = usageMigrate
			handle = handleMigrate
		case "gql":
			cli.Usage = usageGql
			handle = handleGql
		case "serve":
			fmt.Println("run serve")
		}

		cli.Parse(os.Args[2:])

		if h { // handle help
			cli.Usage()
		}else {
			handle()
		}
	}
}

func handleModel() {
	a := &template.Artisan{}
	args := make(map[string]interface{})
	args["name"] = name
	err := a.Create(template.TmplModel, args)

	if err == nil {
		fmt.Println("Create model Successful!")
	}
}

func handleMigration() {
	a := &template.Artisan{}
	args := make(map[string]interface{})
	args["name"] = name
	args["createTableName"] = createTableName
	args["alterTableName"] = alterTableName
	err := a.Create(template.TmplMigration, args)

	if err == nil {
		fmt.Println("Create migration Successful!")
	}
}

func handleMigrate() {
	var err error
	m := &migrate.MigrateWizard{}

	if migrateUp {
		err = m.Up()
	}else if migrateDown {
		err = m.Down()
	}else if migrateStep != 0{
		err = m.Step(migrateStep)
	} else {
		log.Fatalf("Insufficient parameters")
	}

	if err == nil {
		fmt.Println("Create migration Successful!")
	}
}

func handleGql()  {
	runShell("go", "run", "cmd/gqlgen.go", "--config", "config/gqlgen.yml")
}

func runShell(c ...string)  {
	var stdout bytes.Buffer
	var stderr bytes.Buffer

	cmd := exec.Command(c[0], c[1:]...)
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	err := cmd.Run()

	if err != nil {
		fmt.Println(stdout.String(), stderr.String())
		fmt.Fprintln(os.Stderr, err.Error())
	} else {
		fmt.Println("success!")
	}
}

// usage
func usageRoot() {
	fmt.Fprintf(os.Stderr, `artisan version: 0.0.1
Usage: 
artisan gql [-h]
artisan model [-h] [options]
artisan migration [-h] [options]
artisan migration [-h] [options]

Options:
`)
	flag.PrintDefaults()
}

func usageModel() {
	fmt.Fprintf(os.Stderr, `Usage: 
artisan model [-h] <-name model_name>

Example:
artisan model -name User

Options:
`)
	cli.PrintDefaults()
}

func usageMigration() {
	fmt.Fprintf(os.Stderr, `Usage: 
artisan migration [-h] <-name model_name>

Example:
artisan migration -name create_users_table

Options:
`)
	cli.PrintDefaults()
}

func usageMigrate() {
	fmt.Fprintf(os.Stderr, `Usage: 
artisan migration [-h] <-name model_name>

Example:
artisan migration -up
artisan migration -down
artisan migration -step 2


Options:
`)
	cli.PrintDefaults()
}

func usageGql() {
	fmt.Fprintf(os.Stderr, `Usage: 
artisan gql [-h]

Example:
artisan gql

Options:
`)
	cli.PrintDefaults()
}
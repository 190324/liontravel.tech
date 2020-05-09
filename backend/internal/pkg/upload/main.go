package upload

import (
	"github.com/99designs/gqlgen/graphql"
	"github.com/spf13/viper"
	"io/ioutil"
	"log"
	"os"
	"path"
	_ "liontravel.tech/internal/pkg/env"
	"strings"
)

func Upload(savePath string, file graphql.Upload) (*string, error) {

	extension := "jpg"
	switch file.ContentType {
	case "image/jpeg":
		extension = "jpg"
	case "image/png":
		extension = "png"
	}

	imagesPath := viper.GetString("storagePath")
 	fullPath := path.Join(imagesPath, savePath)
	os.MkdirAll(fullPath, os.ModePerm)

	tempFile, err := ioutil.TempFile(fullPath, "*."+extension)
	if err != nil {
		return nil, err
	}
	defer tempFile.Close()

	fileBytes, err := ioutil.ReadAll(file.File)
	if err != nil {
		return nil, err
	}

	tempFile.Write(fileBytes)

	log.Printf("%v", tempFile.Name())

	filename := strings.ReplaceAll(tempFile.Name(), fullPath + "/", "")

	return &filename, nil
}
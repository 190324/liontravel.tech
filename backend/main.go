package main

import (
	"log"
	"strings"
)

func main() {
	path := "../storage/liontravel.tech/storage/images/products/P10905090000005/872891477.png"
	newPath := strings.ReplaceAll(path, "../storage/liontravel.tech/storage/images/products", "")
	log.Printf("%v", newPath)
}

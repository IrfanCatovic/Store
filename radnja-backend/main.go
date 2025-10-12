package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(w, "Server Radi")
	})

	fmt.Println("Server startovan na :8080")
	http.ListenAndServe(":8080", nil)
}
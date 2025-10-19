package main

import (
	"fmt"
	"net/http"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Server radi")
}

func main() {
	http.HandleFunc("/", homeHandler)
	fmt.Println("Pokrenut server")
	http.ListenAndServe(":8080", nil)

}
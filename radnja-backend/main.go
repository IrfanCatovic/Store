package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Server radi sa muxom")
}

func main() {
	r := mux.NewRouter()
	

	r.HandleFunc("/", homeHandler)
	fmt.Println("Pokrenut server")
	http.ListenAndServe(":8080", r)

}
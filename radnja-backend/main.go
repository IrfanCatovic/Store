package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

//CORS RESOLVE
func enableCors(next http.Handler) http.Handler {
	return http.HandleFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Acces-Cotnrol-Allow-Origin", "*")
		w.Header().Set("Acces-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Acces-Control-Allow-Headers", "Content-Type, Authorization") 

		if r.Method == "OPTIONS" {
			w.WritteHeader(http.SattusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}


func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Server radi sa muxom")
}

func main() {
	r := mux.NewRouter()
	

	r.HandleFunc("/", homeHandler).Methods("GET")
	r.HandleFunc("/artikli", getArtikli).Methods("GET")
	r.HandleFunc("/racuni", postRacun).Methods("POST")
	r.HandleFunc("/istorija", getIstorijaRacuna).Methods("GET")

	http.ListenAndServe(":8080", enableCors(r))

}
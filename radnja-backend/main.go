package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

//CORS RESOLVE
func enableCors(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
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
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

	type Artikal struct {
	Id int `json:"id"`
	Ime string `json:"ime"`
	Cena int `json:"cena"`
	}

var artikli = []Artikal{
    {Id: 1, Ime: "Majica", Cena: 1200},
    {Id: 2, Ime: "Jakna", Cena: 7500},
}
	var istorijaRacuna [][]Artikal
	
	func getArtikli(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(artikli)
	}


func main() {


	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Server Radi")
	})


	http.HandleFunc("/artikli", getArtikli)

	

	fmt.Println("Server startovan na :8080")
	http.ListenAndServe(":8080", nil)
}
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
	
	//handler za get artikli
	func getArtikli(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(artikli)
	}

	//handler for set new bill to bill history
	func postRacun(w http.ResponseWriter, r *http.Request){
		if r.Method!="POST"{
			http.Error(w, "Metod nije dozvoljen", http.StatusMethodNotAllowed)
			return
		}

		var racun []Artikal
		err := json.NewDecoder(r.Body).Decode(&racun)
		if err!= nil{
			http.Error(w, "Greska pri citanju podataka", http.StatusBadRequest)
			return
		}

		istorijaRacuna = append(istorijaRacuna, racun)
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{"Status": "Racun dodat u istoriju"})
	}

func main() {

	//Check if server works
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Server Radi")
	})
	//create route for artikli
	http.HandleFunc("/artikli", getArtikli)
	//create route for bill history
	http.HandleFunc("/racuni", postRacun)

	http.ListenAndServe(":8080", nil)
}
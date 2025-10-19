// package main

// import (
// 	"encoding/json"
// 	"fmt"
// 	"io/ioutil"
// 	"net/http"
// 	"os"
// )

// type Artikal struct {
// 	Id   int    `json:"Id"`
// 	Ime  string `json:"Ime"`
// 	Cena int    `json:"Cena"`
// }

// var artikli = []Artikal{
// 	{Id: 1, Ime: "Majica", Cena: 1200},
// 	{Id: 2, Ime: "Jakna", Cena: 7500},
// }

// var istorijaRacuna [][]Artikal

// // ----------------------
// // CORS middleware
// // ----------------------
// func withCors(handler http.HandlerFunc) http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		w.Header().Set("Access-Control-Allow-Origin", "*")
// 		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
// 		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

// 		if r.Method == "OPTIONS" {
// 			w.WriteHeader(http.StatusOK)
// 			return
// 		}

// 		handler(w, r)
// 	}
// }

// // ----------------------
// // Handleri
// // ----------------------

// // GET /artikli
// func getArtikli(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-type", "application/json")
// 	json.NewEncoder(w).Encode(artikli)
// }

// // POST /racuni
// func postRacun(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != "POST" {
// 		http.Error(w, "Metod nije dozvoljen", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	var racun []Artikal
// 	err := json.NewDecoder(r.Body).Decode(&racun)
// 	if err != nil {
// 		http.Error(w, "Greška pri čitanju podataka", http.StatusBadRequest)
// 		return
// 	}

// 	istorijaRacuna = append(istorijaRacuna, racun)
// 	sacuvajIstoriju()
// 	w.WriteHeader(http.StatusCreated)
// 	json.NewEncoder(w).Encode(map[string]string{"status": "Racun dodat u istoriju"})
// }

// // GET /istorija
// func getIstorijaRacuna(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-type", "application/json")
// 	json.NewEncoder(w).Encode(istorijaRacuna)
// }

// // ----------------------
// // Čuvanje i učitavanje fajla
// // ----------------------
// func sacuvajIstoriju() {
// 	file, err := os.Create("istorija.json")
// 	if err != nil {
// 		fmt.Println("Greška pri kreiranju fajla:", err)
// 		return
// 	}
// 	defer file.Close()

// 	json.NewEncoder(file).Encode(istorijaRacuna)
// }

// func ucitajIstoriju() {
// 	if _, err := os.Stat("istorija.json"); os.IsNotExist(err) {
// 		fmt.Println("Fajl istorija.json ne postoji, kreiram novi...")
// 		ioutil.WriteFile("istorija.json", []byte("[]"), 0644)
// 	}

// 	data, err := ioutil.ReadFile("istorija.json")
// 	if err != nil {
// 		fmt.Println("Greška pri otvaranju fajla:", err)
// 		return
// 	}
// 	json.Unmarshal(data, &istorijaRacuna)
// }

// // ----------------------
// // MAIN
// // ----------------------
// func main() {
// 	fmt.Println("Server startovan na :8080")

// 	ucitajIstoriju()

// 	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
// 		fmt.Fprintln(w, "Server Radi")
// 	})

// 	http.HandleFunc("/artikli", withCors(getArtikli))
// 	http.HandleFunc("/racuni", withCors(postRacun))
// 	http.HandleFunc("/istorija", withCors(getIstorijaRacuna))

// 	http.ListenAndServe(":8080", nil)
// }

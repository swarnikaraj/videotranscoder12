package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/joho/godotenv"
)
  var ctx=context.Background()
type UserInput struct{
	Filename string `json:"filename"`
	Size string `json:"size"`
	BucketUrl string `json:"bucketUrl"`
}
func publishToQueue(ctx context.Context, client *redis.Client, message string) error {
    _, err := client.LPush(ctx, "gojobs", message).Result()
    return err
}
func main(){
   err := godotenv.Load()
    if err != nil {
        log.Fatalf("Error loading .env file: %v", err)
    }

REDIS_URL := os.Getenv("REDIS_URL")
fmt.Println(REDIS_URL,"REDIS URL")
  addr, err := redis.ParseURL(REDIS_URL)
	if err != nil {
		panic(err)
	}
  client:=redis.NewClient(addr)
  
  defer client.Close()
   pong,err:=client.Ping(ctx).Result()
    if err != nil {
        fmt.Println("Error connecting to Redis:", err)
        return
    }
    fmt.Println("Connected to Redis:", pong)

     http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// method validation
		if r.Method!=http.MethodPost{
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
        input:=UserInput{}

        // input validation
		err:=json.NewDecoder(r.Body).Decode(&input)
		if err!=nil{
			w.WriteHeader(http.StatusBadRequest)
			return
		}

       jsninput, _:=json.Marshal(input)
	   
      publishToQueue(ctx,client,string(jsninput))
	  res,_:=json.Marshal(input)
	  
	  w.Header().Set("Content-Type","application/json")
	  w.WriteHeader(http.StatusOK)
	  w.Write(res)
		
	 })
	http.ListenAndServe(":8080",nil)

}
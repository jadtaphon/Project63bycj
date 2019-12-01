package main

import (
	"log"
	"net"
	"net/http"
	"os"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"gopkg.in/mgo.v2"
)

func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))
	//////get ip//////////
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		os.Stderr.WriteString("Oops: " + err.Error() + "\n")
		os.Exit(1)
	}
	var ip string
	for _, a := range addrs {
		if ipnet, ok := a.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				ip = ipnet.IP.String()
			}
		}
	}
	log.Print(ip)

	//////get ip//////////
	// Database connection
	db, err := mgo.Dial("localhost")
	if err != nil {
		e.Logger.Fatal(err)
	}

	// Initialize handler
	h := &Handler{DB: db}
	e.GET("/getCourse", h.getAllCourse)
	e.GET("/report/:id", h.report)
	e.DELETE("/deleteCourse/:id", h.deleteCourse)
	e.POST("/upload", h.uploadCourse)
	e.POST("/chackname/:id", h.checkIn)
	e.GET("/getIP", h.getIP)
	e.GET("/getMacAddr", h.getMacAddr)
	e.Logger.Fatal(e.Start(":8080"))
}

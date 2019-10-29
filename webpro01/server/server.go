package main

import (
	"net/http"

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

	// Database connection
	db, err := mgo.Dial("localhost")
	if err != nil {
		e.Logger.Fatal(err)
	}

	// Initialize handler
	h := &Handler{DB: db}
	e.GET("/getCourse", h.getAllCourse)
	e.POST("/ceate-course", h.ceateCourse)
	e.DELETE("/deleteCourse/:id", h.deleteCourse)
	e.Logger.Fatal(e.Start(":8080"))
}

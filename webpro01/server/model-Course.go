package main

import (
	"gopkg.in/mgo.v2/bson"

)

type (
	Course struct {
		ID         bson.ObjectId `json:"id" bson:"_id,omitempty"`
		CourseID   string        `json:"course_id" bson:"course_id"`
		CourseName string        `json:"course_name" bson:"course_name"`
		Day_Time   string        `json:"time" bson:"time"`
		Seson      string        `json:"seson" bson:"seson"`
		Sutdents   []Sutdent     `json:"students" bson:"students"`
	}
	Sutdent struct {
		NumberID  int    `json:"number_id" bson:"number_id"`
		Idstudent string `json:"id_student" bson:"id_student"`
		Name      string `json:"name" bson:"name"`
		Weeks     Week   `json:"weeks" bson:"weeks"`
	}
	Week struct {
		Week1  Active `json:"week1" bson:"week1"`
		Week2  Active `json:"week2" bson:"week2"`
		Week3  Active `json:"week3" bson:"week3"`
		Week4  Active `json:"week4" bson:"week4"`
		Week5  Active `json:"week5" bson:"week5"`
		Week6  Active `json:"week6" bson:"week6"`
		Week7  Active `json:"week7" bson:"week7"`
		Week8  Active `json:"week8" bson:"week8"`
		Week9  Active `json:"week9" bson:"week9"`
		Week10 Active `json:"week10" bson:"week10"`
		Week11 Active `json:"week11" bson:"week11"`
		Week12 Active `json:"week12" bson:"week12"`
		Week13 Active `json:"week13" bson:"week13"`
		Week14 Active `json:"week14" bson:"week14"`
		Week15 Active `json:"week15" bson:"week15"`
		Week16 Active `json:"week16" bson:"week16"`
	}
	Active struct {
		Weeks    float32 `json:"week" bson:"week"`
		Idactive string  `json:"id_active" bson:"id_active"`
	}
)

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
		Sutdents   []Sutdent     `json:"students" bson:"students"`
	}
	Sutdent struct {
		NumberID  int    `json:"number_id" bson:"number_id"`
		Idstudent string `json:"id_student" bson:"id_student"`
		Name      string `json:"name" bson:"name"`
		Weeks     Week   `json:"weeks" bson:"weeks"`
	}
	Week struct {
		Week1  int `json:"week1" bson:"week1"`
		Week2  int `json:"week2" bson:"week2"`
		Week3  int `json:"week3" bson:"week3"`
		Week4  int `json:"week4" bson:"week4"`
		Week5  int `json:"week5" bson:"week5"`
		Week6  int `json:"week6" bson:"week6"`
		Week7  int `json:"week7" bson:"week7"`
		Week8  int `json:"week8" bson:"week8"`
		Week9  int `json:"week9" bson:"week9"`
		Week10 int `json:"week10" bson:"week10"`
		Week11 int `json:"week11" bson:"week11"`
		Week12 int `json:"week12" bson:"week12"`
		Week13 int `json:"week13" bson:"week13"`
		Week14 int `json:"week14" bson:"week14"`
		Week15 int `json:"week15" bson:"week15"`
		Week16 int `json:"week16" bson:"week16"`
	}
)

// var (
// 	Courses = map[string]*Course{}
// )

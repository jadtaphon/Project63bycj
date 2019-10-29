package main

import (
	"gopkg.in/mgo.v2/bson"
	// "gopkg.in/mgo.v2/bson"
)

type (
	Course struct {
		ID         bson.ObjectId `json:"id" bson:"_id,omitempty"`
		CourseID   int           `json:"course_id" bson:"course_id"`
		Coursename string        `json:"coursename" bson:"coursename"`
		Day_Time   string        `json:"time" bson:"time"`
		Classroom  string        `json:"classroom" bson:"classroom"`
		Teacher    string        `json:"teacher" bson:"teacher"`
	}
)

// var (
// 	Courses = map[string]*Course{}
// )

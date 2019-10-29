package main

import (
	"net/http"

	//"example.com/m/v2/model"

	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func (h *Handler) getAllCourse(c echo.Context) (err error) {
	users := []*Course{}

	db := h.DB.Clone()
	if err = db.DB("test").C("course").Find(nil).All(&users); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	defer db.Close()
	return c.JSON(http.StatusOK, users)
}

func (h *Handler) ceateCourse(c echo.Context) (err error) {

	u := new(Course)
	if err = c.Bind(u); err != nil {
		return
	}
	p := &Course{
		ID:         bson.NewObjectId(),
		CourseID:   u.CourseID,
		Coursename: u.Coursename,
		Day_Time:   u.Day_Time,
		Classroom:  u.Classroom,
		Teacher:    u.Teacher,
	}
	// Save user
	db := h.DB.Clone()
	defer db.Close()

	// Create indices
	if err = db.Copy().DB("test").C("course").EnsureIndex(mgo.Index{
		Key:    []string{"course_id"},
		Unique: true,
	}); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	if err = db.DB("test").C("course").Insert(p); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, u)
}
func (h *Handler) deleteCourse(c echo.Context) (err error) {
	db := h.DB.Clone()
	defer db.Close()

	id := c.Param("id")

	err = db.DB("test").C("course").Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
		//return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
	//return c.JSON(http.StatusOK, bson.M{"_id": id})

}

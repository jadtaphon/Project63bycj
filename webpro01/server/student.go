package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"

	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

)

func (h *Handler) getIP(c echo.Context) (err error) {
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
	return c.JSON(http.StatusOK, ip)
}

///////////////////////////////////////////////////////////////////
func (h *Handler) getAllCourse(c echo.Context) (err error) {
	users := []*Course{}
	db := h.DB.Clone()

	if err = db.DB("test").C("course").Find(nil).All(&users); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	defer db.Close()
	return c.JSON(http.StatusOK, users)
}

/////////////////////////////////////////////////////////////////////
func (h *Handler) deleteCourse(c echo.Context) (err error) {
	db := h.DB.Clone()
	defer db.Close()

	id := c.Param("id")

	err = db.DB("test").C("course").Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.NoContent(http.StatusNoContent)

}

//////////////////////////////////////////////////////////////////////////
func (h *Handler) uploadCourse(c echo.Context) (err error) {
	var bodyBytes []byte
	if c.Request().Body != nil {
		bodyBytes, _ = ioutil.ReadAll(c.Request().Body)
	}

	c.Request().Body = ioutil.NopCloser(bytes.NewBuffer(bodyBytes))

	user := new(Course)

	err = c.Bind(user)
	if err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, err)
	}
	log.Print(user.CourseID)

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("test").C("course").Insert(user); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	if err != nil {
		if mgo.IsDup(err) {
			log.Panicln(err)
		}

	}
	return c.JSON(http.StatusOK, &user)

}

//////////////////////////////////////////////////////////////////////////////
func (h *Handler) updatescore(c echo.Context) error {
	var bodyBytes []byte
	if c.Request().Body != nil {
		bodyBytes, _ = ioutil.ReadAll(c.Request().Body)
	}
	id := c.Param("id")
	log.Print(id)

	c.Request().Body = ioutil.NopCloser(bytes.NewBuffer(bodyBytes))

	user := new(Course)
	err := c.Bind(user)
	if err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, err)
	}

	db := h.DB.Clone()
	defer db.Close()

	query := bson.M{"_id": bson.ObjectIdHex(id)}
	update1 := bson.M{"$set": bson.M{"students": user.Sutdents}}

	err = db.DB("test").C("course").Update(query, update1)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, user)
}

///////////////////////////////////////////////////////////////////////
func (h *Handler) addupstudent(c echo.Context) error {
	u := new(Sutdent)
	id := c.Param("id")

	if err := c.Bind(u); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	db := h.DB.Clone()
	defer db.Close()

	if err := db.DB("test").C("course").
		UpdateId(bson.ObjectIdHex(id), bson.M{"$addToSet": bson.M{"students": u}}); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, u)
}

//////////////////////////////////////////////////////////////////////
func (h *Handler) deletestudent(c echo.Context) error {
	u := new(Sutdent)
	if err := c.Bind(u); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	db := h.DB.Clone()
	defer db.Close()

	id := c.Param("id")
	query := bson.M{"_id": bson.ObjectIdHex(id)}
	update := bson.M{"$pull": bson.M{"students": bson.M{"id_student": u.Idstudent}}}

	err := db.DB("test").C("course").Update(query, update)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, u)
}

//////////////////////////////////////////////////////////////////////
func (h *Handler) editstudent(c echo.Context) error {
	u := new(Sutdent)
	id := c.Param("id")

	if err := c.Bind(u); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	db := h.DB.Clone()
	defer db.Close()

	query := bson.M{"_id": bson.ObjectIdHex(id), "students.id_student": u.Idstudent}
	update := bson.M{
		"$set": bson.M{
			"students.$": u,
		},
	}

	err := db.DB("test").C("course").Update(query, update)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, u.Idstudent)
}

//////////////////////////////////////////////////////////////////////
func (h *Handler) report(c echo.Context) error {
	users := []*Course{}
	db := h.DB.Clone()
	defer db.Close()
	id := c.Param("id")

	err := db.DB("test").C("course").Find(bson.M{"_id": bson.ObjectIdHex(id)}).All(&users)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, users)
}

/////////////////////////////////////////////////////////////////////

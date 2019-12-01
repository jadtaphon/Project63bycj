package main

import (
	"bytes"
	"io/ioutil"
	"net"
	"os"

	"net/http"

	"log"

	"github.com/labstack/echo"

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

/////////////////////////////////////////////////////////////

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

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("test").C("course").Insert(user); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, &user)

}

///////////////////////////////////////////////
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

///////////////////////////////////////
func (h *Handler) getMacAddr(c echo.Context) error {
	ifas, err := net.Interfaces()
	if err != nil {
		return c.JSON(http.StatusOK, err)
	}
	var addr []string
	for _, ifa := range ifas {
		a := ifa.HardwareAddr.String()
		if a != "" {
			addr = append(addr, a)
		}
	}
	return c.JSON(http.StatusOK, addr)
	//return as, nil
}

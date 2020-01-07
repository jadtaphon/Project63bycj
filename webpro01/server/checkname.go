package main

import (
	"net/http"

	"github.com/labstack/echo"
	"gopkg.in/mgo.v2/bson"
	//"example.com/m/v2/model"

)

func (h *Handler) checkIn(c echo.Context) error {

	u := new(Course)

	id := c.Param("id")
	stdid := c.FormValue("stdid")
	week := c.FormValue("week")
	//idactive := c.FormValue("id_active")

	// Find user
	db := h.DB.Clone()
	defer db.Close()

	query := bson.M{"_id": bson.ObjectIdHex(id), "students.id_student": stdid}
	update := bson.M{}

	switch week {
	case "1":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week1.week":      1,
				"students.$.weeks.week1.id_active": stdid,
			},
		}
	case "2":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week2.week":      1,
				"students.$.weeks.week2.id_active": stdid,
			},
		}
	case "3":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week3.week":      1,
				"students.$.weeks.week3.id_active": stdid,
			},
		}
	case "4":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week4.week":      1,
				"students.$.weeks.week4.id_active": stdid,
			},
		}
	case "5":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week5.week":      1,
				"students.$.weeks.week5.id_active": stdid,
			},
		}
	case "6":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week6.week":      1,
				"students.$.weeks.week6.id_active": stdid,
			},
		}
	case "7":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week7.week":      1,
				"students.$.weeks.week7.id_active": stdid,
			},
		}
	case "8":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week8.week":      1,
				"students.$.weeks.week8.id_active": stdid,
			},
		}
	case "9":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week9.week":      1,
				"students.$.weeks.week9.id_active": stdid,
			},
		}
	case "10":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week10.week":      1,
				"students.$.weeks.week10.id_active": stdid,
			},
		}
	case "11":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week11.week":      1,
				"students.$.weeks.week11.id_active": stdid,
			},
		}
	case "12":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week12.week":      1,
				"students.$.weeks.week12.id_active": stdid,
			},
		}
	case "13":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week13.week":      1,
				"students.$.weeks.week13.id_active": stdid,
			},
		}
	case "14":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week14.week":      1,
				"students.$.weeks.week14.id_active": stdid,
			},
		}
	case "15":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week15.week":      1,
				"students.$.weeks.week15.id_active": stdid,
			},
		}
	case "16":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week16.week":      1,
				"students.$.weeks.week16.id_active": stdid,
			},
		}
	default:
		return c.JSON(http.StatusBadRequest, "week invalid")
	}

	err := db.DB("test").C("course").Update(query, update)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	WsSendAction(c, WsMsg{
		Action:  string(checknameEvent),
		Payload: map[string]interface{}{"item": u},
	})
	return c.JSON(http.StatusOK, u)
}

func (h *Handler) checknameT(c echo.Context) error {

	u := new(Course)

	id := c.Param("id")
	stdid := c.FormValue("stdid")
	week := c.FormValue("week")
	//cont := c.FormValue("cont")

	// Find user
	db := h.DB.Clone()
	defer db.Close()

	query := bson.M{"_id": bson.ObjectIdHex(id), "students.id_student": stdid}
	update := bson.M{}

	switch week {
	case "1":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week1.week":      0.5,
				"students.$.weeks.week1.id_active": stdid,
			},
		}
	case "2":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week2.week":      0.5,
				"students.$.weeks.week2.id_active": stdid,
			},
		}
	case "3":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week3.week":      0.5,
				"students.$.weeks.week3.id_active": stdid,
			},
		}
	case "4":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week4.week":      0.5,
				"students.$.weeks.week4.id_active": stdid,
			},
		}
	case "5":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week5.week":      0.5,
				"students.$.weeks.week5.id_active": stdid,
			},
		}
	case "6":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week6.week":      0.5,
				"students.$.weeks.week6.id_active": stdid,
			},
		}
	case "7":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week7.week":      0.5,
				"students.$.weeks.week7.id_active": stdid,
			},
		}
	case "8":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week8.week":      0.5,
				"students.$.weeks.week8.id_active": stdid,
			},
		}
	case "9":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week9.week":      0.5,
				"students.$.weeks.week9.id_active": stdid,
			},
		}
	case "10":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week10.week":      0.5,
				"students.$.weeks.week10.id_active": stdid,
			},
		}
	case "11":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week11.week":      0.5,
				"students.$.weeks.week11.id_active": stdid,
			},
		}
	case "12":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week12.week":      0.5,
				"students.$.weeks.week12.id_active": stdid,
			},
		}
	case "13":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week13.week":      0.5,
				"students.$.weeks.week13.id_active": stdid,
			},
		}
	case "14":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week14.week":      0.5,
				"students.$.weeks.week14.id_active": stdid,
			},
		}
	case "15":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week15.week":      0.5,
				"students.$.weeks.week15.id_active": stdid,
			},
		}
	case "16":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week16.week":      0.5,
				"students.$.weeks.week16.id_active": stdid,
			},
		}
	default:
		return c.JSON(http.StatusBadRequest, "week invalid")
	}

	err := db.DB("test").C("course").Update(query, update)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, u)
}

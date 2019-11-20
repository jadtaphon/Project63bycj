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

	// Find user
	db := h.DB.Clone()
	defer db.Close()

	query := bson.M{
		"_id":                 bson.ObjectIdHex(id),
		"students.id_student": stdid,
	}

	update := bson.M{}

	switch week {
	case "1":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week1": 1,
			},
		}
	case "2":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week2": 1,
			},
		}
	case "3":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week3": 1,
			},
		}
	case "4":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week4": 1,
			},
		}
	case "5":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week5": 1,
			},
		}
	case "6":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week6": 1,
			},
		}
	case "7":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week7": 1,
			},
		}
	case "8":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week8": 1,
			},
		}
	case "9":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week9": 1,
			},
		}
	case "10":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week10": 1,
			},
		}
	case "11":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week11": 1,
			},
		}
	case "12":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week12": 1,
			},
		}
	case "13":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week13": 1,
			},
		}
	case "14":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week14": 1,
			},
		}
	case "15":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week15": 1,
			},
		}
	case "16":
		update = bson.M{
			"$set": bson.M{
				"students.$.weeks.week16": 1,
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

package main

import (
	"log"
	"os"
	"net"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo"

)

func WsSendAction(e echo.Context, data WsMsg) error {
	////////////get ip///////////
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
	/////////////////////////////////////////////
	
	c, _, err := websocket.DefaultDialer.Dial("ws://"+ip+":443/ws", nil)
	log.Println(ip+"test01")
	if err != nil {
		log.Println("dial:", err)
		return err
	}
	defer c.Close()

	err = c.WriteJSON(data)
	if err != nil {
		log.Println("write:", err)
		return err
	}
	return nil
}

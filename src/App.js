import React, { useState, useEffect } from "react";
import "./App.css";
import Room from "./Room";
import nextId from "react-id-generator";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    var guests = 0;
    rooms.forEach(room => {
      const room_guests = Number(room.adults) + Number(room.children);
      guests += room_guests;
    });
    document.getElementById("brief").innerHTML =
      rooms.length + " Rooms - " + guests + " Guests";
    console.log(rooms.length, guests);
  }, [rooms]);

  const add_room = () => {
    const htmlId = nextId();
    setRooms([...rooms, { id: htmlId, adults: 0, children: 0, ages: [] }]);
  };

  const changeNoOfMembers = (id, personType, changeType) => {
    const index = rooms.findIndex(room => room.id === id);
    const newRoom = Object.assign({}, rooms[index]);
    if (personType === 1) {
      if (changeType === 1) {
        newRoom.adults += 1;
      } else if (changeType === 2) {
        newRoom.adults -= 1;
      }
    } else if (personType === 2) {
      if (changeType === 1) {
        newRoom.children += 1;
        newRoom.ages.push(0);
      } else if (changeType === 2) {
        newRoom.children = newRoom.children - 1;
        newRoom.ages.pop();
      }
    }
    const newRooms = [...rooms];
    newRooms[index] = newRoom;
    setRooms(newRooms);
  };

  const deleteRoom = id => {
    const newRooms = rooms.filter(room => room.id !== id);
    setRooms(newRooms);
  };

  const changeAge = (id, cIndex, changeType) => {
    const index = rooms.findIndex(room => room.id === id);
    const newRoom = Object.assign({}, rooms[index]);
    if (changeType === 1) {
      newRoom.ages[cIndex] += 1;
    } else if (changeType === 2) {
      newRoom.ages[cIndex] -= 1;
    }
    const newRooms = [...rooms];
    newRooms[index] = newRoom;
    setRooms(newRooms);
  };

  const rooms_jsx = [];
  for (var i = 0; i < rooms.length; i++) {
    rooms_jsx.push(
      <Room
        ids={i}
        {...rooms[i]}
        change={changeNoOfMembers}
        delete={deleteRoom}
        changeAge={changeAge}
      />
    );
  }

  return (
    <div className="App">
      <header>
        <img src="logo.svg" alt="xpresslane" />
      </header>
      <div id="wrapper">
        <section id="brief">Brief</section>
        <div id="mainBox">
          <header>
            <div></div>
            <div>Adult</div>
            <div>Children</div>
            <div></div>
          </header>
          <section>{rooms_jsx}</section>
          <footer id="mainActions">
            <button onClick={add_room}>+ ADD ROOM</button>
            <button id="done">DONE</button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;

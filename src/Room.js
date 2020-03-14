import React, { useEffect } from "react";

export default function Room(props) {
  const id = props.ids;

  useEffect(() => {
    if (props.ages.length === 0) {
      document.getElementById("cA" + id).style.display = "none";
      document.getElementById("move" + id).style.display = "none";
    } else {
      document.getElementById("cA" + id).style.display = "flex";
      document.getElementById("move" + id).style.display = "block";
    }
  }, [props, id]);

  const changeValue = (personType, changeType) => {
    props.change(props.id, personType, changeType);
  };

  const deleteRoomCall = () => {
    props.delete(props.id);
  };

  const changeAgeCall = (cIndex, changeType) => {
    props.changeAge(props.id, cIndex, changeType);
  };

  const age_jsx = [];

  props.ages.forEach((age, ind) => {
    age_jsx.push(
      <section className="children">
        <button
          className="Btn mBtn"
          disabled={age === 0}
          onClick={changeAgeCall.bind(this, ind, 2)}
        >
          -
        </button>
        <span>{age}</span>
        <button
          className="Btn"
          disabled={age === 12}
          onClick={changeAgeCall.bind(this, ind, 1)}
        >
          +
        </button>
      </section>
    );
  });

  return (
    <div className="room">
      <section className="index">{id + 1}</section>
      <section className="adults">
        <button
          className="Btn mBtn"
          disabled={props.adults === 0}
          onClick={changeValue.bind(this, 1, 2)}
        >
          -
        </button>
        <span>{props.adults}</span>
        <button
          className="Btn"
          disabled={props.adults === 5}
          onClick={changeValue.bind(this, 1, 1)}
        >
          +
        </button>
      </section>
      <section className="children">
        <button
          className="Btn mBtn"
          disabled={props.children === 0}
          onClick={changeValue.bind(this, 2, 2)}
        >
          -
        </button>
        <span>{props.children}</span>
        <button
          className="Btn"
          disabled={props.children === 5}
          onClick={changeValue.bind(this, 2, 1)}
        >
          +
        </button>
      </section>
      <section className="delete">
        <button className="Btn" onClick={deleteRoomCall}>
          <img src="delete.svg" alt="delete button" />
        </button>
      </section>

      <svg height="25" width="25" className="move" id={"move" + id}>
        <polygon points="0,10 7,10 20,10 10,0" style={{ fill: "#fef4ef" }} />
        Sorry, your browser does not support inline SVG.
      </svg>
      <div id={"cA" + id} className="childrensAge">
        <section>Children's Age</section>
        <section>{age_jsx}</section>
      </div>
    </div>
  );
}

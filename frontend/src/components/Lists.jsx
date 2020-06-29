import React from "react";

const Lists = (props) => {
  let { list } = props;
  return (
    <ul style={{ listStyle: "circle" }}>
      {list.map(function (item, i) {
        return <li>{item}</li>;
      })}
    </ul>
  );
};

export default Lists;

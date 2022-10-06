import React from 'react';
import { useEffect } from 'react';
//name, user_id, eye_color, gender, color, last_seen, description

export default function PostContainer2() {
  //states
  const [data, setData] = React.useState([]);

  useEffect(() => {
    console.log("hello")
    fetch('/post/')
      .then((response) => response.json())
      .then((response) => console.log(response));
  });
  return <div>PostContainer2</div>;
}

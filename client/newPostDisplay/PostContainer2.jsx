import React from 'react';
import { useEffect } from 'react';
import PostItem from './PostItem.jsx';
//name, user_id, eye_color, gender, color, last_seen, description

export default function PostContainer2() {
  //states
  const [data, setData] = React.useState([]);

  useEffect(() => {
    console.log('hello');
    fetch('/post/')
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);

  console.log('logging data');
  console.log(data);
  return (
    <div id='posts'>
      <h1>Bulletin Board</h1>
      {data.map((postData, index) =>
        (
        <PostItem key={index} postData={postData} />
      )
      )}
    </div>
  );
}

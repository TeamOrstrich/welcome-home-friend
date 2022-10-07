import React, { useState } from 'react';
// import { Buffer } from 'node:buffer';
function toArrayBuffer(buf) {
  console.log('buff length: ', buf.length);
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
  }
  return ab;
}
export default function PostItem(postData) {
  const [comment, toggleComment] = useState(false)
  const [comments, setComments] = useState('')
  const [commentsArr, setCommentsArr] = useState([])

  let imageUrl, blob, base64String;
  if(postData.postData.images){
    console.log('postData.images: ', postData.postData.images);
    const ab = toArrayBuffer(postData.postData.images.data);
    console.log('AB: ', postData.postData.images.data);
    let content = new Uint8Array(postData.postData.images.data);
    blob = new Blob([content.buffer], { type: "image/png" });
    imageUrl = URL.createObjectURL(blob);
    console.log('blob: ', blob);
    console.log('imgURL: ', imageUrl)
    base64String = btoa(
      String.fromCharCode(...new Uint8Array(postData.postData.images.data))
    );
    console.log('base64: ', base64String);

  }

  // let commentsArr = postData.postData.description

  // let base64 = btoa(
  //   new Uint8Array(Array(postData.postData.images.data)).reduce(
  //     (data, byte) => data + String.fromCharCode(byte),
  //     ''
  //   )
  // );
  //   const img = new Buffer.from(postData.postData.images).toString('base64');
  //   console.log(postData.postData.images);
  //   console.log('base64');
  // console.log(base64);
  // console.log(base64String);
  // console.log(String.fromCharCode(...new Uint8Array(postData.postData.images)));
  // console.log(btoa(String.fromCharCode))

  const commentBtnHandler = () => {
    if (comment) toggleComment(false)
    else toggleComment(true)
  }

  const addCommentsHandler = () => {
    setCommentsArr([...commentsArr, comments])
  }


  return (
    <div className='post-item'>
      <h3>Friend Name: {postData.postData.name}</h3>
      {/* {(base64String && <img src={`data:image/png;base64,${base64String}`} />)} */}
      {/* <img src={postData.postData.images} alt='cannot render image' /> */}
      <img src="" />
      <h5>Gender: {postData.postData.gender}</h5>
      <h5>Color: {postData.postData.color}</h5>
      <h5>Eye Color: {postData.postData.eye_color}</h5>
      <h5>Last Seen: {postData.postData.last_seen}</h5>
      <p>Description: {postData.postData.description}</p>
      <h6>Posted By: {postData.postData.username}</h6>
      <div className='comments-section'>
        {commentsArr.map(comment => (
          <p>{comment}</p>
        ))}
      </div>
      <button onClick={() => commentBtnHandler()} >Comment</button>
      {comment ? (
        <div className='comments'>
           <input id="comment-input" type="textarea" onChange={(e) => setComments(e.target.value)} />
           <button id='add-comment-btn' onClick={() => addCommentsHandler()}>Add comment</button>
        </div> 
         ) : ''}
    </div>
  );
}

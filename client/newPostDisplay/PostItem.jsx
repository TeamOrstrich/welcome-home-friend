import React from 'react';
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
  let imageUrl, blob;
  if(postData.postData.images){
    console.log('postData.images: ', postData.postData.images);
    const ab = toArrayBuffer(postData.postData.images.data);
    console.log('AB: ', ab);
    blob = new Blob(postData.postData.images.data, { type: "image/jpeg" });
    imageUrl = URL.createObjectURL(blob);
    console.log('blob: ', blob);
    console.log('imgURL: ', imageUrl)

  }
  // const base64String = btoa(
  //   String.fromCharCode(...new Uint8Array(postData.postData.images))
  // );

  // let base64 = btoa(
  //   new Uint8Array(Array(postData.postData.images)).reduce(
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
  return (
    <div>
      <h3>PetName: {postData.postData.name}</h3>
      {/* <img src={`data:image/jpeg;base64,${img}`} alt='cannot render image' /> */}
      {/* <img src={postData.postData.images} alt='cannot render image' /> */}
      <img src={imageUrl}/>
      <h5>Gender: {postData.postData.gender}</h5>
      <h5>Color: {postData.postData.color}</h5>
      <h5>Eye_color: {postData.postData.eye_color}</h5>
      <h5>Last Seen: {postData.postData.last_seen}</h5>
      <p> Description: {postData.postData.description}</p>
      <h6> Posted By: {postData.postData.username}</h6>
    </div>
  );
}

import React from 'react';
//import child components/ containers
import SidebarContainer from './SidebarContainer.jsx';
import PostContainer from './PostContainer.jsx';
import { PetDataProvider } from '../contexts/PostContext.jsx';
import PostContainer2 from '../newPostDisplay/PostContainer2.jsx';

const ContentContainer = () => {
  return (
    <PetDataProvider>
      <div className='content-container'>
        <SidebarContainer />
        <PostContainer2 />
        {/* <PostContainer /> */}
      </div>
    </PetDataProvider>
  );
};

export default ContentContainer;

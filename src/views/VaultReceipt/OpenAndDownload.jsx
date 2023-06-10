import React from 'react'
import styled from 'styled-components';

const OpenAndDownload = () => {
    const imageUrl = 'https://picsum.photos/600/600';

    const handleOpenImage = () => {
      const options = 'height=600,width=800,top=50,left=50';
      const imageWindow = window.open(imageUrl, '_blank', options);
      const closeButton = document.createElement('button');
      closeButton.innerHTML = 'Close';
      closeButton.onclick = () => imageWindow.close();
      imageWindow.document.body.appendChild(closeButton);
    };
  
    const handleDownloadImage = () => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'image.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
    //   document.body.removeChild(link);
    };

  return (
    <Wrapper>
      <button onClick={handleOpenImage}>Open Image</button>
      <button onClick={handleDownloadImage}>Download Image</button>
    </Wrapper>
  )
}

export default OpenAndDownload

const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 80vw;
  /* height: 100vh; */
  /* max-height: calc(100vh - 3.75rem); */
  height: calc(100vh - 3.75rem);
  padding: 2.5rem;
  background-color: #f5f3f3;
  /* margin-top: 3rem; */
  overflow: auto;
  float: left;
`;
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import nhac from './assets/nhac.mp3';
function Root() {
  const [audio] = useState(new Audio(nhac));

  useEffect(() => {
    document.addEventListener('click', () => {
      audio.play();
    });
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default Root;

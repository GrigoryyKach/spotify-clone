import React from 'react';
import { NavLink } from 'react-router-dom';

import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className='bg-[#003A10] min-h-screen pl-[4vw]'>
      <img
        className='mt-5 w-[max(10vw,100px)] hidden sm:block'
        src={assets.logo}
        alt="Spotify-logo"
      />
      <img
        className='mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block'
        src={assets.logo_small}
        alt="Spotify-logo-small"
      />

      <div className='flex flex-col gap-5 mt-10'>
        <NavLink to='/add-song' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
          <img
            className='w-5'
            src={assets.add_song}
            alt="add-song"
          />
          <p className='hidden sm:block'>Add Song</p>
        </NavLink>
        <NavLink to='/list-song' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
          <img
            className='w-5'
            src={assets.song_icon}
            alt="songs-list"
          />
          <p className='hidden sm:block'>Songs List</p>
        </NavLink>
        <NavLink to='/add-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
          <img
            className='w-5'
            src={assets.add_album}
            alt="add-album"
          />
          <p className='hidden sm:block'>Add Album</p>
        </NavLink>
        <NavLink to='/list-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
          <img
            className='w-5'
            src={assets.album_icon}
            alt="album-list"
          />
          <p className='hidden sm:block'>Album List</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar;
import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = 'http://localhost:4000';

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(songsData[0]);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0
    },
    totalTime: {
      second: 0,
      minute: 0
    }
  });

  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true);
  }

  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
  }

  const playWithId = async (id) => {
    await songsData.map((item) => {
      if (id === item._id) {
        setTrack(item);
      }
    })

    await audioRef.current.play();
    setPlayerStatus(true);
  }

  const prev = async () => {
    songsData.map(async (item, idx) => {
      if (track._id === item._id && idx > 0) {
        await setTrack(songsData[idx - 1]);
        await audioRef.current.play();
        setPlayerStatus(true);
      }
    })
  }

  const next = async () => {
    songsData.map(async (item, idx) => {
      if (track._id === item._id && idx < songsData.length - 1) {
        await setTrack(songsData[idx + 1]);
        await audioRef.current.play();
        setPlayerStatus(true);
      }
    })
  }

  const seekSong = async (e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
  }

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch (error) {

    }
  }

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {

    }
  }

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60)
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60)
          }
        })
      }
    }, 1000);
  }, [audioRef]);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, [])

  const contaxtValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    prev,
    next,
    seekSong,
    songsData,
    albumsData
  }

  return (
    <PlayerContext.Provider value={contaxtValue}>
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider;
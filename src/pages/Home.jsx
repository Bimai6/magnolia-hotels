import React from 'react'
import RoomCard from '../components/roomCard/RoomCard'
import doubleRoom from '../double-room.png'
const Home = () => {
  return (
    <div>
      <RoomCard title = {'Habitación Doble'} stars={3} price={43} img={doubleRoom}/>
    </div>
    
    
  )
}

export default Home
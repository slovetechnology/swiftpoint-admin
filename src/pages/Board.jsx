import React from 'react'
import { useSelector } from 'react-redux'

function Board() {
    const {profile} = useSelector(state => state.data)
  return (
    <div className='p-5'>
        <h1 className="font-bold text-2xl capitalize"> <span className="text-slate-500">Welcome,</span> {profile.firstname} {profile.lastname}</h1>
    </div>
  )
}

export default Board
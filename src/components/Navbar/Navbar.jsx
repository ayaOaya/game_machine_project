import React from 'react'
import "./style.scss"

export default function Navbar() {
  return (
    <>
    <div className="navbar">
        <h1 className="title"><a href="/">Decade</a></h1>
        <ul className="ul">
            <li className="li"><a href="/">about</a></li>
            <li className="li"><a href="/">schedule</a></li>
            <li className="li"><a href="/">games</a></li>
            <li className="li"><a href="/">shop</a></li>
        </ul>
        <h2 className="resrv"><a href="/">reservation</a></h2>
    </div>
    
    </>
  )
}

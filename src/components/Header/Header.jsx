import React from 'react'
import "./style.scss"
import WebgiViewer from '../webgiViewer/webgiViewer'

export default function Header() {
  return (
    <>
    <div className="header">
      <div className="titles">
        <h1 className="title">This is a title</h1>
        <div className="svg"></div>
      </div>

      {/* here goes the 3d model */}
      <div className="bg-color">
       <WebgiViewer />
      </div>
    </div>
    </>
  )
}

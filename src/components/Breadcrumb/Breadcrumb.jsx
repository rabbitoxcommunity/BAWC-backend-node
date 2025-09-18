import React, { useContext } from 'react'
import './Breadcrumb.scss'
import { useNavigate } from 'react-router-dom'

export default function Breadcrumb({ className = '', content }) {

  const navigate = useNavigate()

  const { navbarObj } = {}

  const pathObj = objGetter()

  function objGetter() {
    if (navbarObj?.[window.location.pathname.slice(1)] === undefined) {
      return navbarObj?.[window.location.pathname.replace(/\/[a-zA-Z0-9]*$/, '').slice(1)]
    }
    if (window.location.pathname === '/') {
      return navbarObj?.['/']
    }
    return navbarObj?.[window.location.pathname.slice(1)]
  }

  function clickHandler(path, isAuto, index, navObjArr) {
    if (isAuto) {
      if (navObjArr?.length - 1 === index) return
      if (pathObj.paths[index] === '/') { navigate('/'); return }
      navigate('/' + pathObj.paths[index])
    } else path && navigate(path)
  }

  return (
    <span id='Breadcrumb' className={className}>
      {content
        ? content?.map((item, i) => (
          <p key={i} onClick={() => clickHandler(item.path)}>{item.name}</p>
        ))
        : pathObj?.bds?.map((item, i, arr) => {
          return <p key={i} onClick={() => clickHandler(item, true, i, arr)}>{item}</p>
        })
      }
    </span >
  )
}
Breadcrumb.displayName = 'Breadcrumb'
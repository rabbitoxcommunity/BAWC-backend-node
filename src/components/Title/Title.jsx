import React, { useContext, useEffect, useState } from 'react'
import './Title.scss'

export default function Title({ className, title }) {

  const [text, setText] = useState('')

  const { navbarObj } = {}

  // const pathObj = objGetter()

  // function objGetter() {
  //   if (navbarObj[window.location.pathname.slice(1)] === undefined) {
  //     return navbarObj[window.location.pathname.replace(/\/[a-zA-Z0-9]*$/, '').slice(1)]
  //   }
  //   if (window.location.pathname === '/') {
  //     return navbarObj['/']
  //   }
  //   return navbarObj[window.location.pathname.slice(1)]
  // }

  useEffect(() => {
    setText(title)
    return () => {
      setText('')
    }
  }, [title])

  return (
    <h1 id='Title' className={className}>
      {
        title
      }
    </h1>
  )
}

Title.displayName = 'Title'
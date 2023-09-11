import React from 'react'
import Form from '../Form/Form'
import style from './LandingPage.module.css'
import Logo from '../../assets/logo.png'

export default function LandingPage({ login }) {
  return (
    <>
    <div className={style.animationCircle}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>        
    <div className={style.container}>
        <Form login={login}></Form>
    </div>
    </>
  )
}

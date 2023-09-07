import React from 'react'
import Form from '../Form/Form'
import style from './LandingPage.module.css'
import Logo from '../../assets/logo.png'

export default function LandingPage({ login }) {
  return (
    <>
    <div className={style.logo}>
        <img src={Logo}></img>
      </div>
    <div className={style.container}>
        <Form login={login}></Form>
    </div>
    </>
  )
}
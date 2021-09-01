import React from 'react'
import Directory from '@/components/directory/Directory'

// import './HomePage.scss'

import { HomePageContainer } from './HomePage.styles.jsx'

const HomePage = () => (
  <HomePageContainer>
    <h1>Welcome to my Homepage</h1>
    <Directory />
  </HomePageContainer>
)

export default HomePage

import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WelcomeJoke from './Components/WelcomeJoke';
import JokesArea from "./Components/JokesArea"

export default class App extends Component {
  render() {
    return (
      <>


        <BrowserRouter>

          <Routes>
            <Route path="/" element={<WelcomeJoke />} />
            <Route path="/jokearea" element={<JokesArea />} />
          </Routes>

        </BrowserRouter>

      </>
    )
  }
}


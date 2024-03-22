import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from "../JokesArea/index.module.css"
import { motion } from "framer-motion"
import joke from "../../assets/images/joke.png"
import arrowUp from "../../assets/images/up-arrow.png"
import arrowDown from "../../assets/images/down-arrow.png"
import axios from 'axios'
import { baseUrl } from "../../Services/Constants/baseUrl"


export default class JokesArea extends Component {

  constructor() {
    super();

    this.state = {
      jokesData: [],
    }
  }

  componentDidMount() {
    axios.get(baseUrl, {
      headers: {
        "Accept": "application/json"
      }
    })
      .then(response => {
        let newJokes = response.data.results
        let jokeData = newJokes.map(joke => {
          let newJokeData = { ...joke, voteCount: 0, isColor: "" }
          return newJokeData
        })
        this.setState({ jokesData: jokeData })
      }

      )
  }


  createCard = () => {
    const { jokesData } = this.state

    return jokesData.map((joke) => (
      <motion.div key={joke.id} className={styles["jokes-cards"]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles["joke-card"]} >
          <div className={styles["vote-counter"]}>
            <button onClick={() => this.decreaseVote(joke.id)} ><img src={arrowDown} alt="downArrow" /></button>
            <span className={!joke.isColor ? styles["vote-count"] : joke.isColor === "yellowgreen" ? styles["vote-md-count"] : joke.isColor === "green" ? styles["vote-hg-count"] : joke.isColor === "red" ? styles["vote-count"] : null}>{joke.voteCount}</span>
            <button onClick={() => this.increaseVote(joke.id)} ><img src={arrowUp} alt="downArrow" /></button>
          </div>
          <div>
            <p>{joke.joke}</p>
          </div>
        </div>
      </motion.div >
    ))

  }

  decreaseVote = (id) => {
    const { jokesData } = this.state

    jokesData.map((joke, index) => {
      if (joke.id === id) {
        if (joke.voteCount >= 1) {
          joke.voteCount--
        }
        if (joke.voteCount <= 6 && joke.voteCount >= 3) {
          joke.isColor = "yellowgreen"
        } else if (joke.voteCount < 3) {
          joke.isColor = "red"
        }
        jokesData[index] = joke
        this.setState({ jokesData })
      }

    })

    jokesData.sort((a, b) => b.voteCount - a.voteCount)



  }


  increaseVote = (id) => {
    const { jokesData } = this.state

    jokesData.map((joke, index) => {
      if (joke.id === id) {
        joke.voteCount++
        if (joke.voteCount >= 3 && joke.voteCount <= 6) {
          joke.isColor = "yellowgreen"
        } else if (joke.voteCount > 6) {
          joke.isColor = "green"
        }
        jokesData[index] = joke
        this.setState({ jokesData })
        console.log(this.state);
      }

    })

    jokesData.sort((a, b) => b.voteCount - a.voteCount)

  }


  render() {

    const { jokesData } = this.state

    return (
      <>
        <motion.div className={styles.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={styles["jokes-bg"]}>

            <div className={styles["left-jokes"]}>
              <div>Jokes World</div>
              <img src={joke} alt="joke" />
              <Link to="/">Back To Main Page</Link>
            </div>

          </div>
          <div className={styles["jokes-container"]}>

            {jokesData.length === 0 ? <h1 style={{ textAlign: "center", fontSize: "60px", color: "red" }}>Loading...</h1> : this.createCard()}

          </div>
        </motion.div>

      </>

    )
  }
}

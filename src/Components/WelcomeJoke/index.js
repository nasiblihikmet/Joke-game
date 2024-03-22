import React, { Component } from 'react';
import styles from "../WelcomeJoke/index.module.css";
import { Link } from 'react-router-dom'
import jokeLogo from "../../assets/images/jokeLogo.png"
import { motion } from "framer-motion"

export default class WelcomeJoke extends Component {
    render() {
        return (
            <>
                <motion.div className={styles.container}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                >

                    <div className={styles["center-container"]}>

                        <div className={styles["welcome-container"]}>
                            <img src={jokeLogo} alt="jokeLogo" />
                            <div>Welcome To Joke World!</div>
                            <Link to="jokearea" className={styles["joke-btn"]}>Go To Joke</Link>
                        </div>

                    </div>

                </motion.div>

            </>
        )
    }
}

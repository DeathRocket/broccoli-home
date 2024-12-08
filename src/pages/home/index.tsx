import React from "react";
import styles from "./index.module.css";
import SendEmailModal from "./SendEmailModal";

const Home = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>BROCCOLI & CO.</header>
      <div className={styles.content}>
        <h1>
          A better way <br />
          to enjoy every day
        </h1>
        <div>Be the first to know when we launch</div>
        <SendEmailModal/>
      </div>
      <footer className={styles.footer}>
        Made with ❤️ in Melbourne.
        <br />© 2016 Broccoli & Co. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

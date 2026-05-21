import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import vector from "./Vector.png";

export const Box = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const currentDate = new Date();

      const formattedDate = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(currentDate);

      setCurrentDateTime(formattedDate);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.group}>
        <div className={styles.overlapGroup}>
          <div className={styles.overlap}>
            <div className={styles.textWrapperContainer}>
              <div className={styles.textWrapper}>Welcome, Administrator!</div>
              <img className={styles.vector} alt="Vector" src={vector} />
            </div>
            <div className={styles.timeDate}>{currentDateTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

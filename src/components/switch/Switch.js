import React from "react";
import { motion } from "framer-motion";
import "../../styles.css";

const styles = {
  switch: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    width: "10rem",
    height: "4rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "2.5rem",
    cursor: "pointer"
  },
  track: {
    margin: ".5rem",
    height: "3rem",
    width: "3rem",
    backgroundColor: "#2070AE",
    borderRadius: "1.5rem"
  }
};

const Switch = ({ on = false, toggle }) => {
  const switchRef = React.useRef(null);

  return (
    <motion.div
      ref={switchRef}
      onClick={(e) => {
        e.stopPropagation();
        console.log("on click called");
        toggle((on) => !on);
      }}
      className={(on ? "on" : "off") + " mb-4"}
      style={{ ...styles.switch }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        drag={"x"}
        dragElastic={0}
        onDragEnd={(e, { offset: { x } }) => {
          if (x > 0) {
            if (!on) {
              toggle(true);
            }
          } else {
            if (on) toggle(false);
          }
        }}
        dragConstraints={switchRef}
        key={"toggle"}
        layout
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 700,
          duration: 0.8
        }}
        whileHover={{
          backgroundColor: "#0C3974",
          scale: 0.9,
          cursor: "pointer"
        }}
        style={styles.track}
      />
    </motion.div>
  );
};

export default Switch;

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "../../data";
import { wrap } from "@popmotion/popcorn";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

export const ExampleCarousal = () => {
  const [[page, direction], setPage] = React.useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className="row   justify-content-center overflow-hidden">
        <div
          style={{
            width: 700
          }}
          className="carousal-controls  col-12 d-flex my-4 justify-content-between"
        >
          <motion.span
            onTap={() => paginate(-1)}
            whileHover={{
              scale: 0.9,
              cursor: "pointer"
            }}
            class="material-icons"
          >
            arrow_back_ios
          </motion.span>

          <motion.span
            onTap={() => paginate(1)}
            whileHover={{
              scale: 0.9,
              cursor: "pointer"
            }}
            class="material-icons"
          >
            arrow_forward_ios
          </motion.span>
        </div>
        <AnimatePresence exitBeforeEnter={true} custom={direction}>
          <motion.img
            layout
            key={page}
            width={700}
            height={400}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            className="overflow-hidden"
            transition={{
              opacity: {
                duration: 0.2
              },
              type: "tween"
            }}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </AnimatePresence>
      </div>
    </>
  );
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

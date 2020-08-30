import React from "react";
import "./styles.css";
import { SharedLayoutExampleList } from "./components/list/List";
import { ExampleCarousal } from "./components/Carousal/Carousal";
import Switch from "./components/switch/Switch";
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion";

export default function App() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const containerRef = React.useRef(null);

  return (
    <AnimateSharedLayout>
      <div ref={containerRef} className="bg-light container-fluid">
        <div className="row justify-content-center my-5 overflow-hidden">
          <motion.h4
            initial={{
              y: -100
            }}
            animate={{
              y: 0
            }}
            whileTap={{
              scale: 0.9,
              zIndex: 2,
              textShadow: "1px 1px 2px #5FB81B",
              color: "#5FB81B"
            }}
            drag="x"
            dragConstraints={containerRef}
            whileHover={{
              cursor: "pointer",
              color: "#FF6026"
            }}
            className="col-12 text-center mb-5"
          >
            Layout Animation example
          </motion.h4>
          <Switch on={isSwitchOn} toggle={setIsSwitchOn} />
        </div>
        <motion.div
          layout
          className="row overflow-hidden justify-content-center my-5 position-relative"
        >
          <motion.h4 className="col-12 text-center mb-5">
            Shared layout example
          </motion.h4>
          <AnimatePresence>
            {isSwitchOn && <SharedLayoutExampleList />}
          </AnimatePresence>
        </motion.div>
        <motion.div layout className="row justify-content-center my-5">
          <h4 className="col-12 text-center">Animate Presence layout</h4>
          <div className="col-12">
            <ExampleCarousal />
          </div>
        </motion.div>
      </div>
    </AnimateSharedLayout>
  );
}

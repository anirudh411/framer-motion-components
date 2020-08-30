import React from "react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { spring } from "../util";

const container = {
  enter: {
    opacity: 1,
    transition: {
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      delay: 0.3,
      when: "afterChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariant = {
  enter: {
    opacity: 1,
    y: 0
  },
  exit: { opacity: 0, y: -500 }
};

const styles = {
  box: {
    borderRadius: ".5rem",
    cursor: "pointer",
    position: "relative",
    width: "7rem",
    margin: "0 1rem",
    height: "3rem"
  }
};

export const SharedLayoutExampleList = ({
  items = ["#FF5A35", "#4E96FC", "#FFDA43", "#3366FF", "#C0F8B1"]
}) => {
  const [selectedItem, setSelectedItem] = React.useState(items[0]);
  return (
    <AnimateSharedLayout>
      <div className="w-100 d-flex justify-content-sm-center">
        <select
          className="w-25 form-control ml-5 mb-4"
          placeholder="Choose box"
          onChange={(e) => {
            setSelectedItem(e.target.value);
          }}
          value={selectedItem}
          defaultValue={selectedItem}
        >
          {items.map((item, index) => (
            <option value={item}>{index + 1}</option>
          ))}
        </select>
      </div>
      <motion.ul
        key={"box-list"}
        className="nav mb-4 justify-content-center"
        variants={container}
        initial="exit"
        animate="enter"
        exit="exit"
      >
        {items.map((item, index) => (
          <Item
            item={item}
            setSelectedItem={setSelectedItem}
            key={index}
            selectedItem={selectedItem}
          />
        ))}
      </motion.ul>
    </AnimateSharedLayout>
  );
};

const Item = ({ setSelectedItem, selectedItem, item }) => {
  return (
    <motion.li
      onClick={() => setSelectedItem(item)}
      className="nav-item my-4"
      style={{
        ...styles.box,
        backgroundColor: item
      }}
      variants={itemVariant}
    >
      {selectedItem && selectedItem === item && (
        <motion.div
          layoutId={"outline"}
          initial={false}
          animate={{
            borderColor: selectedItem
          }}
          transition={{
            ...spring
          }}
          className="outline"
        />
      )}
    </motion.li>
  );
};

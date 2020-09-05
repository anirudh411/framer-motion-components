import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  useLocation
} from "react-router-dom";
import App from "./App";
import { About } from "./About";
import { AnimatePresence, motion } from "framer-motion";

function Navigation() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <Link to="" className="text-decoration-none nav-item active">
              Home
            </Link>
            <Link to="about" className="nav-item">
              Link
            </Link>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

function AnimatedRoute(props) {
  const location = useLocation();

  return (
    <AnimatePresence>
      <motion.div
        key={location.key}
        intial={{ opacity: 0, x: "-100vw" }}
        animate={{
          opacity: 1,
          x: 0
        }}
        exit={{
          x: "100vw",
          opacity: 0
        }}
      >
        <Route {...props} />
      </motion.div>
    </AnimatePresence>
  );
}

export function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Navigation />}>
            <AnimatedRoute path="/" element={<App />} />
            <AnimatedRoute path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

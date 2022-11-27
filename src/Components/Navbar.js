import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InstructionsHead, NavStyles } from "./NavbarCss";
import { motion, useAnimation } from "framer-motion";
function Navbar() {
  const controls = useAnimation();
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  return (
    <NavStyles>
      <h1>Photo Tagging App</h1>
      <Link to="/#Inst">
        <InstructionsHead
          as={motion.div}
          onHoverStart={() => {
            if (!isAnimationPlaying) {
              setIsAnimationPlaying(true);
              controls.start({
                rotate: [0, 7, -7, 0],
                transition: {
                  duration: 0.4,
                  ease: "easeInOut",
                  repeatDelay: 1,
                },
              });
            }
          }}
          animate={controls}
          onAnimationComplete={() => {
            setIsAnimationPlaying(false);
          }}
        >
          How to Play
        </InstructionsHead>
      </Link>
    </NavStyles>
  );
}

export default Navbar;

import { GiDuration } from "react-icons/gi";

export const textanimate = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
export const findyours = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0,      repeat: Infinity,   repeatType: "loop" 
    }
  };

  export const CardAnimation = {
    initial: {
      y: 10,
      opacity: 0,
    },
    animate: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4 * index,
      },
    }),
  };

  export const testimonialAnimation = {
    initial: {
      x: 100,
      opacity: 0,
    },
    animate:{
      x: 0,
      opacity: 1,
    },
  };

  export const exploreAnimation = {
    initial: {
      scale:0.5,
      opacity: 0,
    },
    animate:{
      scale: 1,
      opacity: 1,
      duration:0.2,
    },
  };

  export const recentAnimation = {
    initial: {
      x: 10,
      opacity: 0,
    },
    animate: (index) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.3 * index,
      },
    }),
  };

  export const freeplanAnimation = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  export const premiumplanAnimation = {
    initial: {
       scale:0,
        opacity: 0,
    },
    animate:{
      scale: 1,
      opacity: 1,
    },
  };


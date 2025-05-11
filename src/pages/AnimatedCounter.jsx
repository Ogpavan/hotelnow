import { React, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const AnimatedCounter = ({ start, end, duration = 2000, label }) => {
  const [isInView, setIsInView] = useState(false);

  const { number } = useSpring({
    number: isInView ? end : start,
    from: { number: start },
    config: { duration: duration },
  });

  const handleScroll = () => {
    const rect = document.getElementById(label).getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      setIsInView(true);
      window.removeEventListener("scroll", handleScroll);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id={label}
      className="flex items-center justify-center space-x-3 mb-8 flex-col sm:flex-row"
    >
      <animated.div className="text-4xl font-semibold text-[#00264d]">
        {number.to((n) => n.toFixed(0))}
      </animated.div>
      <span className="text-lg text-gray-600">{label}</span>
    </div>
  );
};

export default AnimatedCounter;

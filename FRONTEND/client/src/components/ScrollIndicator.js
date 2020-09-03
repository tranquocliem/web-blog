import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

function ScrollIndicator() {
  const { y } = useWindowScroll();
  const [scrolled, setScrolled] = useState(0);
  useEffect(() => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setScrolled((y / height) * 100);
  }, [y]);
  return (
    <>
      <div id="progressbar" style={{ width: `${scrolled}%` }}></div>
      {/* <div id="scrollPath"></div> */}
    </>
  );
}

export default ScrollIndicator;

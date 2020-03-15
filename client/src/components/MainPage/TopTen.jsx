import React, { useEffect } from "react";
import MostActive from "./MostActive.jsx";
import TopGainers from "./TopGainers.jsx";
const TopTen = ({ mostActive, topGainers, topTenData }) => {
  useEffect(() => {
    topTenData();
  }, []);

  return (
    <div className="topten-holder topten mainpage-content">
      <div className="topten most-active">
        <MostActive mostActive={mostActive} />
      </div>
      <div className="topten top-gainers">
        <TopGainers topGainers={topGainers} />
      </div>
    </div>
  );
};

export default TopTen;

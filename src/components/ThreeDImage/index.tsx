import React from 'react';

import './index.css';

const ThreeDImage: React.FC<{}> = () => {
  return (
    <div>
      <div className="xz">
        <div className="wrap">
          <div className="cube">
            <div className="out_front">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdjSud.jpg"
                className="pic"
              />
            </div>
            <div className="out_back">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdXvge.jpg"
                className="pic"
              />
            </div>
            <div className="out_left">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdXxjH.jpg"
                className="pic"
              />
            </div>
            <div className="out_right">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdjSud.jpg"
                className="pic"
              />
            </div>
            <div className="out_top">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdjiUP.jpg"
                className="pic"
              />
            </div>
            <div className="out_bottom">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdjSud.jpg"
                className="pic"
              />
            </div>

            <span className="in_front">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdjSud.jpg"
                className="in_pic"
              />
            </span>
            <span className="in_back">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdjSud.jpg"
                className="in_pic"
              />
            </span>
            <span className="in_left">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdXvge.jpg"
                className="in_pic"
              />
            </span>
            <span className="in_right">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdXxjH.jpg"
                className="in_pic"
              />
            </span>
            <span className="in_top">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdXxjH.jpg"
                className="in_pic"
              />
            </span>
            <span className="in_bottom">
              <img
                src="https://z3.ax1x.com/2021/11/11/IdjiUP.jpg"
                className="in_pic"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDImage;


import React from 'react';
import {BeatLoader} from "react-spinners";

export default (props) => {

  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
        <BeatLoader
            size={35}
            color={"#4A5073"}
            loading={show}
        />
      {/*<Image className="loader-element animate__animated animate__jackInTheBox" src={ReactLogo} height={40} />*/}
    </div>
  );
};

import { ethers } from "ethers";
import React, { useState, useContext } from "react";
import { Context } from "../context/ContextProvider";
import Tabs from "./Tabs";

const Connect = () => {
  const { isConnected, connectWallet,  } = useContext(Context);
  const style = {
    // width: "100vw",
    height: "90vh",
  };

  return (
    <div className="Center" style={style}>
      {!isConnected ? (
        <button className="button-64" role="button" onClick={connectWallet}>
          <span className="text">Connect</span>
        </button>
      ) : (
        <Tabs />
      )}
    </div>
  );
};

export default Connect;

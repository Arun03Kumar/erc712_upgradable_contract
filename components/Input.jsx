import React, { useContext, useState } from "react";
import { Context } from "../context/ContextProvider";
import { useRouter } from "next/router";

const Input = () => {
  const { retrieve, sendTran, setTransaction, signTransaction } =
    useContext(Context);
  const [Output, setOutput] = useState(0);
  const [formInput, setformInput] = useState("");
  const router = useRouter();

  const Transaction = async () => {
    await sendTran();
  };

  const setTrans = async () => {
    if (router.pathname === "/erc712") {
      await signTransaction(formInput);
    } else {
      await setTransaction(formInput);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button
          type="text"
          className="submit"
          style={{
            marginLeft: "55px",
            backgroundColor: "#82CD47",
            color: "black",
          }}
          onClick={() => setOutput(retrieve)}
        >
          Retrieve
        </button>
        <span> : {Output}</span>
      </div>
      <button
        type="text"
        className="submit"
        style={{
          marginLeft: "55px",
          marginTop: "10px",
          backgroundColor: "#82CD47",
          color: "black",
        }}
        onClick={Transaction}
      >
        Increment
      </button>
      <div className="form" style={{ marginTop: "30px" }}>
        <div className="input-container ic1">
          <input
            id="firstname"
            className="input"
            type="text"
            placeholder=" "
            onChange={(e) => setformInput(e.target.value)}
          />
        </div>
        <button type="text" className="submit" onClick={setTrans}>
          Transact
        </button>
      </div>
    </div>
  );
};

export default Input;

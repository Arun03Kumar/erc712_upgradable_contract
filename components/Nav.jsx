import React, {useContext, useState} from 'react'
import { Context } from "../context/ContextProvider";
import Link from 'next/link';
import { useRouter } from 'next/router';


const Nav = () => {
  const {walletAddress, isConnected} = useContext(Context)
  const [Active, setActive] = useState("one")
  const add = walletAddress.slice(0, 6) + "....." + `${walletAddress.slice(walletAddress.length - 5, walletAddress.lenght)}`



  const style = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: "80px",
    marginTop: "30px"
  }
  return (
    <>
    {isConnected ? (<div style={style}>
      <div style={{ marginLeft: "80px", color: "#82CD47" }}>
        <ul>
          <li
            className={`${Active === "one" ? "active" : ""}`}
            onClick={() => setActive("one")}
          >
            <Link href="/no_erc712">without ERC-712</Link>
          </li>
          <li
            className={`${Active === "two" ? "active" : ""}`}
            onClick={() => setActive("two")}
          >
            <Link href="/erc712">ERC-712</Link>
          </li>
        </ul>
      </div>
      <h2>{add || "Nav"}</h2>
    </div>) : <div></div>}
    </>
  );
}

export default Nav
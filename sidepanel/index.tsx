import logo from "data-base64:~assets/logo.svg"
import { useState } from "react"
import { FaBeer } from "react-icons/fa"

import "../style.css"

function IndexSidePanel() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
      }}
    >
      <img src={logo} alt="Some pretty cool image" />

      <FaBeer className="text-6xl text-red-300" />
      <h2>
        Welcome to your
        <a href="https://www.plasmo.com" target="_blank">
          {" "}
          Plasmo 123
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexSidePanel

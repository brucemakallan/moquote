import logo from "data-base64:~assets/logo.svg"
import { useState } from "react"
import { FaBeer } from "react-icons/fa"

import "../style.css"

function IndexSidePanel() {
  const [data, setData] = useState("")

  return (
    <div className="flex flex-col gap-5 p-5">
      <img src={logo} alt="Some pretty cool image" className="w-24" />

      <FaBeer className="text-2xl text-red-300" />
      <h1>Welcome to your extension</h1>
      <h2>Welcome to your extension</h2>
      <h3>Welcome to your extension</h3>
      <h4>Welcome to your extension</h4>
      <h5>Welcome to your extension</h5>
      <h6>Welcome to your extension</h6>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
        <a href="https://docs.plasmo.com" target="_blank">
          View Docs
        </a>
      </p>
    </div>
  )
}

export default IndexSidePanel

import logo from "data-base64:~assets/logo.svg"
import { useEffect, useState } from "react"
import { FaBeer } from "react-icons/fa"

import "../style.css"

import { Button } from "~components/ui/button"
import { supabase } from "~core/supabase"

function IndexSidePanel() {
  const [data, setData] = useState([])

  useEffect(() => {
    const getURATaxes = async () => {
      const res = await supabase.from("ura_taxes").select("*")
      if (res.error) {
        console.error(res.error)
      } else {
        setData(res.data)
      }
    }

    getURATaxes()
  }, [])

  return (
    <div className="flex flex-col gap-4 p-5">
      <Button variant="default">Click me</Button>
      <Button variant="destructive" isLoading>
        Click me
      </Button>
      <Button variant="outline" isLoading>
        Click me
      </Button>
      <Button variant="ghost" isLoading>
        Click me
      </Button>
      <Button variant="link" isLoading>
        Click me
      </Button>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum. <a href="#">More details</a>
      </p>

      {data?.map((row) => (
        <div key={row.id} className="flex flex-col gap-5">
          <p>{row.modal_code}</p>
          <p>{row.registration_year}</p>
          <p>{row.engine_size}</p>
          <p>{row.usd}</p>
        </div>
      ))}
    </div>
  )
}

export default IndexSidePanel

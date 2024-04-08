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
    <div className="p-5">
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

import logo from "data-base64:~assets/logo.svg"
import { useEffect, useState } from "react"

import "../style.css"

import { BsCoin } from "react-icons/bs"
import { GiMoneyStack } from "react-icons/gi"
import { MdOutlineNumbers } from "react-icons/md"
import { PiEngine } from "react-icons/pi"
import { RxCalendar } from "react-icons/rx"

import { Button } from "~components/ui/button"
import { InfoCard } from "~components/ui/InfoCard"
import { supabase } from "~core/supabase"

function SidePanel() {
  // useEffect(() => {
  //   const getURATaxes = async () => {
  //     const res = await supabase.from("ura_taxes").select("*")
  //     if (res.error) {
  //       console.error(res.error)
  //     } else {
  //       setData(res.data)
  //     }
  //   }

  //   getURATaxes()
  // }, [])

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4">
      <img
        src="https://picsum.photos/id/237/600/600"
        alt="Vehicle"
        className="w-full h-[300px] object-cover rounded-b-3xl"
      />
      <div className="flex gap-4 flex-wrap px-4">
        <InfoCard Icon={RxCalendar} heading="Year" value="2024" className="grow" />
        <InfoCard Icon={PiEngine} heading="Capacity" value="2000 cc" className="grow" />
        <InfoCard Icon={MdOutlineNumbers} heading="Modal" value="ABA-5NCCZ" className="grow" />
        <InfoCard Icon={GiMoneyStack} heading="Price" value="USD 6,000" hint="(UGX 23,800,000)" className="w-full" />
        <InfoCard
          Icon={BsCoin}
          variant="accent"
          heading="URA TAXES"
          value="USD 7,000"
          hint="(UGX 27,900,000)"
          className="w-full"
        />
      </div>
    </div>
  )
}

export default SidePanel

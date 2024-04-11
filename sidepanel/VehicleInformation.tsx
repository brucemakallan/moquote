import { BsCoin } from "react-icons/bs"
import { GiMoneyStack } from "react-icons/gi"
import { MdOutlineNumbers } from "react-icons/md"
import { PiEngine } from "react-icons/pi"
import { RxCalendar } from "react-icons/rx"

import { InfoCard } from "~components/ui/InfoCard"

interface Props {}

export function VehicleInformation(props: Props) {
  return (
    <div className="flex gap-4 flex-wrap p-4">
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
  )
}

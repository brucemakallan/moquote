import { Loader2 } from "lucide-react"
import { IoShareSocialSharp } from "react-icons/io5"

import { Button } from "~components/ui/button"

export function ImageSection({ src }: { src: string }) {
  return (
    <div className="grid w-full h-[300px]">
      <div className="row-start-1 col-start-1 w-full h-[300px] flex items-center justify-center z-0">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
      <div className="row-start-1 col-start-1 w-full z-10">
        <img
          src={src}
          alt="Vehicle"
          className="w-full h-[300px] object-cover rounded-b-3xl"
        />
      </div>
      <div className="row-start-1 col-start-1 flex justify-end w-full z-20">
        <div className="w-12 h-12 bg-black rounded-bl-3xl p-3">
          <Button
            variant="ghost"
            size="icon"
            className="w-full h-full hover:bg-transparent"
          >
            <IoShareSocialSharp className="w-10 h-10 text-secondary-base" />
          </Button>
        </div>
      </div>
    </div>
  )
}

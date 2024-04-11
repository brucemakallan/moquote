import { IoShareSocialSharp } from "react-icons/io5"

import { Button } from "~components/ui/button"

export function ImageSection() {
  return (
    <div className="grid w-full h-[300px]">
      <div className="row-start-1 col-start-1 w-full">
        <img
          src="https://picsum.photos/id/237/600/600"
          alt="Vehicle"
          className="w-full h-[300px] object-cover rounded-b-3xl"
        />
      </div>
      <div className="row-start-1 col-start-1 flex justify-end w-full">
        <div className="w-12 h-12 bg-black rounded-bl-3xl p-3">
          <Button variant="ghost" size="icon" className="w-full h-full hover:bg-transparent">
            <IoShareSocialSharp className="w-10 h-10 text-secondary-base" />
          </Button>
        </div>
      </div>
    </div>
  )
}

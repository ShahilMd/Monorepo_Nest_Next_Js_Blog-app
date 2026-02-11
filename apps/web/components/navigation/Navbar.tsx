import Image from "next/image"
import { ModeToggle } from "./ModeToggle"
import { SearchBox } from "./SearchBox"
import { Button } from "../ui/button"



function Navbar() {
  return (
    <div>
        <div className="flex items-center justify-between">
            <p>postra</p>
            <div className="flex gap-2">

            <SearchBox/>
            <ModeToggle/>
           <Button variant={"ghost"}>
            login
           </Button>
           <Button variant={"default"}>
            Get started
           </Button>
            </div>
        </div>
    </div>
  )
}

export default Navbar
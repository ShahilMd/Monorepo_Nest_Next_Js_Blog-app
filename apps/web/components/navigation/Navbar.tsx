"use client"

import Image from "next/image"
import { ModeToggle } from "./ModeToggle"
import { Button, buttonVariants } from "../ui/button"
import {motion} from "motion/react"



function Navbar() {
  return (
    <div>
        <div className="flex items-center justify-between">
            <p>postra</p>
            <div className="flex gap-2 items-center">
              <motion.p className="px-2 py-1 rounded-lg">
                Our story
              </motion.p>
              <p className="px-2 py-1 rounded-lg">
                Blogs
              </p>

          <Button variant={"default"}>
            Get started
           </Button>
           <Button variant={"ghost"}>
            login
           </Button>
           <ModeToggle/>
            </div>
        </div>
    </div>
  )
}

export default Navbar
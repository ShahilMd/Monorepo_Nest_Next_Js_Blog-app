import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBox() {
  return (
    <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button><Search /></Button>
    </Field>
  )
}

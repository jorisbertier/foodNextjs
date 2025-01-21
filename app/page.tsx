"use client"
 
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IFood, IFoodReduced } from "./interface"

export default function Home() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [foods, setFoods] = React.useState<IFoodReduced[]>([])

  const fetchFoods = async () => {
    try {
      const response = await fetch('/api/food/all')
      const data = await response.json()
      const dataReduce: IFoodReduced[] = data.map((item: IFood) => ({
        value: item.name.replace(/ /g,"-"),
        label: item.name,
      }))
      setFoods(dataReduce)

    } catch(e) {
      console.log('Error getting fetch food data', e)
    }
  }

  React.useEffect(() => {
    const initialFetch = async() => {
      await fetchFoods()
    }
    initialFetch()
  }, [])
  
console.log(value)
  return (
    <div className="w-full justify-center flex h-screen -mt-40 items-center">
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? foods.find((framework) => framework.value === value)?.label
            : "Select a food..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search food..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {foods.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </div>
  )

}

import { format, addDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { DateRange } from "react-day-picker"
import { cn } from "~/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"

export function DatePicker({ id }: { id: string }) {
  const [date, setDate] = useState<Date>()

  return (
    <>
      <input hidden name={id} value={date?.toISOString()} readOnly />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
        >
          {/* <Select
            onValueChange={(value: string) =>
              setDate(addDays(new Date(), parseInt(value)))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select> */}
          <div className="rounded-md border">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </PopoverContent>
      </Popover>
    </>

  )
}


export function DatePickerWithRange({
  className,
  startDate,
  rangeDays,
  id,
}: {
  id?: string
  className?: string
  startDate?: Date
  rangeDays?: number
}) {
  const today = new Date();
  const startRange = startDate ?? today;
  const days = rangeDays ?? 5;

  const [date, setDate] = useState<DateRange | undefined>({
    from: startRange,
    to: addDays(today, days),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <input
        type="hidden"
        name={`${id}from`}
        value={date?.from?.toJSON()}
      />
      <input
        type="hidden"
        name={`${id}to`}
        value={date?.to?.toJSON()}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            id={id}

            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function DateRangeField({
  className,
  error,
  label,
  id,
  startDate,
  rangeDays,
}: {
  label: string
  id: string
  error?: string
  className?: string
  startDate?: Date
  rangeDays?: number
}) {

  return <div className="grid grid-cols-1 gap-2 pb-1 md:grid-cols-4 md:items-center md:gap-4">
    <span className="text-left md:text-right">{label}</span>
    <DatePickerWithRange
      id={id}
      className={className}
      startDate={startDate}
      rangeDays={rangeDays}
    />
    {
      error && <div className="col-span-4 text-red-500 flex flex-row justify-end">
        <p>
          {error}
        </p>
      </div>
    }
  </div>
}
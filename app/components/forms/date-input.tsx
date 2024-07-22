import { useState } from "react";
import { format, isValid, parse } from "date-fns";
import { DayPicker, getDefaultClassNames, } from "react-day-picker";
import calendarStyles from "react-day-picker/style.module.css";

/** Render an input field bound to a DayPicker calendar. */
export function DateInput({ inputId }: { inputId: string }) {
  const defaultClassNames = getDefaultClassNames();

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date());

  // Hold the selected date in state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Hold the input value in state
  const [inputValue, setInputValue] = useState("");

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setInputValue(format(date, "MM/dd/yyyy"));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // keep the input value in sync

    const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <div>
      <label htmlFor={inputId}>
        <strong>Date: </strong>
      </label>
      <input
        style={{ fontSize: "inherit" }}
        id={inputId}
        name={inputId}
        type="text"
        value={inputValue}
        placeholder="MM/dd/yyyy"
        onChange={handleInputChange}
      />
      <DayPicker
        month={month}
        onMonthChange={setMonth}
        mode="single"
        selected={selectedDate}
        onSelect={handleDayPickerSelect}
        footer={`Selected: ${selectedDate?.toDateString()}`}
        classNames={{
          ...calendarStyles,
          today: 'border border-blue-500 border-2',
        }}
      />
    </div>
  );
}
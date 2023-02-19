import React from "react";

type dayProps = {
  completed: boolean;
  uncompleted: boolean;
  weekDay: string;
  dayNumber: number;
};

export default function Day({
  completed,
  uncompleted,
  weekDay,
  dayNumber,
}: dayProps) {
  return (
    <div>
      <div>
        <span>{weekDay}</span>
        <span>{dayNumber}</span>
      </div>
      <div>
        <span>{completed}</span>
        <span>{uncompleted}</span>
      </div>
    </div>
  );
}

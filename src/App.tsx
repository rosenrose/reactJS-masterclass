import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { minuteState, hourSelector } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const onMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(Number(event.currentTarget.value));
  };

  const [hours, setHours] = useRecoilState(hourSelector);
  const onHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHours(Number(event.currentTarget.value));
  };

  return (
    <>
      <input type="number" value={minutes} onChange={onMinutesChange} placeholder="Minutes" />
      <input type="number" value={hours} onChange={onHoursChange} placeholder="Hours" />
    </>
  );
}

export default App;

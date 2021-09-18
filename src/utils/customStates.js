import { useState } from "react";

export function useFormState(initialVal) {
  const [val, stateSetVal] = useState(initialVal);
  const [err, setErr] = useState("");

  function setVal(newVal) {
    stateSetVal(newVal);
    setErr("");
  }

  return { val, setVal, err, setErr };
}

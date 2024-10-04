import { useEffect, useState } from "react";

type WindowEvent = "focus" | "blur";

export function useWindowFocus() {
  const [isFocused, setIsFocused] = useState(true);

  function changeFocusValue(type: WindowEvent) {
    return () => {
      console.log("event", { type, isFocused: type === "focus" });
      setIsFocused(type === "focus");
    };
  }

  const events: WindowEvent[] = ["focus", "blur"];

  useEffect(() => {
    for (const event of events) {
      window.addEventListener(event, changeFocusValue(event));
    }

    return () => {
      for (const event of events) {
        window.removeEventListener(event, changeFocusValue(event));
      }
    };
  }, []);

  return { isFocused };
}

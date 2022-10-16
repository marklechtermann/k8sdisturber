import { PaletteMode } from "@mui/material";
import { useState } from "react";

export default function useTheme(): [PaletteMode, Function] {
  const getValue = () => {
    let themeColor = window.localStorage.getItem("themeColor");
    if (themeColor != "dark" && themeColor != "light") {
      themeColor = "light";
    }

    return themeColor as PaletteMode;
  };

  const setValue = (value: PaletteMode) => {
    window.localStorage.setItem(
      "themeColor",
      getValue() == "light" ? "dark" : "light"
    );
  };

  const [themeColor, setThemeColor] = useState<PaletteMode>(getValue());

  return [
    themeColor,
    () => {
      setValue(getValue() == "light" ? "dark" : "light");
      setThemeColor(getValue());
    },
  ];
}

// // src/components/theme/ThemeProvider.tsx

// // Import React and ThemeProvider from "next-themes"
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

// Define your ThemeProvider component
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}> {children} </NextThemesProvider>;
}

import { useEffect } from "react";

export const useDevToolsEasterEgg = () => {
  useEffect(() => {
    const style1 =
      "background: #C5F82A; color: #0B0C10; font-family: monospace; font-size: 14px; font-weight: bold; padding: 4px 8px; border: 2px solid #0B0C10;";
    const style2 =
      "color: #C5F82A; font-family: monospace; font-size: 12px; font-weight: bold;";
    const style3 = "color: #E0E0E0; font-family: monospace; font-size: 10px;";

    console.clear();
    console.log("%c SYSTEM: ACCESS GRANTED ", style1);
    console.log("%c > Initializing Davies_Ajayi.OS... DONE", style2);
    console.log("%c > Security Bypassed. Welcome, Engineer.", style2);
    console.log("");
    console.log(
      "%c -------------------------------------------------- ",
      style3,
    );
    console.log("%c Interested in how this was built? ", style3);
    console.log("%c Reach out: daviesajayi7@gmail.com ", style2);
    console.log(
      "%c -------------------------------------------------- ",
      style3,
    );
  }, []);
};

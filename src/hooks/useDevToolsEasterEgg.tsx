import { useEffect } from "react";

export const useDevToolsEasterEgg = () => {
  useEffect(() => {
    const style1 =
      "background: #B9F542; color: #0D0F12; font-family: monospace; font-size: 14px; font-weight: bold; padding: 4px 8px;";
    const style2 =
      "color: #B9F542; font-family: monospace; font-size: 12px; font-weight: bold;";
    const style3 = "color: #ECE7DC; font-family: monospace; font-size: 10px;";

    console.clear();
    console.log("%c Davies Ajayi / Portfolio ", style1);
    console.log(
      "%c Built with React, TypeScript, and a fondness for tidy systems.",
      style2,
    );
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

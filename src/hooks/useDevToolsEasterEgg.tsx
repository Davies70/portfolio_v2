import { useEffect } from "react";

// 1. Tell TypeScript that we are adding a custom 'sudo' object to the global Window
declare global {
  interface Window {
    sudo: {
      hire: () => string;
    };
  }
}

export const useDevToolsEasterEgg = () => {
  useEffect(() => {
    // 2. Define the styling for our console messages to match your brand
    const brandColor = "#C5F82A"; // Your neon green
    const styleTitle = `color: ${brandColor}; font-size: 20px; font-weight: bold; font-family: monospace; border-bottom: 2px solid ${brandColor}; padding-bottom: 4px;`;
    const styleText =
      "color: #E0E0E0; font-size: 14px; font-family: monospace;";
    const styleCommand = `color: #0B0C10; background-color: ${brandColor}; font-size: 14px; font-family: monospace; padding: 2px 6px; border-radius: 4px; font-weight: bold;`;

    // 3. Print the welcome message when the app loads
    console.log("%c[SYS.CONNECTION_ESTABLISHED]", styleTitle);
    console.log(
      "%cAh, a fellow developer! F12 is always the first thing I press, too.",
      styleText,
    );
    console.log(
      "%cIf you're inspecting my code, we should probably work together.",
      styleText,
    );
    console.log(
      `%cType %csudo.hire()%c in this console to download my resume.`,
      styleText,
      styleCommand,
      styleText,
    );

    // 4. Bind the 'sudo' object to the global window
    window.sudo = {
      hire: () => {
        console.log(
          `%c[SYSTEM] Initializing resume download...`,
          `color: ${brandColor}; font-family: monospace;`,
        );

        // Programmatically trigger a file download
        const link = document.createElement("a");
        // UPDATE THIS PATH: Make sure your PDF is in your public folder!
        link.href = "/Davies_Ajayi_Resume.pdf";
        link.download = "Davies_Ajayi_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return "Download complete. Looking forward to hearing from you at daviesajayi7@gmail.com!";
      },
    };

    // 5. Cleanup function when component unmounts
    return () => {
      // @ts-ignore - we want to delete it safely on unmount
      delete window.sudo;
    };
  }, []);
};

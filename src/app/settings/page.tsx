"use client";

import { ModeToggle } from "@/components/ModeToggle";

const Settings = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-8">Settings</h1>
      <div>
        <p>Appearance</p>
        <div className="flex items-center gap-32">
          <p>Theme</p>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Settings;

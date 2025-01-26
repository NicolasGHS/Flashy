"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";
import { ModeToggle } from "@/components/ModeToggle";

const Settings = () => {
  return (
    <>
      <h1>Settings</h1>
      {/* <div className="flex align-center gap-3"> */}
      {/*   <Label>Theme</Label> */}
      {/*   <Switch /> */}
      {/* </div> */}
      <ModeToggle />
    </>
  );
};

export default Settings;

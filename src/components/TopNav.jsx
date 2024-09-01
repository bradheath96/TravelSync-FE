import React from "react";
import GoToItineraryButton from "./GoToItineraryButton";
import ReturnToMap from "./ReturnToMap";
import HomeButton from "./HomeButton";
import BudgetPageButton from "./BudgetPageButton";
import GoToFilesButton from "./GoToFilesButton";

export default function TopNav() {
  return (
    <div className="topNav">
      <GoToItineraryButton />
      <ReturnToMap />
      <HomeButton />
      <GoToFilesButton />
      <BudgetPageButton />
    </div>
  );
}

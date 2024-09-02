import React from "react";
import budget from "../../assets/budget.png";

export default function BudgetPage() {
  return (
    <button className="bottomNavButton topNavButton">
      <img src={budget} alt="" />
      <p className="topNavText">Budget</p>
    </button>
  );
}

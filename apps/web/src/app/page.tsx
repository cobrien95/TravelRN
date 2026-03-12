"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardHome from "./components/DashboardHome";
import JobsView from "./components/JobsView";
import CredentialsView from "./components/CredentialsView";
import HousingView from "./components/HousingView";
import TaxCalculatorView from "./components/TaxCalculatorView";
import ContractReviewView from "./components/ContractReviewView";
import SocialView from "./components/SocialView";

export default function Home() {
  const [activeView, setActiveView] = useState("home");

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <DashboardHome onNavigate={setActiveView} />;
      case "jobs":
        return <JobsView />;
      case "credentials":
        return <CredentialsView />;
      case "housing":
        return <HousingView />;
      case "tax":
        return <TaxCalculatorView />;
      case "contracts":
        return <ContractReviewView />;
      case "social":
        return <SocialView />;
      default:
        return <DashboardHome onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main className="dashboard-main">{renderView()}</main>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardHome from "./components/DashboardHome";
import JobsView from "./components/JobsView";
import CredentialsView from "./components/CredentialsView";

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
        return (
          <div className="coming-soon">
            <span className="coming-soon-icon">🏠</span>
            <h2>Housing Search</h2>
            <p>Coming soon — find furnished rentals near your contract.</p>
          </div>
        );
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

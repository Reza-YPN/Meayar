/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BrowserRouter as Router,
  Navigate,
  useLocation,
} from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import { DecisionSupportProvider } from "./context/DecisionSupportContext";
import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import React, { useMemo } from "react";
import { HomePage } from "./pages/HomePage";
import { PerformancePage } from "./pages/PerformancePage";
import { BenefitsPage } from "./pages/BenefitsPage";
import { TrainingPage } from "./pages/TrainingPage";
import { SalaryPage } from "./pages/SalaryPage";
import { AttendancePage } from "./pages/AttendancePage";
import { ServiceDeskPage } from "./pages/ServiceDeskPage";
import { SocialPage } from "./pages/SocialPage";
import { HealthPage } from "./pages/HealthPage";
import { CulturePage } from "./pages/CulturePage";

import { PerformanceStrengthsPage } from "./pages/PerformanceStrengthsPage";
import { PerformanceImprovementsPage } from "./pages/PerformanceImprovementsPage";
import { PerformanceSuccessionPage } from "./pages/PerformanceSuccessionPage";
import { CareerPathPage } from "./pages/CareerPathPage";
import { BenefitsEarnPage } from "./pages/BenefitsEarnPage";
import { BenefitsHistoryPage } from "./pages/BenefitsHistoryPage";
import { AttendanceLeavePage } from "./pages/AttendanceLeavePage";
import { ServiceDeskRequestsPage } from "./pages/ServiceDeskRequestsPage";
import { SalaryDeductionRequestPage } from "./pages/SalaryDeductionRequestPage";
import { OrganizationalHouseRequestPage } from "./pages/OrganizationalHouseRequestPage";
import { HealthRequestsPage } from "./pages/HealthRequestsPage";
import { SupportPage } from "./pages/SupportPage";
import { ManagerRequestsPage } from "./pages/ManagerRequestsPage";
import { ManagerGoodPerformancePage } from "./pages/ManagerGoodPerformancePage";
import { ManagerNeedsImprovementPage } from "./pages/ManagerNeedsImprovementPage";
import { ManagerComparePage } from "./pages/ManagerComparePage";
import { ManagerTrainingPage } from "./pages/ManagerTrainingPage";
import { ManagerMatrixPage } from "./pages/ManagerMatrixPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ExecutiveCommandCenterPage } from "./pages/ExecutiveCommandCenterPage";

import { CompetencyManagementPage } from "./pages/evaluator/CompetencyManagementPage";
import { EmployeeCompetencyEvalPage } from "./pages/evaluator/EmployeeCompetencyEvalPage";
import { MyCompetencyMatrixPage } from "./pages/employee/MyCompetencyMatrixPage";
import { FarajaTransfersPage } from "./pages/FarajaTransfersPage";
import { RecruitmentPage } from "./pages/RecruitmentPage";
import { GeographicAnalysisPage } from "./pages/GeographicAnalysisPage";

const ROUTE_MAP: Record<string, React.ComponentType<any>> = {
  "/home": HomePage,
  "/transfers": FarajaTransfersPage,
  "/recruitment": RecruitmentPage,
  "/manager/recruitment": RecruitmentPage,
  "/geographic-analysis": GeographicAnalysisPage,
  "/manager/geographic-analysis": GeographicAnalysisPage,
  "/gis": GeographicAnalysisPage,
  "/performance": PerformancePage,
  "/performance/strengths": PerformanceStrengthsPage,
  "/performance/improvements": PerformanceImprovementsPage,
  "/performance/succession": PerformanceSuccessionPage,
  "/performance/career-path": CareerPathPage,
  "/benefits": BenefitsPage,
  "/benefits/earn": BenefitsEarnPage,
  "/benefits/history": BenefitsHistoryPage,
  "/training": TrainingPage,
  "/salary": SalaryPage,
  "/attendance": AttendancePage,
  "/attendance/leave": AttendanceLeavePage,
  "/service-desk": ServiceDeskPage,
  "/service-desk/requests": ServiceDeskRequestsPage,
  "/service-desk/salary-deduction": SalaryDeductionRequestPage,
  "/service-desk/organizational-house": OrganizationalHouseRequestPage,
  "/social": SocialPage,
  "/culture": CulturePage,
  "/health": HealthPage,
  "/health/requests": HealthRequestsPage,
  "/support": SupportPage,
  "/notifications": NotificationsPage,
  "/manager/command-center": ExecutiveCommandCenterPage,
  "/manager/requests": ManagerRequestsPage,
  "/manager/performance": ManagerComparePage,
  "/manager/performance/good": ManagerGoodPerformancePage,
  "/manager/performance/needs-improvement": ManagerNeedsImprovementPage,
  "/manager/matrix": ManagerMatrixPage,
  "/manager/training": ManagerTrainingPage,
  "/evaluator/competency-management": CompetencyManagementPage,
  "/evaluator/employee-evaluation": EmployeeCompetencyEvalPage,
  "/employee/competency-matrix": MyCompetencyMatrixPage,
  "/profile": ProfilePage,
};

function StableTabOutlet() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Lazily persist visited paths to avoid rendering everything on first load
  const [visitedPaths, setVisitedPaths] = React.useState<Record<string, boolean>>({
    "/home": true, // Always pre-render home page
    [currentPath]: true,
  });

  React.useEffect(() => {
    if (ROUTE_MAP[currentPath] && !visitedPaths[currentPath]) {
      setVisitedPaths((prev) => ({ ...prev, [currentPath]: true }));
    }
    
    // Save last visited path (ignore root)
    if (currentPath !== "/") {
      localStorage.setItem("last_visited_path", currentPath);
    }
  }, [currentPath, visitedPaths]);

  if (currentPath === "/") {
    const savedPath = localStorage.getItem("last_visited_path") || "/home";
    // Check if the saved path is still valid
    const targetPath = ROUTE_MAP[savedPath] ? savedPath : "/home";
    return <Navigate to={targetPath} replace />;
  }

  const isKnownRoute = ROUTE_MAP[currentPath] !== undefined;

  return (
    <div className="w-full relative">
      {Object.keys(ROUTE_MAP).map((path) => {
        if (!visitedPaths[path]) return null;
        const Component = ROUTE_MAP[path];
        const isActive = currentPath === path;

        return (
          <div
            key={path}
            style={{ display: isActive ? "block" : "none" }}
            className="w-full"
          >
            <Component />
          </div>
        );
      })}

      {/* Fallback for unknown routes */}
      {!isKnownRoute && (
        <div className="p-8 text-center text-slate-500">
          این صفحه در حال توسعه است.
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <RoleProvider>
        <DecisionSupportProvider>
          <Router>
            <Layout>
              <StableTabOutlet />
            </Layout>
          </Router>
        </DecisionSupportProvider>
      </RoleProvider>
    </ErrorBoundary>
  );
}

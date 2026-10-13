import { createContext, useContext, useState, ReactNode, useMemo } from "react";

export type Role = "employee" | "evaluator" | "manager";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(() => {
    const savedRole = localStorage.getItem("app_user_role");
    return (savedRole as Role) || "employee";
  });

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem("app_user_role", newRole);
  };

  const contextValue = useMemo(() => ({
    role,
    setRole
  }), [role]);

  return (
    <RoleContext.Provider value={contextValue}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}

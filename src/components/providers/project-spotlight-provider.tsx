"use client";

// Lets a control outside the Projects section (e.g. a Skills card) ask
// Projects to scroll into view and open a specific project's modal, without
// lifting the Projects section's own selected-project state up to a parent —
// Projects still owns that state and just watches this context for requests.
import { createContext, useCallback, useContext, useState } from "react";

interface ProjectSpotlightContextValue {
  pendingProjectId: string | null;
  requestProject: (projectId: string) => void;
  clearPendingProject: () => void;
}

const ProjectSpotlightContext =
  createContext<ProjectSpotlightContextValue | null>(null);

export function ProjectSpotlightProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(
    null
  );

  const requestProject = useCallback((projectId: string) => {
    setPendingProjectId(projectId);
  }, []);

  const clearPendingProject = useCallback(() => {
    setPendingProjectId(null);
  }, []);

  return (
    <ProjectSpotlightContext.Provider
      value={{ pendingProjectId, requestProject, clearPendingProject }}
    >
      {children}
    </ProjectSpotlightContext.Provider>
  );
}

export function useProjectSpotlight() {
  const ctx = useContext(ProjectSpotlightContext);
  if (!ctx) {
    throw new Error(
      "useProjectSpotlight must be used within a ProjectSpotlightProvider"
    );
  }
  return ctx;
}

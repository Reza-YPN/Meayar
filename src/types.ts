export type FunctionLevel = 'Individual' | 'Team' | 'Organizational' | 'Social';
export type ImpactLevel = 'Input' | 'Process' | 'Product' | 'Output' | 'Outcome' | 'Impact';
export type RoleType = 'Critical' | 'Enhancer' | 'Enabler';
export type ImportanceLevel = 'Very High' | 'High' | 'Low' | 'Very Low';

export interface Competency {
  id: string;
  title: string;
  description: string;
  functionLevel: FunctionLevel;
  impactLevel: ImpactLevel;
  type?: 'محوری' | 'عمومی' | 'تخصصی';
  behavioralIndicators?: string;
  icon?: string;
  reasoning?: string;
}

export interface KPI {
  id: string;
  title: string;
}

export interface KPIMapping {
  id: string;
  kpiId: string;
  competencyId: string;
  reasoning?: string;
  roleType: RoleType;
  importance: ImportanceLevel;
  weight?: number;
}

export interface Department {
  id: string;
  title: string;
  coreCompetencyIds?: string[];
}

export interface Job {
  id: string;
  title: string;
  icon?: string;
  departmentId: string;
  kpis: KPI[];
}

export interface Employee {
  id: string;
  name: string;
  jobId: string;
  evaluations?: Record<string, number>; // competencyId -> score
}

export const generateId = () => Math.random().toString(36).substring(2, 9);

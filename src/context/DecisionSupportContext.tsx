import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  PersonnelPerformanceRecord, 
  UnitPerformanceData, 
  DecisionInsight, 
  ActionProposal,
  ExcelImportSummary 
} from '../types/decisionSupport';
import { DecisionSupportService } from '../services/decisionSupportService';
import { ExcelIngestionService, SupportedExcelSchema } from '../services/excelIngestionService';

interface DecisionSupportContextType {
  personnelRecords: PersonnelPerformanceRecord[];
  unitRecords: UnitPerformanceData[];
  macroKPIs: ReturnType<typeof DecisionSupportService.getMacroKPIs>;
  activeUnitCode: string;
  setActiveUnitCode: (code: string) => void;
  activeInsight: DecisionInsight;
  approvedProposals: Record<string, ActionProposal>;
  approveProposal: (proposalId: string, approverName?: string) => void;
  refreshInsight: (unitCode?: string) => void;
  // Excel Ingestion
  isIngestionModalOpen: boolean;
  setIsIngestionModalOpen: (open: boolean) => void;
  importSummary: ExcelImportSummary | null;
  isProcessingFile: boolean;
  parseExcelFile: (file: File, schemaType: SupportedExcelSchema) => Promise<ExcelImportSummary>;
  commitImportedData: (summary: ExcelImportSummary) => void;
  clearImportSummary: () => void;
  downloadSampleTemplate: (schemaType: SupportedExcelSchema) => void;
}

const DecisionSupportContext = createContext<DecisionSupportContextType | undefined>(undefined);

export const DecisionSupportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [personnelRecords, setPersonnelRecords] = useState<PersonnelPerformanceRecord[]>([]);
  const [unitRecords, setUnitRecords] = useState<UnitPerformanceData[]>([]);
  const [activeUnitCode, setActiveUnitCode] = useState<string>('YGN-115'); // default to critical unit to demonstrate insights
  const [activeInsight, setActiveInsight] = useState<DecisionInsight>(() => 
    DecisionSupportService.analyzeUnitMultiFactor('YGN-115')
  );
  const [approvedProposals, setApprovedProposals] = useState<Record<string, ActionProposal>>({});
  
  // Excel Ingestion State
  const [isIngestionModalOpen, setIsIngestionModalOpen] = useState(false);
  const [importSummary, setImportSummary] = useState<ExcelImportSummary | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  // Initial load
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    const personnel = DecisionSupportService.getPersonnelRecords();
    const units = DecisionSupportService.getUnitRecords();
    const approved = DecisionSupportService.getApprovedProposals();
    setPersonnelRecords(personnel);
    setUnitRecords(units);
    setApprovedProposals(approved);
  };

  useEffect(() => {
    const insight = DecisionSupportService.analyzeUnitMultiFactor(activeUnitCode);
    setActiveInsight(insight);
  }, [activeUnitCode, unitRecords, personnelRecords]);

  const refreshInsight = (unitCode?: string) => {
    const target = unitCode || activeUnitCode;
    const insight = DecisionSupportService.analyzeUnitMultiFactor(target);
    setActiveInsight(insight);
  };

  const approveProposal = (proposalId: string, approverName = 'سردار فرماندهی انتظامی / سرکلانتر') => {
    const updated = DecisionSupportService.approveProposal(proposalId, approverName);
    if (updated) {
      setApprovedProposals(prev => ({ ...prev, [proposalId]: updated }));
    }
  };

  const parseExcelFile = async (file: File, schemaType: SupportedExcelSchema): Promise<ExcelImportSummary> => {
    setIsProcessingFile(true);
    try {
      const summary = await ExcelIngestionService.parseExcelFile(file, schemaType);
      setImportSummary(summary);
      return summary;
    } finally {
      setIsProcessingFile(false);
    }
  };

  const commitImportedData = (summary: ExcelImportSummary) => {
    const validRows = summary.rows.filter(r => r.status !== 'error' && r.parsedData);
    
    if (summary.dataType === 'personnel') {
      const newPersonnel: PersonnelPerformanceRecord[] = validRows.map(r => r.parsedData);
      DecisionSupportService.saveImportedPersonnel(newPersonnel);
    } else if (summary.dataType === 'unit_kpis') {
      const newUnits: UnitPerformanceData[] = validRows.map(r => r.parsedData);
      DecisionSupportService.saveImportedUnits(newUnits);
    }

    loadAllData();
    setImportSummary(null);
    setIsIngestionModalOpen(false);
  };

  const clearImportSummary = () => {
    setImportSummary(null);
  };

  const downloadSampleTemplate = (schemaType: SupportedExcelSchema) => {
    ExcelIngestionService.downloadSampleTemplate(schemaType);
  };

  const macroKPIs = DecisionSupportService.getMacroKPIs();

  return (
    <DecisionSupportContext.Provider
      value={{
        personnelRecords,
        unitRecords,
        macroKPIs,
        activeUnitCode,
        setActiveUnitCode,
        activeInsight,
        approvedProposals,
        approveProposal,
        refreshInsight,
        isIngestionModalOpen,
        setIsIngestionModalOpen,
        importSummary,
        isProcessingFile,
        parseExcelFile,
        commitImportedData,
        clearImportSummary,
        downloadSampleTemplate
      }}
    >
      {children}
    </DecisionSupportContext.Provider>
  );
};

export const useDecisionSupport = (): DecisionSupportContextType => {
  const context = useContext(DecisionSupportContext);
  if (!context) {
    throw new Error('useDecisionSupport must be used within a DecisionSupportProvider');
  }
  return context;
};

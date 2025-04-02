export interface ReportSection {
  id: string;
  name: string;
  icon?: React.ReactNode;
  items?: ReportItem[];
}

export interface ReportItem {
  id: string;
  name: string;
  description?: string;
  isDraggable?: boolean;
}
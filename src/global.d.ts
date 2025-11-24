export interface ProblemItem {
  id: string;
  title: string;
  description: string;
  explanation: string;
  code: string;
  component?: React.ReactNode;
  problemStatement?: string;
}
export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface WorkedExample {
  title: string;
  steps: string[];
  takeaway: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ToolGuideContent {
  slug: string;
  updatedLabel: string;
  intro: string;
  sections: GuideSection[];
  tableCaption: string;
  tableHeaders: [string, string, string];
  tableRows: [string, string, string][];
  workedExample: WorkedExample;
  faqs: FaqItem[];
}

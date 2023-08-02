export enum ReportType {
  Income = 'income',
  Expense = 'expense',
}

type Data = {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
};

export const data: Data = {
  report: [
    {
      id: 'uuid1',
      source: 'Salary',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Income,
    },
    {
      id: 'uuid2',
      source: 'FastFood',
      amount: 10,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Expense,
    },
    {
      id: 'uuid3',
      source: 'Project',
      amount: 700,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Income,
    },
  ],
};

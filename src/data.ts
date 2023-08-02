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
      id: 'da997a09-5f0e-4d86-ab07-653ee6c62707',
      source: 'Salary',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Income,
    },
    {
      id: '93f63f7a-8fc3-46b1-b385-457d485b32b5',
      source: 'FastFood',
      amount: 10,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Expense,
    },
    {
      id: '7c9bbbd8-86ba-466d-bd47-de1aaf33ce04',
      source: 'Project',
      amount: 700,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Income,
    },
  ],
};

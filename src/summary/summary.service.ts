import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}
  calculateSummaries() {
    const totalIncomes = this.reportService
      .getAllReports(ReportType.Income)
      .reduce((sum, report) => {
        return sum + report.amount;
      }, 0);

    const totalExpenses = this.reportService
      .getAllReports(ReportType.Expense)
      .reduce((sum, report) => {
        return sum + report.amount;
      }, 0);

    return {
      totalIncome: totalIncomes,
      totalExpense: totalExpenses,
      netIncome: totalIncomes - totalExpenses,
    };
  }
}

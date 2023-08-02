import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

interface Report {
  source: string;
  amount: number;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): any[] {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string): object {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }

  createReport(type: ReportType, { source, amount }: Report): object {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: Report): object {
    const selectedReport = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!selectedReport) return;
    const selectedReportIndex = data.report.indexOf(selectedReport);
    data.report[selectedReportIndex] = {
      ...selectedReport,
      ...body,
    };
    return data.report[selectedReportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.report.indexOf(
      data.report.find((report) => report.id === id),
    );
    data.report.splice(reportIndex, 1);
    return;
  }
}

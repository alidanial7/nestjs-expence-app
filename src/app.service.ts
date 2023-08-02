import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dtos/report.dto';

interface Report {
  source: string;
  amount: number;
}
interface UpdateReport {
  source?: string;
  amount?: number;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((response) => new ReportResponseDto(response));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;
    return new ReportResponseDto(report);
  }

  createReport(
    type: ReportType,
    { source, amount }: Report,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReport,
  ): ReportResponseDto {
    const selectedReport = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!selectedReport) return;
    const selectedReportIndex = data.report.indexOf(selectedReport);
    data.report[selectedReportIndex] = {
      ...selectedReport,
      ...body,
    };
    return new ReportResponseDto(data.report[selectedReportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.indexOf(
      data.report.find((report) => report.id === id),
    );
    data.report.splice(reportIndex, 1);
    return;
  }
}

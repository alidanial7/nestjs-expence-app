import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string): any[] {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string): object {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
  }

  @Post()
  createReport(
    @Param('type') type: string,
    @Body() { source, amount }: { source: string; amount: number },
  ): object {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: reportType,
    };
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { source: string; amount: number },
  ): object {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    const selectedReport = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
    if (!selectedReport) return;
    const selectedReportIndex = data.report.indexOf(selectedReport);
    data.report[selectedReportIndex] = {
      ...selectedReport,
      ...body,
    };
    return data.report[selectedReportIndex];
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string): any {
    const reportIndex = data.report.indexOf(
      data.report.find((report) => report.id === id),
    );
    data.report.splice(reportIndex, 1);
    return;
  }
}

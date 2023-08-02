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
import { ReportType } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string): any[] {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string): object {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Param('type') type: string,
    @Body() { source, amount }: { source: string; amount: number },
  ): object {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.createReport(reportType, { source, amount });
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { source: string; amount: number },
  ): object {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string): any {
    return this.appService.deleteReport(id);
  }
}

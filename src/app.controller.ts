import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): any[] {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): object {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() { source, amount }: { source: string; amount: number },
  ): object {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.createReport(reportType, { source, amount });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { source: string; amount: number },
  ): object {
    const reportType =
      type === 'income' ? ReportType.Income : ReportType.Expense;
    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string): any {
    return this.appService.deleteReport(id);
  }
}

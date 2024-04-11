import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('/')
  async getInvoices() {
    return this.invoiceService.invoices();
  }

  @Get('/total')
  async getTotalAmountOfInvoices() {
    const invoicesAmount = await this.invoiceService.invoices({
      select: {
        amount: true,
      },
    });

    const totalAmount = invoicesAmount.reduce(
      (total, invoice) => total + invoice.amount,
      0,
    );

    return { total: totalAmount };
  }

  @Get('/:id')
  async getInvoiceByID(@Param('id') id: string) {
    if (isNaN(parseInt(id))) {
      throw new BadRequestException('id must be a number!');
    }

    const invoice = await this.invoiceService.invoiceByID({
      id: parseInt(id),
    });
    if (!invoice) {
      throw new BadRequestException(`Invoice with id ${id} does not exists!`);
    }

    return invoice;
  }
}

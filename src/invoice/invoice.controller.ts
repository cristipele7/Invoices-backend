import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { PrismaUser } from 'src/auth/auth.decorators';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('/')
  async getInvoices(@PrismaUser() userID: number) {
    if (!userID) {
      throw new BadRequestException(
        "You don't have permission to access invoices!",
      );
    }

    return this.invoiceService.invoices({
      where: {
        user_id: userID,
      },
    });
  }

  @Get('/total')
  async getTotalAmountOfInvoices(@PrismaUser() userID: number) {
    if (!userID) {
      throw new BadRequestException(
        "You don't have permission to access invoices!",
      );
    }

    const invoicesAmount = await this.invoiceService.invoices({
      where: {
        paid: false,
        user_id: userID,
      },
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
  async getInvoiceByID(@PrismaUser() userID: number, @Param('id') id: string) {
    if (!userID) {
      throw new BadRequestException(
        "You don't have permission to access invoices!",
      );
    }

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

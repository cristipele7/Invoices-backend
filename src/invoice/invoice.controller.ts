import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { PrismaUser } from 'src/auth/auth.decorators';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  recursiveBrackets = (brackets: string): number => {
    if (brackets === '()') {
      return 0;
    }

    const splitBrackets = brackets.split('()');
    if (splitBrackets.length > 1) {
      return this.recursiveBrackets(splitBrackets.join(''));
    } else {
      const arrayBrackets = Array.from(brackets);
      const newNrSwape: number[] = [Number.MAX_SAFE_INTEGER];
      for (let i = 0; i < brackets.length; i++) {
        for (let j = i + 1; j < brackets.length; j++) {
          if (arrayBrackets[i] !== arrayBrackets[j]) {
            const newArrayBrackets = [...arrayBrackets];
            const ib = newArrayBrackets[i];
            newArrayBrackets[i] = newArrayBrackets[j];
            newArrayBrackets[j] = ib;
            newNrSwape.push(
              this.recursiveBrackets(newArrayBrackets.join('')) + 1,
            );
          }
        }
      }
      return Math.min(...newNrSwape);
    }
  };

  @Post('/')
  async test(@Body() body: { brackets: string }) {
    const brackets = body.brackets;

    let nrStart = 0;
    let nrEnd = 0;
    for (let i = 0; i < brackets.length; i++) {
      if (brackets[i] === '(') {
        nrStart++;
      } else {
        nrEnd++;
      }
    }
    if (nrStart !== nrEnd) {
      return -1;
    }

    return this.recursiveBrackets(brackets);
  }

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

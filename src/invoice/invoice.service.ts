import { Injectable } from '@nestjs/common';
import { Invoice, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  async invoices(params?: Prisma.InvoiceFindManyArgs): Promise<Invoice[]> {
    return this.prisma.invoice.findMany(params);
  }

  async invoiceByID(params: Prisma.InvoiceWhereUniqueInput): Promise<Invoice> {
    return this.prisma.invoice.findUnique({
      where: params,
    });
  }
}

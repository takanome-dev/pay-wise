import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './transaction.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { RolesGuard } from '../lib/guards/roles.guard';
import { User, UserId } from '../lib/decorators/user.decorator';
import { JwtUserDto } from '../user/user.dto';

@UseGuards(LocalAuthGuard, RolesGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getAllTransactions(@User() user: JwtUserDto) {
    return this.transactionService.findAll(user);
  }

  @Post('/create')
  createTransaction(
    @Body() transactionInfos: CreateTransactionDto,
    @UserId() userId: string,
  ) {
    return this.transactionService.create(transactionInfos, userId);
  }
}

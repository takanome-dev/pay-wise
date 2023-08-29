import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UserId } from '../common/decorators/user.decorator';

import { CreateTransactionDto } from './transaction.dto';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { SupabaseGuard } from '../auth/guards/supabase.guard';

@UseGuards(SupabaseGuard)
@Controller('transactions')
@ApiTags('Transaction service')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'getAllTransactions',
    summary: 'Get all transactions of the current user',
  })
  @ApiOkResponse({ type: Transaction, isArray: true })
  getAllTransactions(@UserId() userId: string) {
    return this.transactionService.findAll(userId);
  }

  @Post('/create')
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'createTransaction',
    summary: 'Create a transaction',
  })
  @ApiBody({ type: CreateTransactionDto })
  @ApiOkResponse({ type: Transaction })
  createTransaction(
    @Body() transactionInfos: CreateTransactionDto,
    @UserId() userId: string,
  ) {
    return this.transactionService.create(transactionInfos, userId);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { User, UserId } from '../common/decorators/user.decorator';
import { JwtUserDto } from '../user/user.dto';

import { CreateTransactionDto } from './transaction.dto';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

/**
 *
 */
@Controller('transactions')
@ApiTags('Transaction service')
export class TransactionController {
  /**
   *
   * @param transactionService
   */
  constructor(private transactionService: TransactionService) {}

  /**
   *
   * @param user
   */
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'getAllTransactions',
    summary: 'Get all transactions of the current user',
  })
  @ApiOkResponse({ type: Transaction, isArray: true })
  getAllTransactions(@User() user: JwtUserDto) {
    return this.transactionService.findAll(user);
  }

  /**
   *
   * @param transactionInfos
   * @param userId
   */
  @Post('/create')
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'createTransaction',
    summary: 'Create a transaction',
  })
  @ApiOkResponse({ type: Transaction })
  createTransaction(
    @Body() transactionInfos: CreateTransactionDto,
    @UserId() userId: string,
  ) {
    return this.transactionService.create(transactionInfos, userId);
  }
}

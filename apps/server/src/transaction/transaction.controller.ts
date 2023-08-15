import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './transaction.dto';
import { JwtUserDto } from '../user/user.dto';
import { User, UserId } from '../common/decorators/user.decorator';
import { Transaction } from './transaction.entity';

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
  getAllTransactions(@User() user: JwtUserDto) {
    return this.transactionService.findAll(user);
  }

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

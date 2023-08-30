import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { SupabaseGuard } from '../auth/guards/supabase.guard';
// import { Roles } from '../common/decorators/role.decorator';
import { UserId } from '../common/decorators/user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

import { CreateCustomerBodyDto, CreateCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@UseGuards(SupabaseGuard, RolesGuard)
// @Roles('user')
@Controller('customers')
@ApiTags('Customer service')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    operationId: 'createCustomer',
    summary: 'Create a customer',
  })
  @ApiBody({ type: CreateCustomerBodyDto })
  @ApiOkResponse({ type: Customer })
  createCustomer(
    @Body() customerInfos: CreateCustomerDto,
    @UserId() userId: string,
  ) {
    return this.customerService.create(customerInfos, userId);
  }
}

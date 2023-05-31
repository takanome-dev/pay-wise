import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../common/decorators/role.decorator';
import { UserId } from '../common/decorators/user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

import type { CreateCustomerDto } from './customer.dto';
import type { CustomerService } from './customer.service';

@Roles('user')
@UseGuards(AuthGuard, RolesGuard)
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async createCustomer(
    @Body() customerInfos: CreateCustomerDto,
    @UserId() userId: string,
  ) {
    return this.customerService.create(customerInfos, userId);
  }
}

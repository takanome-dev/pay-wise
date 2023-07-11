import { Controller, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { Roles } from '../lib/decorators/role.decorator';
import { RolesGuard } from '../lib/guards/roles.guard';

@Roles('user')
@UseGuards(LocalAuthGuard, RolesGuard)
@Controller('customers')
export class CustomerController {
  // constructor(private customerService: CustomerService) {}
  // @Post()
  // async createCustomer(
  //   @Body() customerInfos: CreateCustomerDto,
  //   @UserId() userId: string,
  // ) {
  //   return this.customerService.create(customerInfos, userId);
  // }
}

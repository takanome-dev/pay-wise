import { Controller, UseGuards } from '@nestjs/common';

import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

/**
 *
 */
@UseGuards(RolesGuard)
@Roles('user')
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

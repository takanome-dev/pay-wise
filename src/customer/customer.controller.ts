import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UserId } from '../common/decorators/user.decorator';
import { CreateCustomerDto } from './customer.dto';
import { Roles } from '../common/decorators/role.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

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
    return await this.customerService.create(customerInfos, userId);
  }
}

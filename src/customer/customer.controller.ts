import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserId } from '../common/decorators/user.decorator';
import { CreateCustomerDto } from './customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  // TODO: only user should be able to get his own customer
  @UseGuards(AuthGuard)
  @Post()
  async createCustomer(
    @Body() customerInfos: CreateCustomerDto,
    @UserId() userId: number,
  ) {
    return await this.customerService.create(customerInfos, userId);
  }
}

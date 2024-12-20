import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Payment from "./payment.entity";
import { OrderModule } from "src/order/order.module";


@Module({
    imports:[TypeOrmModule.forFeature([Payment]),OrderModule],
    controllers:[PaymentController],
    providers:[PaymentService],
    exports:[PaymentService]
})
export class PaymentModule{
}
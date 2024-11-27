import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Payment from "./payment.entity";
import { Repository } from "typeorm";


@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
    
    ) { }


    async findPayment(MerchantTxnId: string) {
        const payment= await this.paymentRepository.findOne({
            where: { MerchantTxnId: MerchantTxnId},
            order: { createdAt: 'DESC' },
          });
          if (payment) {
            return payment;
          }
      
         return null
    }

    async createPayment(MerchantTxnId: string) {
        const payment = this.paymentRepository.create({MerchantTxnId})
        return await this.paymentRepository.save(payment);
    }

    async findPayments() {
        const payment= await this.paymentRepository.find();
          if (payment) {
            return payment;
          }
      
         return null
    }
    
    async deletePayment(id: string) {
        console.log(id)
        const payment = this.paymentRepository.delete(id)
        return payment
    }

}
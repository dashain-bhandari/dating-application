import { Controller, Delete, Get, InternalServerErrorException, Param, Post, Req } from "@nestjs/common";
import { Request } from "express";
import * as crypto from "crypto";

import axios from 'axios';
import { PaymentService } from "./payment.service";

@Controller('payment')
export class PaymentController {

    constructor(
        private paymentService: PaymentService
    ) { }

    @Get('notification')
    async checkNotification(@Req() request: Request) {
        try {
            const MerchantId = "7366";
            const MerchantName = "socialnepalapi";
            const MerchantTxnId: string = String(request.query.MerchantTxnId);
            console.log(MerchantTxnId)
            let value: string = `${MerchantId}${MerchantName}${MerchantTxnId}`;
            const hmac = crypto.createHmac("sha512", "Social@2024");
            hmac.update(value);
            const hash = hmac.digest("hex").toLowerCase();

            // Base64 encode the username and password
            const authHeader = `Basic ${Buffer.from(
                `socialnepalapi:Social@2081`
            ).toString("base64")}`;

            const headers = {
                Authorization: authHeader,
                "Content-Type": "application/json",
            };
            const payload = {
                MerchantId,
                MerchantName,
                MerchantTxnId,
                Signature: hash,
            };

            const response = await axios.post(
                "https://apisandbox.nepalpayment.com/CheckTransactionStatus",
                payload,
                { headers }
            );

            if (response.data.code === "0" || response.data.code === "1") {
                const transaction = await this.paymentService.findPayment(MerchantTxnId); // Find payment and check for status
                console.log(transaction);
                if (transaction !== null && transaction !== undefined) {
                    return "Already Recieved";
                } else {
                    const trans = await this.paymentService.createPayment(MerchantTxnId);
                    if (trans) {
                        return "Recieved";
                    }
                }
            } else {
                return {
                    status: "error",
                    message: "Invalid transaction",
                };
            }
        } catch (error) {
            throw InternalServerErrorException
        }
    }

    @Post(':processId')
    async getProcessId(
        @Req() req: Request
    ) {
        try {
            const MerchantId = "7366";
            const MerchantName = "socialnepalapi";
            const Amount = req.body.Amount;
            const MerchantTxnId = req.body.MerchantTxnId;
            console.log(MerchantId);
            console.log(MerchantName);

            // Value generation for signature
            let value = `${Amount}${MerchantId}${MerchantName}${MerchantTxnId}`;
            const hmac = crypto.createHmac("sha512", "Social@2024");
            hmac.update(value);
            const hash = hmac.digest("hex").toLowerCase();
            // Base64 encode the username and password
            const authHeader = `Basic ${Buffer.from(
                `socialnepalapi:Social@2081`
            ).toString("base64")}`;

            const headers = {
                Authorization: authHeader,
                "Content-Type": "application/json",
            };
            console.log(process.env.API_USERNAME);
            console.log(process.env.API_PASSWORD);
            console.log(authHeader);
            const payload = {
                MerchantId,
                MerchantName,
                Amount,
                MerchantTxnId,
                Signature: hash,
            };
            console.log(payload);
            const response = await axios.post(
                "https://apisandbox.nepalpayment.com/GetProcessId",
                payload,
                { headers }
            );

            console.log(response);

            if (response.data.code === "0") {
                return {
                    status: "success",
                    msg: "Get process id success",
                    data: response.data.data,
                };
            } else {
                return {
                    status: "error",
                    msg: "Get process id failed",
                    error: response.data.errors,
                }
            }
        } catch (error: any) {
            console.error("msg:", error.message);
            throw InternalServerErrorException;
        }
    }

    @Get()
    async getPayments() {
        try {
            const data = await this.paymentService.findPayments();
            return data
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    

    @Delete(':id')
    async deletePayments(@Param('id') id: string) {
        try {
            console.log(id)
            const data = await this.paymentService.deletePayment(id);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    @Get('checkTransactionStatus/:MerchantTxnId')
     async  checkTransactionStatus(
        @Req() req:Request,
        @Param('MerchantTxnId') MerchantTxnId:string 
      ) {
        try {
            const MerchantId = "7366";
            const MerchantName = "socialnepalapi";
      
          const MerchantTxnId = req.params.MerchantTxnId;
      
          console.log(MerchantId);
          console.log(MerchantName);
      
          // Value generation for signature
          let value = `${MerchantId}${MerchantName}${MerchantTxnId}`;
          const hmac = crypto.createHmac("sha512", "Social@2024");
          hmac.update(value);
          const hash = hmac.digest("hex").toLowerCase();
      
          // Base64 encode the username and password
          const authHeader = `Basic ${Buffer.from(
            `socialnepalapi:Social@2081`
          ).toString("base64")}`;
      
          const headers = {
            Authorization: authHeader,
            "Content-Type": "application/json",
          };
          console.log(process.env.API_USERNAME);
          console.log(process.env.API_PASSWORD);
          console.log(authHeader);

          const payload = {
            MerchantId,
            MerchantName,
            MerchantTxnId,
            Signature: hash,
          };
          console.log(payload);

          const response = await axios.post(
            "https://apisandbox.nepalpayment.com/CheckTransactionStatus",
            payload,
            { headers }
          );
      
          console.log(response);
      
          if (response.data.code === "0") {
            return {
              status: "success",
              msg: "Check transaction status success",
              data: response.data.data,
            };
          } else {
            return {
              status: "error",
              msg: "Check transaction status failed",
              error: response.data.errors,
            };
          }
        } catch (error: any) {
          console.error("msg:", error.message);
         throw InternalServerErrorException;
        }
      }
    
}
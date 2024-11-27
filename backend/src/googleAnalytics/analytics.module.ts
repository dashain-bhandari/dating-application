import { Module } from "@nestjs/common";
import { AnalyticsController } from "./analytics.controller";
import { ConfigModule } from "@nestjs/config";

@Module(
    {
        imports:[ConfigModule],
        controllers:[AnalyticsController],
        providers:[],
        exports:[]
    }
)
export class AnalyticsModule{

}
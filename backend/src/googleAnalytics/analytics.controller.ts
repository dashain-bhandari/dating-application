import { Controller, Get, HttpException } from "@nestjs/common";
import  { BetaAnalyticsDataClient } from "@google-analytics/data";
import { ConfigService } from "@nestjs/config";

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "../src/googleAnalytics/analytics.json";
@Controller('/analytics')
export class AnalyticsController {
    private analyticsDataClient = new BetaAnalyticsDataClient();
    propertyId = "445851175";
    constructor(private readonly configService: ConfigService,){
       
    }

    @Get('city')
    async getCityViews() {
    try {
        const [response] = await this.analyticsDataClient.runReport({
            property: `properties/${this.propertyId}`,
            dateRanges: [
                {
                    startDate: "30daysAgo",
                    endDate: "today",
                },
            ],
            dimensions: [
                {
                    name: "country",
                },
                {
                    name: "pagePath",
                },


            ],
            metrics: [
                {
                    name: "totalUsers",
                },
            ],
            // Add a filter expression to filter by page title
            //filtersExpression: 'pagePath == "admin-dashboard/"', // Replace "Your Page Title" with the actual title of the page
        });
        return response;
    } catch (error) {
        throw new HttpException(error.message,500)
    }
    }
}
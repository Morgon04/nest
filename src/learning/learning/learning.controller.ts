import { Controller, Post, Body, InternalServerErrorException, Get } from '@nestjs/common';

// Import Learning Service
import { LearingService } from '../_service/learing.service';

// Import Learning Model
import { Learning } from './../_model/learning';

@Controller('learning')
export class LearningController {

    constructor(
        private learningService: LearingService
    ) { }

    @Post('create')
    async addLearning(@Body() learning: Learning) {
        try {
            const created = await this.learningService.insertLearning(learning);
            return created;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get('list')
    async getLearnings(@Body() learning: Learning) {
        try {
            const list = await this.learningService.getLearnings();
            return list;
        } catch (error) { 
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }
}

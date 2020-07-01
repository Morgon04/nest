import { Controller, Post, Body, InternalServerErrorException, Get, Query, Patch, Delete } from '@nestjs/common';

// Import Service
import { LearingService } from '../_service/learing.service';
import { UtilityService } from 'src/utility.service';

// Import Learning Model
import { Learning } from './../_model/learning';

@Controller('learning')
export class LearningController {

    constructor(
        private learningService: LearingService,
        private utilityService: UtilityService
    ) { }

    @Post('create')
    async addLearning(@Body() learning: Learning) {
        try {
            const created = await this.learningService.insertLearning(learning);
            const { code, message } = this.utilityService.getResCodeAndMessage(created, 'learnCreate');
            return { responseContent: created, code, message };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get('list')
    async getLearnings() {
        try {
            const list = await this.learningService.getLearnings();
            const { code, message } = this.utilityService.getResCodeAndMessage(list, 'learnFetch');
            return { responseContent: list, code, message };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }
    @Get('get-by-id')
    async getLearningsById(@Query('id') id: number) {
        try {
            const learning = await this.learningService.getLearningsById(id);
            const { code, message } = this.utilityService.getResCodeAndMessage(learning, 'learnFetch');
            return { responseContent: learning, code, message };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }
    @Patch('update-by-id')
    async updateLearning(@Query('id') id: number, @Body() learning: Learning) {
        try {
            const updated = await this.learningService.updateLearning(learning, id);
            const { code, message } = this.utilityService.getResCodeAndMessage(updated, 'learnUpdate');
            return { responseContent: learning, code, message };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    @Delete('delete-by-id')
    async deleteLearning(@Query('id') id: number) {
        try {
            const deleted = await this.learningService.deleteLearning(id);
            return this.utilityService.getResCodeAndMessage(deleted, 'learnDelete');
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get('get-by-advance')
    async getLearningAdvance(@Query('searchValue') searchValue: string) {
        try {
            const learning = await this.learningService.getLearningAdvanceSearch(searchValue);
            const { code, message } = this.utilityService.getResCodeAndMessage(learning, 'learnFetch');
            return { code, message, responseContent: learning };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get('get-by-coursename')
    async getLearningByCourseName(@Query('searchValue') searchValue: string) {
        try {
            const learning = await this.learningService.getLearningByCourseName(searchValue);
            const { code, message } = this.utilityService.getResCodeAndMessage(learning, 'learnFetch');
            return { code, message, responseContent: learning };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }
}

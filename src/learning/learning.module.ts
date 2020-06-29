import { Module } from '@nestjs/common';

// Importing MongooseModule
import { MongooseModule } from '@nestjs/mongoose';

// Import Learning Controller
import { LearningController } from './learning/learning.controller';

// Import Learning Schema Module
import { LearningSchema } from './_model/learning';

// Import Service
import { LearingService } from './_service/learing.service';
import { UtilityService } from 'src/utility.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Learning', schema: LearningSchema }
        ])
    ],
    controllers: [
        LearningController
    ],
    providers: [
        LearingService,
        UtilityService
    ]
})
export class LearningModule { }

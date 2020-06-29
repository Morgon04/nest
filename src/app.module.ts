import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Mongoose Import
import { MongooseModule } from '@nestjs/mongoose';
import { LearningModule } from './learning/learning.module';
import { UtilityService } from './utility.service';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://muruganpk:mongoDB04@cluster0-vynbg.mongodb.net/nestjslearning?retryWrites=true&w=majority`
    ),
    LearningModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UtilityService
  ],
})
export class AppModule { }

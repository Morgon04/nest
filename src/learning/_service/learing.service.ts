// Nest Js Import
import { Injectable } from '@nestjs/common';

// Import Model 
import { Model } from 'mongoose';


// Import Inject Model from Mongoose
import { InjectModel } from '@nestjs/mongoose'

// Import model
import { Learning } from '../_model/learning';

@Injectable()
export class LearingService {

    constructor(
        @InjectModel('Learning') private readonly learningModel: Model<Learning>
    ) {

    }

    async insertLearning(learn: Learning): Promise<any> {
        const newLearning = new this.learningModel(learn);
        return newLearning.save();
    }

    async getLearnings(): Promise<Learning[]> {
        return this.learningModel.find();
    }
}

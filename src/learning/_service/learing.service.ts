// Nest Js Import
import { Injectable, NotFoundException } from '@nestjs/common';

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
    ) { }

    async insertLearning(learn: Learning): Promise<any> {
        const newLearning = new this.learningModel(learn);
        return newLearning.save();
    }

    async getLearnings(): Promise<Learning[]> {
        return this.learningModel.find();
    }

    async getLearningsById(id: number): Promise<Learning> {
        const learning = this.learningModel.findById(id).exec();
        if (!learning) {
            throw new NotFoundException('Could not find learning')
        }
        return learning;
    }

    async updateLearning(learning: Learning, id: number): Promise<any> {

        const updatedProduct = await this.getLearningsById(id);
        for (const [key, value] of Object.entries(learning)) {
            updatedProduct[key] = value;
        }
        return updatedProduct.save();
    }

    async deleteLearning(id: number): Promise<any> {
        return this.learningModel.deleteOne({ _id: id }).exec();
    }

    async getLearningAdvanceSearch(searchValue: string): Promise<Learning[]> {
        const regex = { $regex: `${searchValue}`, $options: 'i' };
        return this.learningModel.find({
            $or: [
                { courseName: regex },
                { description: regex }
            ]
        }).exec();
    }

    async getLearningByCourseName(searchValue: string): Promise<Learning> {
        return this.learningModel.findOne({ courseName: searchValue }).exec();
    }
}

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
    ) {

    }

    async insertLearning(learn: Learning): Promise<any> {
        const newLearning = new this.learningModel(learn);
        return newLearning.save();
    }

    async getLearnings(): Promise<Learning[]> {
        return this.learningModel.find();
    }

    async getLearningsById(id: number): Promise<Learning> {
        const learning = this.learningModel.findById(id);
        if (!learning) {
            throw new NotFoundException('Could not find learning')
        }
        return learning;
    }

    async updateLearning({ imageUrl, courseName, description, url }, id: number): Promise<any> {

        const updatedProduct = await this.getLearningsById(id);
        if (imageUrl) {
            updatedProduct.imageUrl = imageUrl;
        }
        if (courseName) {
            updatedProduct.courseName = courseName;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (url) {
            updatedProduct.url = url;
        }
        return updatedProduct.save();
    }

    async deleteLearning(id: number): Promise<any> {
        return this.learningModel.deleteOne({ _id: id }).exec();
    }
}

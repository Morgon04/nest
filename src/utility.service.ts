import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {

    constants = Object.freeze({
        LEARNING_FETCH_SUCCESS: "Learnings Fetched Successfully",
        LEARNING_UPDATE_SUCCESS: "Learning Updated Successfully",
        LEARNING_CREATED_SUCCESS: "Learning Created Successfully",
        LEARNING_DELETED_SUCCESS: "Learning Deleted Successfully",
        NO_RECORD_FOUND: "No Record Found"
    });

    module = Object.freeze({
        learnFetch: this.constants.LEARNING_FETCH_SUCCESS,
        learnUpdate: this.constants.LEARNING_UPDATE_SUCCESS,
        learnCreate: this.constants.LEARNING_CREATED_SUCCESS,
        learnDelete: this.constants.LEARNING_DELETED_SUCCESS
    });

    getResponseCode(response: any): number {
        return ((response && Object.keys(response).length) || (Array.isArray(response) && response.length)) ? 200 : 204;
    }

    getDelResponseCode(response: any): number {
        return response && response.n ? 200 : 204;
    }

    getResponseMessage(res: any, moduleName: string): string {
        const code = moduleName === 'learnDelete' ? this.getDelResponseCode(res) : this.getResponseCode(res);
        return code === 200 ? this.module[moduleName] : this.constants.NO_RECORD_FOUND;
    }

    getResCodeAndMessage(res: any, moduleName: string): { code: number, message: string } {
        const code = moduleName === 'learnDelete' ? this.getDelResponseCode(res) : this.getResponseCode(res);
        return { code, message: this.getResponseMessage(res, moduleName) };
    }
}

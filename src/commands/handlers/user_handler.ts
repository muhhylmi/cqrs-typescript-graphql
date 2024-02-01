// userController.ts

import { Request, Response } from 'express';
import UseCase from '../use_case/use_case';
const useCase = new UseCase()

class UserHandler {

    async create(req: Request, res: Response) {
        try {
            const create = await useCase.createUser(req.body);
            res.status(201).json({
                status: "Created!",
                message: "Successfully request data",
                data: create
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}
export default new UserHandler();
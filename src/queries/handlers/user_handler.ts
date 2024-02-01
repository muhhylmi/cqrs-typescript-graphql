// userController.ts
import UseCase from '../use_case/use_case';
const useCase = new UseCase()

const userResolver = {
  Query: {
    users: async () => {
      return await useCase.findAll();
    },
  },
};

export default userResolver;

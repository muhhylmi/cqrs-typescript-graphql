import BaseRoutes from "../../helpers/router/base_routes";
import UserHandler from "../handlers/user_handler";

class UserRoutes extends BaseRoutes {
    public routes(): void {
      this.router.post("/commands", UserHandler.create);
    }
}
export default new UserRoutes().router

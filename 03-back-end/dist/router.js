"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Router {
    static setUpRoutes(application, resources, routers) {
        for (const router of routers) {
            router.setUpRoutes(application, resources);
        }
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map
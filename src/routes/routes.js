import config from "~/config";

import { HeaderOnly } from "~/layouts";

import Home from "~/pages/Home";
import Following from "~/pages/Following";
import Profile from "~/pages/Profile";
import Upload from "~/pages/Upload";
import Search from "~/pages/Search";
import Live from "~/pages/Live";
import Explore from "~/pages/Explore";
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.follow, component: Following },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.live, component: Live },
  { path: config.routes.explore, component: Explore },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };

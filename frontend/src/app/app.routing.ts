import { Routes, RouterModule } from "@angular/router";
import { AppURL } from "./app.url";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { UnauthenticationGuard } from "./guards/unauthentication.guard";

const routes: Routes = [
  { path: "", redirectTo: AppURL.Login, pathMatch: "full" },
  { path: AppURL.Login, component: LoginComponent, canActivate: [UnauthenticationGuard] },
  { path: AppURL.Register, component: RegisterComponent, canActivate: [UnauthenticationGuard] },
  {
    path: AppURL.Home,
    loadChildren: "./components/home/home.module#HomeModule",
    canActivate: [AuthenticationGuard]
  },
  // {
  //   path: AppURL.Assets,
  //   loadChildren: "./components/assets/assets.module#AssetsModule"
  // }
  // { path: AppURL.Store, loadChildren:'./components/home/store.module#HomeModule'}
];

export const AppRoutes = RouterModule.forRoot(routes);

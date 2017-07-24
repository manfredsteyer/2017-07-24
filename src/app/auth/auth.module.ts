
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    // LoginComponent, UserStatusComponent
  ],
  providers: [/*No providers!*/],
  exports: [
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    }
  }
}

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  protected readonly _isLoading = signal(false);

  protected readonly _email = signal<string>('');
  protected readonly _password = signal<string>('');
  protected readonly _errorMessage = signal<string>('');

  protected onSubmit(): void {
    this._errorMessage.set('');
    this._isLoading.set(true);

    this._authService
      .login({
        email: this._email().trim(),
        password: this._password(),
      })
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe({
        next: () => {
          void this._router.navigate(['/dashboard']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this._errorMessage.set('Adresse e-mail ou mot de passe incorrect.');
          } else if (error.status === 403) {
            this._errorMessage.set('Ce compte ne dispose pas des droits administrateur.');
          } else {
            this._errorMessage.set('Une erreur est survenue. Veuillez réessayer.');
          }
        },
      });
  }
}

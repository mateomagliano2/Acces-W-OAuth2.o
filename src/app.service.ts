import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>BIENVENIDO A LA UTN API</h1>
        <p>Trabajo Práctico - Autenticación con Google OAuth 2.0</p>
        <a href="/auth/google" style="text-decoration: none;">
          <button style="padding: 12px 24px; background-color: #4285F4; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
            Iniciar sesión con Google
          </button>
        </a>
      </div>
    `;
  }
}
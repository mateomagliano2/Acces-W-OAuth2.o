import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  
  // Ruta que redirige al usuario a la pantalla de Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {}

  // Ruta de callback a donde Google redirige tras la autenticación exitosa
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {
    // req.user contiene lo que devolvió la estrategia (el token JWT y el usuario)
    return {
      message: 'Usuario autenticado con éxito',
      data: req.user,
    };
  }
}
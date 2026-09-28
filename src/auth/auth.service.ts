import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleUser: {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    googleId: string;
  }) {
    // 1. Buscar si el usuario ya existe por su email o googleId
    let user = await this.prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    // 2. Si no existe, lo creamos en la base de datos relacional (MySQL)
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: googleUser.email,
          name: `${googleUser.firstName} ${googleUser.lastName}`,
          avatar: googleUser.picture,
          googleId: googleUser.googleId,
        },
      });
    }

    // 3. Generar el Token JWT firmado
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }
}
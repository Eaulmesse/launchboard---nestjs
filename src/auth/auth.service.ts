import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
    res: Response,
  ): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
  
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    
    res.cookie('access_token', token, {
      httpOnly: true, // Empêche l'accès au cookie via JavaScript côté client
      secure: process.env.NODE_ENV === 'production', // Active le cookie sécurisé en production
      sameSite: 'strict', // Empêche l'envoi du cookie sur des requêtes cross-site
      maxAge: 3600000, // Durée de vie du cookie (1 heure)
    });
  
    return { message: 'Login successful' };
  }

  // async logout(userId: string): Promise<void> {
  //   // Logique de déconnexion (par exemple, supprimer le token de session ou le marquer comme expiré)
  //   // Cela dépend de la façon dont vous gérez les sessions et les tokens dans votre application
  //   console.log(`User with ID ${userId} logged out`);
  // }
}

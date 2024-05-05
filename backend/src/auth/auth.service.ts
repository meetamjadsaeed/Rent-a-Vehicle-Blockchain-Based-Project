import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const { username, email, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<{ message: string; token: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT token (replace with your token generation logic)
      const token = this.generateJwtToken(user);
      return { message: "Login successful", token };
    } else {
      throw new UnauthorizedException("Invalid credentials");
    }
  }

  async logout() {
    // Implement logout logic if needed
  }

  private generateJwtToken(user: User): string {
    // Replace this with your JWT token generation logic
    // Example: return jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
    return "your_jwt_token";
  }
}

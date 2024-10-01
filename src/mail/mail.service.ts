import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../users/models/user.model";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: User) {
    const url = `${process.env.API_URL}:${process.env.PORT}/users/activate/${user.activation_link}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Activate your stadium-finder account",
      template: "./confirm",
      context: {
        full_name: user.full_name,
        url,
      },
    })
  }
}

import { Controller, Param, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('subscribe')
export class EmailController {
    constructor(private emailService: EmailService) {}

    @Post() 
    async subscribeEmail(@Param('email') email: String) {
        return this.emailService.subscribeEmail(email);
    }
}

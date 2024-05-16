import { Controller, Param, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) {}

    @Post('subscribe') 
    async subscribeEmail(@Param('email') email: String) {
        return this.emailService.subscribeEmail(email);
    }
}

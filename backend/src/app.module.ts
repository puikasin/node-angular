import { Module } from '@nestjs/common';
import { AppController } from 'controllers/app.controller';
import { AppService } from 'services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { memberSchema } from 'schemas/member.schema';
import { AccountController } from 'controllers/account.controller';
import { JwtAuthenService } from 'services/jwt-authen.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://psmart:SOMkid2042@ds143451.mlab.com:43451/db_smart', { useNewUrlParser: true }),
    MongooseModule.forFeature([
       { name: 'Member', schema: memberSchema },
    ])
  ],
  controllers: [
    AppController,
    AccountController
  ],
  providers: [
    AppService,
    JwtAuthenService
  ],
})
export class AppModule { }

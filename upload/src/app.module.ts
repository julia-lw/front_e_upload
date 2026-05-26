import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArquivoModule } from './arquivo/arquivo.module';

@Module({
  imports: [ArquivoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

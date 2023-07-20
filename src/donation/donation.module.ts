import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationController } from './donation.controller';
import { Donation } from './donation.entity';
import { DonationService } from './donation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Donation])],
  controllers: [DonationController],
  providers: [DonationService],
})
export class DonationModule {}

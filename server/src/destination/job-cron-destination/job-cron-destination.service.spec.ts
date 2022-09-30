import { Test, TestingModule } from '@nestjs/testing';
import { JobCronDestinationService } from './job-cron-destination.service';

describe('JobCronDestinationService', () => {
  let service: JobCronDestinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobCronDestinationService],
    }).compile();

    service = module.get<JobCronDestinationService>(JobCronDestinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

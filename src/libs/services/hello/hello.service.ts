import { HelloRepository } from '@libs/repositories';

class HelloService {
  private helloRepository: HelloRepository;

  constructor() {
    this.helloRepository = new HelloRepository();
  }

  getMessage(): string {
    return this.helloRepository.getMessage();
  }
}

export default new HelloService();

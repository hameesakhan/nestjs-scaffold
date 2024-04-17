import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService {
    public orm: TypeOrmModule
    constructor(config: ConfigService) {
        const database = () => config.get('database');
        this.orm = TypeOrmModule.forRoot({
            type: database().type,
            host: database().host,
            port: database().port,
            username: database().username,
            password: database().password,
            database: database().database,
            entities: [],
            synchronize: false,
        })
    }
}

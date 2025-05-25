import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types as MongooseTypes } from 'mongoose';

export class sendMessageDTO {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsMongoId()
  user: MongooseTypes.ObjectId;
}

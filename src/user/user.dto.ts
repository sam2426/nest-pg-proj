import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';

export class UserBody {
  @ApiProperty({ type: 'string', required: false })
  name: string;

  @ApiProperty({ type: 'string', required: true })
  email: string;
}

export const UserRequestBody: ApiResponseOptions = {
  description: 'Request schema',
  type: UserBody,
};

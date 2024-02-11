import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';

export class PostBody {
  @ApiProperty({ type: 'string', required: true })
  title: string;

  @ApiProperty({ type: 'string', required: false })
  content: string;

  @ApiProperty({ type: 'string', required: true })
  authorEmail: string;
}

export const PostRequestBody: ApiResponseOptions = {
  description: 'Request schema',
  type: PostBody,
};

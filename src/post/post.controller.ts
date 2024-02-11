import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PostRequestBody } from './post.dto';

@Controller()
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('post/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get details of one Post.' })
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('feed')
  @ApiOperation({ summary: 'Get List of Post which are Published.' })
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  @ApiParam({ name: 'searchString' })
  @ApiOperation({ summary: 'Search Posts by title or content.' })
  async getFilteredPosts(@Param('searchString') searchString: string): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post')
  @ApiOperation({ summary: 'Create new Posts.' })
  @ApiBody(PostRequestBody)
  async createDraft(@Body() postData: { title: string; content?: string; authorEmail: string }): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put('publish/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Publish an unpublished Post.' })
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete a Post' })
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}

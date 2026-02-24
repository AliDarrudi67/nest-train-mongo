import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogCategoryController } from './blog-category.controller';
import { BlogCategoryService } from './blog-category.service';
import {
  BlogCategory,
  blogCategorySchema,
} from './schemas/blog-category.schema';

@Module({
  controllers: [BlogCategoryController],
  providers: [BlogCategoryService],

  imports: [
    MongooseModule.forFeature([
      { name: BlogCategory.name, schema: blogCategorySchema },
    ]),
  ],
})
export class BlogCategoryModule {}

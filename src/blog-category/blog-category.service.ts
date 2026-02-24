import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { BlogCategory } from './schemas/blog-category.schema';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectModel(BlogCategory.name)
    private readonly categoryModel: Model<BlogCategory>,
  ) {}
  async create(createBlogCategoryDto: CreateBlogCategoryDto) {
    console.log(createBlogCategoryDto);
    const newCategory = new this.categoryModel(createBlogCategoryDto);
    await newCategory.save();
    return newCategory;
  }

  findAll() {
    return `This action returns all blogCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogCategory`;
  }

  async update(id: number, updateBlogCategoryDto: UpdateBlogCategoryDto) {
    return await this.categoryModel.findByIdAndUpdate(
      id,
      updateBlogCategoryDto,
      {
        new: true,
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} blogCategory`;
  }
}

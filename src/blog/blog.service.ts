import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const newBlog = new this.blogModel(createBlogDto);
    await newBlog.save();
    return newBlog;
  }

  async findAll() {
    return await this.blogModel.find().exec();
  }

  async findOne(id: string) {
    const blog = await this.blogModel.findOne({ _id: id }).exec();
    if (blog) return blog;
    throw new NotFoundException();
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const blog = await this.findOne(id);
    if (!blog) return null;

    Object.assign(blog, updateBlogDto);

    await blog.save();
    return blog;
  }

  async remove(id: string) {
    const blog = await this.findOne(id);
    await blog.deleteOne();
  }
}

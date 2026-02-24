import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sort } from 'src/shared/dtos/general-query.dto';
import { sortFunction } from 'src/shared/utils';
import { BlogQueryDto } from './dto/blog-query.dto';
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

  async findAll(queryParams: BlogQueryDto, selectObject: any = { __v: 0 }) {
    const { limit = 10, page = 1, title, sort } = queryParams;
    const query: any = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    let sortObject: any = {};
    if (sort) sortObject = sortFunction(sort);
    if (queryParams.sort == Sort.Title) sortObject = { title: 1 };
    else if (queryParams.sort == Sort.CreatedAt) sortObject = { createdAt: -1 };
    else sortObject = { updatedAt: -1 };

    const blogs = await this.blogModel
      .find(query)
      .skip(page - 1)
      .sort(sortObject)
      .limit(limit)
      .select(selectObject)
      .populate('category', { title: 1 })
      .exec();
    const count = await this.blogModel.countDocuments();
    return { count, blogs };
  }

  async findOne(id: string, selectObject: any = { __v: 0 }) {
    const blog = await this.blogModel
      .findOne({ _id: id })
      .select(selectObject)
      .populate('category', { title: 1 })
      .exec();
    if (blog) return blog;
    throw new NotFoundException();
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    return await this.blogModel.findByIdAndUpdate(id, updateBlogDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const blog = await this.findOne(id, { _id: 1 });
    await blog.deleteOne();
  }
}

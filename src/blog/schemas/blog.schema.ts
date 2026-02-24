import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BlogCategory } from 'src/blog-category/schemas/blog-category.schema';
@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop({
    type: Types.ObjectId,
    ref: BlogCategory.name,
    required: true,
  })
  category: BlogCategory;
}
export const blogSchema = SchemaFactory.createForClass(Blog);

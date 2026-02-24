import { Sort } from './dtos/general-query.dto';

export const sortFunction = (sort: Sort) => {
  let sortObject: any = {};
  if (sort == Sort.Title) sortObject = { title: 1 };
  else if (sort == Sort.CreatedAt) sortObject = { createdAt: -1 };
  else sortObject = { updatedAt: -1 };
  return sortObject;
};

import Category from '../models/Category';

export function getCategories () {
  return Category.query();
}
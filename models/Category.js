import { Model } from 'objection';

export default class Category extends Model {
  static tableName = 'Category';

  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: {type: 'integer'},
      name: {type: 'string', minLength: 1, maxLength: 255}
    }
  };

  static relationMappings = {
    owner: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/Song`,
      join: {
        from: 'Category.id',
        to: 'Song.category_id'
      }
    }
  };
}
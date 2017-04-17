import { Model } from 'objection';

export default class Song extends Model {
  static tableName = 'Song';

  static jsonSchema = {
    type: 'object',
    required: ['title', 'lyrics', 'category_id'],
    properties: {
      id: {type: 'integer'},
      title: {type: 'string', minLength: 1, maxLength: 255},
      lyrics: {type: 'string'},
      category_id: {type: 'integer'},
      dirty: {type: 'boolean'},
      disabled: {type: 'boolean'}
    }
  };

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/Category`,
      join: {
        from: 'Song.category_id',
        to: 'Category.id'
      }
    }
  };
}

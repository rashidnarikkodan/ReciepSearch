import type { Model } from 'mongoose';
import type {
  IBaseRepository,
  RepositoryFilter,
  RepositoryUpdate,
} from '../../interfaces/base.repository.interface.js';

export abstract class BaseMongoRepository<TDocument, TCreateInput = Partial<TDocument>>
  implements IBaseRepository<TDocument, TCreateInput>
{
  constructor(protected readonly model: Model<TDocument>) {}

  public async findById(id: string): Promise<TDocument | null> {
    return this.model.findById(id).exec() as unknown as Promise<TDocument | null>;
  }

  public async findOne(filter: RepositoryFilter): Promise<TDocument | null> {
    return this.model.findOne(filter as any).exec() as unknown as Promise<TDocument | null>;
  }

  public async find(
    filter: RepositoryFilter = {},
    options?: any
  ): Promise<TDocument[]> {
    return this.model.find(filter as any, null, options).exec() as unknown as Promise<TDocument[]>;
  }

  public async create(data: TCreateInput): Promise<TDocument> {
    return (this.model as any).create(data);
  }

  public async update(
    id: string,
    update: RepositoryUpdate
  ): Promise<TDocument | null> {
    return this.model.findByIdAndUpdate(id, update as any, { new: true }).exec();
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  public async count(filter: RepositoryFilter = {}): Promise<number> {
    return this.model.countDocuments(filter as any).exec();
  }
}

export type RepositoryFilter = Record<string, any>;
export type RepositoryUpdate = Record<string, any>;

export interface IBaseRepository<TDocument, TCreateInput = Partial<TDocument>> {
  findById(id: string): Promise<TDocument | null>;
  findOne(filter: RepositoryFilter): Promise<TDocument | null>;
  find(filter?: RepositoryFilter, options?: any): Promise<TDocument[]>;
  create(data: TCreateInput): Promise<TDocument>;
  update(id: string, update: RepositoryUpdate): Promise<TDocument | null>;
  delete(id: string): Promise<boolean>;
  count(filter?: RepositoryFilter): Promise<number>;
}

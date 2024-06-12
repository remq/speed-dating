export interface IFileRepository {
  uploadFile(id: string, filePath: string): Promise<string>;
  deleteFile(id: string): Promise<void>;
}

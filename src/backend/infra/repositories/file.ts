import { IFileRepository } from "@backend/app/repositories/file";
import { del, put } from "@vercel/blob";

export class FileRepository implements IFileRepository {
  async uploadFile(id: string, file: Blob): Promise<string> {
    const result = await put(`${id}.jpg`, file, {
      access: "public",
      contentType: "image/jpeg",
    });
    return result.url;
  }

  async deleteFile(...urls: string[]): Promise<void> {
    await del(urls);
  }
}

import { IFileRepository } from "@backend/app/repositories/file";
import { del, put } from "@vercel/blob";
import fs from "fs/promises";

export class FileRepository implements IFileRepository {
  async uploadFile(id: string, filePath: string): Promise<string> {
    const blob = await fs.readFile(filePath);
    const result = await put(`${id}.jpg`, blob, {
      access: "public",
      contentType: "image/jpeg",
    });
    return result.url;
  }

  async deleteFile(...urls: string[]): Promise<void> {
    await del(urls);
  }
}

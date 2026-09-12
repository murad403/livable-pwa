"use server";
import { cookies } from "next/headers"

export const saveToken = async (access: string, refresh?: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set("access", access);
  if (refresh) {
    cookieStore.set("refresh", refresh);
  }
}

export const getCurrentUser = async (): Promise<{ access: string | undefined; refresh: string | undefined }> => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const refresh = cookieStore.get("refresh")?.value;
  return { access, refresh };
};

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access");
  cookieStore.delete("refresh");
}
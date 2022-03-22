import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { AxiosRequestConfig } from "axios";
import service from "../utils/http";
import { apiUrl } from "utils/http";
import { IAlbum } from "types";

interface INewAlbum {
  name: string;
  coverPage: string;
  photos: string[];
}

interface INewPhoto {
  name: string;
  id: string;
  photos: string[];
}

export const useNewAlbum = () => {
  return useMutation(async ({ name, coverPage, photos }: INewAlbum) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("coverPage", coverPage[0]);
    Array.from(photos).forEach((photo) =>
      formData.append("photos", photo as string)
    );

    const config: AxiosRequestConfig = {
      method: "post",
      url: `${apiUrl}/albums`,
      data: formData,
    };
    // return service(config);
    return await service(config);
  });
};

export const useUpdatePhotos = () => {
  return useMutation(
    async ({ formData, id }: { formData: FormData | string[]; id: string }) => {
      console.log(formData);
      const config: AxiosRequestConfig = {
        method: "patch",
        url: `${apiUrl}/albums/${id}`,
        data: formData,
      };
      // return service(config);
      return await service(config);
    }
  );
};

export const useCoverpages = () => {
  return useQuery(["coverPages"], async () => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${apiUrl}/albums/coverpages`,
    };

    const data: { data: Omit<IAlbum, "photos">[] } = await service(config);

    return data.data;
  });
};

export const useAlbum = (id: string) => {
  return useQuery(["album"], async () => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${apiUrl}/albums/${id}`,
    };

    const data: { data: IAlbum } = await service(config);
    return data.data.photos;
  });
};

export const useDeleteAlbum = () => {
  return useMutation(async ({ id }: { id: string }) => {
    const config: AxiosRequestConfig = {
      method: "delete",
      url: `${apiUrl}/albums/${id}`,
      //   data: formData,
    };
    // return service(config);
    return await service(config);
  });
};

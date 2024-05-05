import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProduct,
  getProducts,
  getProjects,
  getTodo,
  getTodoIds,
} from "./api";
import { Product } from "../types/product";

export const useTodoIds = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodoIds,
  });
};

export const useTodos = (ids: (number | undefined)[] | undefined) => {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todo", { id }],
        queryFn: () => getTodo(id!),
      };
    }),
  });
};

export const useProjects = (page: number) => {
  return useQuery({
    queryKey: ["projects", { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  });
};

export const useProducts = () => {
  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getProducts({ pageParam }),
    getNextPageParam: (lastpage, _, lastPageParam) => {
      return lastpage.length === 0 ? undefined : lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      return firstPageParam <= 1 ? undefined : firstPageParam - 1;
    },
  });
};

export const useProduct = (id: number | null) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProduct(id!),
    enabled: !!id,
    placeholderData: () => {
      const cachedProducts = (
        queryClient.getQueryData(["products"]) as {
          pages: Product[] | undefined;
        }
      )?.pages?.flat(2);
      if (cachedProducts) {
        const product = cachedProducts.find(
          ({ id: productId }) => productId === id
        );
        if (product) {
          product!.name = "vishu";
        }
        return product;
      }
    },
  });
};

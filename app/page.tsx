"use client";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Nft from "@/components/Nft";

async function getNFTs({ pageParam }: { pageParam: number }) {
  const res = await fetch(
    `https://qrc721api.amnst.tech/api/nfts?limit=20&page=${pageParam}`
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  const { nfts, totalPages, totalCount, currentPage } = data;

  return { nfts, totalPages, totalCount, currentPage };
}

export default function Home() {
  const { ref, inView } = useInView();

  const {
    data: nfts,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["nfts"],
    queryFn: getNFTs,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage.totalPages;
      const currentPage = lastPage.currentPage;

      // Check if there are more pages to fetch
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="mt-4 text-3xl">Welcome to Quai NFT Marketplace!</h2>
      <div className="w-full md:w-10/12 m-auto flex mt-5 mb-5 flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:grid-row-1 md:items-center gap-4">
        {nfts?.pages?.map((page, pageIndex) =>
          page.nfts.map((nft: any, index: number) => (
            <Nft
              image={nft.imageUri}
              name={nft.name}
              key={pageIndex * 20 + index}
              innerRef={ref}
            />
          ))
        )}
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </main>
  );
}

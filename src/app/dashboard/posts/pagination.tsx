"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationDisplay = {
  isStartEllipsis: boolean;
  pagesDisplay: { pageNumber: number; isActive: boolean }[];
  isEndEllipsis: boolean;
};

const generatePagination = (
  totalPages: number,
  currentPage: number
): PaginationDisplay => {
  const isStartEllipsis = (): boolean => {
    if (totalPages < 3) {
      return false;
    } else {
      return currentPage >= 3;
    }
  };

  const isEndEllipsis = (): boolean => {
    if (totalPages < 3) {
      return false;
    }

    if (currentPage < totalPages - 1) {
      return true;
    }

    return false;
  };

  const generatePages = (): { pageNumber: number; isActive: boolean }[] => {
    if (totalPages < 3) {
      return Array.from({ length: totalPages }, (_, index) => {
        return { pageNumber: index + 1, isActive: index + 1 === currentPage };
      });
    }

    if (currentPage === 1) {
      return [
        { pageNumber: 1, isActive: true },
        { pageNumber: 2, isActive: false },
        { pageNumber: 3, isActive: false },
      ];
    }

    if (currentPage === totalPages) {
      return [
        { pageNumber: totalPages - 2, isActive: false },
        { pageNumber: totalPages - 1, isActive: false },
        { pageNumber: totalPages, isActive: true },
      ];
    }

    return [
      { pageNumber: currentPage - 1, isActive: false },
      { pageNumber: currentPage, isActive: true },
      { pageNumber: currentPage + 1, isActive: false },
    ];
  };

  let paginationDisplay: PaginationDisplay = {
    isStartEllipsis: isStartEllipsis(),
    pagesDisplay: generatePages(),
    isEndEllipsis: isEndEllipsis(),
  };

  return paginationDisplay;
};

const PostPagination = ({ totalPages }: { totalPages: number }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "0", 10);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathName}?${params.toString()}`;
  };

  const allPages = generatePagination(totalPages, currentPage);

  return (
    <div className=" w-full max-w-[810px] p-4">
      <Pagination>
        <PaginationContent>
          {/* previous */}
          <PaginationItem>
            <Link href={isFirstPage ? "" : createPageURL(currentPage - 1)}>
              <Button
                aria-disabled={isFirstPage}
                className="gap-2"
                variant={"ghost"}
                disabled={isFirstPage}
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
            </Link>
          </PaginationItem>

          {/* startEllipsis */}
          {allPages.isStartEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* pages */}
          {allPages.pagesDisplay.map((page) => {
            return (
              <PaginationItem key={page.pageNumber}>
                <PaginationLink
                  href={createPageURL(page.pageNumber)}
                  isActive={page.isActive}
                >
                  {page.pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* endEllipsis */}
          {allPages.isEndEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <Link href={isLastPage ? "" : createPageURL(currentPage + 1)}>
              <Button
                aria-disabled={isLastPage}
                className="gap-2"
                variant={"ghost"}
                disabled={isLastPage}
              >
                Next
                <ChevronRight size={16} />
              </Button>
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PostPagination;

import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Layout>
      <LayoutTitle className="flex flex-col items-start gap-4 w-full">
        <Skeleton className="h-[48px] w-[250px]" />
        <Skeleton className="h-[28px] w-[230px] mt-2" />
      </LayoutTitle>
      <LayoutContent className="flex flex-col gap-4">
        <div className="flex  flex-row flex-wrap md:flex-nowrap   gap-4 ">
          {/* LeftCards */}
          <div className="test w-full md:w-1/2 md:grow md:h-full ">
            <div className="flex flex-col md:h-full gap-4">
              {/* Welcome card */}
              <Card>
                <Skeleton className="h-[140px]" />
              </Card>
              <Card>
                <Skeleton className="h-[260px]" />
              </Card>
            </div>
          </div>
          {/* right Cards */}
          <div className="test w-full md:h-full md:w-1/2 md:grow   ">
            <Card className="md:h-full flex flex-col flex-grow">
              <Skeleton className="h-full min-h-[420p]" />
            </Card>
          </div>
        </div>
        {/* last2PowerPostCard */}

        <Card>
          <Skeleton className="min-h-[470px]" />
        </Card>
      </LayoutContent>
    </Layout>
  );
}

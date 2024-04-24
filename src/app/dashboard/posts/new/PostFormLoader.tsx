"use client";
import usePostCreationStatus from "@/app/hook/Posts/usePostCreationStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheckBig, CircleDashed, LoaderCircle } from "lucide-react";

export const PostFormLoader = () => {
  const { stages, stageInProgress } = usePostCreationStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{stageInProgress?.description}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap w-full justify-center gap-6">
        {stages.map((stage) => {
          return (
            // <>
            <Card key={stage.name}>
              <CardHeader>
                <CardTitle className="flex justify-center">
                  {stage.done ? (
                    <CircleCheckBig />
                  ) : stage.loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <CircleDashed />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex max-w-32 justify-center items-center text-center">
                {stage.title}
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

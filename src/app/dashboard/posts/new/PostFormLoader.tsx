import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PostFormLoader = () => {
  console.log("test");
  return (
    <Card>
      <CardHeader>
        <CardTitle>The post is creating...</CardTitle>
      </CardHeader>
      <CardContent>Des phrases qui tournent</CardContent>
    </Card>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NewsPropal = async () => {
  const news = await fetch(
    `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.NEWS_API_KEY}&language=en&categories=tech&limit=3`
  ).then((res) => res.json());

  return (
    <Card>
      <CardHeader>
        <CardTitle>News</CardTitle>
        <CardDescription>Find the latest news in tech</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {news.data.map((article: { title: string; url: string }) => (
          <div key={article.url} className="underline">
            <a href={article.url} target="_blank" rel="noreferrer">
              {article.title}
            </a>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewsPropal;

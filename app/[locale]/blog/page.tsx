import { BlogPosts } from "@/app/components/posts";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <Separator className="my-4 data-horizontal:w-4/5" />
      <BlogPosts />
    </section>
  );
}

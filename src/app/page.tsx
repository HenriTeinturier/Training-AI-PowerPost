import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import {
  ArrowRight,
  Brain,
  Check,
  CircleUserRound,
  LayoutList,
  Star,
  Twitter,
} from "lucide-react";
import { auth } from "@/auth/helper";
import { redirect } from "next/navigation";
import { CreatePostImg } from "./CreatePostImg";
import Link from "next/link";
import SignInButton from "@/components/features/auth/SignInButton";
import CreateLogo from "@/components/features/layout/CreateLogo";
import {
  LayoutSubTitle,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function Home() {
  const user = await auth();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex-grow">
      {/* presentation section */}
      <section className="bg-background ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          {/* Link to paiement information */}
          <Link
            href="/#payment-section"
            className="inline-flex justify-between items-center py-1 px-1 pr-4  text-sm text-muted-foreground  bg-card  hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            role="alert"
          >
            <span className="text-xs bg-primary text-white rounded-full  px-4 py-1.5 mr-3">
              New
            </span>{" "}
            <span className="text-sm font-medium">
              PowerPost credits are now available
            </span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
          {/* Title primary */}

          {/* description */}

          <div className=" items-center justify-center flex flex-col  gap-4  my-8 ">
            {/* <CreateLogo size={"big"} text={false} /> */}
            <div className="flex flex-col gap-2 items-center">
              {/* <LayoutTitle>PowerPost</LayoutTitle> */}
              <Card>
                <CardHeader>
                  <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-foreground md:text-5xl lg:text-6xl ">
                    Stop wasting time reading.
                  </h1>
                </CardHeader>
                <CardContent>
                  <LayoutSubTitle>Resume article with AI</LayoutSubTitle>
                  <p className="mb-8 text-lg font-normal text-muted-foreground lg:text-xl sm:px-16 xl:px-48 ">
                    PowerPost is a new way to read post and article in a short
                    time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* logo (ai, stripe, nextjs) wrapper */}
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            {/* title logo section */}
            <span className="font-semibold text-gray-400 uppercase">
              BUILT WITH
            </span>
            {/* wrapper logo description */}
            <div className="flex flex-wrap justify-around items-center mt-4 text-gray-500  ">
              <div className="flex items-center gap-2   hover:text-gray-800 dark:hover:text-gray-400 mx-2">
                <div className="md:w-8 w-6">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>OpenAI icon</title>
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                  </svg>
                </div>
                <Typography variant={"h2"}>OpenAI</Typography>
              </div>
              <div className="flex items-center gap-2 hover:text-gray-800 dark:hover:text-gray-400 mx-2">
                <div className="md:w-8 w-6">
                  <svg
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <circle cx="512" cy="512" r="512" />
                    <path
                      d="M781.67 515.75c0-38.35-18.58-68.62-54.08-68.62s-57.23 30.26-57.23 68.32c0 45.09 25.47 67.87 62 67.87 17.83 0 31.31-4 41.5-9.74v-30c-10.19 5.09-21.87 8.24-36.7 8.24-14.53 0-27.42-5.09-29.06-22.77h73.26c.01-1.92.31-9.71.31-13.3zm-74-14.23c0-16.93 10.34-24 19.78-24 9.14 0 18.88 7 18.88 24zm-95.14-54.39a42.32 42.32 0 0 0-29.36 11.69l-1.95-9.29h-33v174.68l37.45-7.94.15-42.4c5.39 3.9 13.33 9.44 26.52 9.44 26.82 0 51.24-21.57 51.24-69.06-.12-43.45-24.84-67.12-51.05-67.12zm-9 103.22c-8.84 0-14.08-3.15-17.68-7l-.15-55.58c3.9-4.34 9.29-7.34 17.83-7.34 13.63 0 23.07 15.28 23.07 34.91.01 20.03-9.28 35.01-23.06 35.01zM496.72 438.29l37.6-8.09v-30.41l-37.6 7.94v30.56zm0 11.39h37.6v131.09h-37.6zm-40.3 11.08L454 449.68h-32.34v131.08h37.45v-88.84c8.84-11.54 23.82-9.44 28.46-7.79v-34.45c-4.78-1.8-22.31-5.1-31.15 11.08zm-74.91-43.59L345 425l-.15 120c0 22.17 16.63 38.5 38.8 38.5 12.28 0 21.27-2.25 26.22-4.94v-30.45c-4.79 1.95-28.46 8.84-28.46-13.33v-53.19h28.46v-31.91h-28.51zm-101.27 70.56c0-5.84 4.79-8.09 12.73-8.09a83.56 83.56 0 0 1 37.15 9.59V454a98.8 98.8 0 0 0-37.12-6.87c-30.41 0-50.64 15.88-50.64 42.4 0 41.35 56.93 34.76 56.93 52.58 0 6.89-6 9.14-14.38 9.14-12.43 0-28.32-5.09-40.9-12v35.66a103.85 103.85 0 0 0 40.9 8.54c31.16 0 52.58-15.43 52.58-42.25-.17-44.63-57.25-36.69-57.25-53.47z"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <Typography variant={"h2"}>Stripe</Typography>
              </div>
              <div className="flex items-center gap-2 hover:text-gray-800 dark:hover:text-gray-400 mx-2">
                <div className="md:w-8 w-6">
                  <svg
                    viewBox="0 0 256 256"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid"
                  >
                    <g>
                      <path
                        d="M119.616813,0.0688905149 C119.066276,0.118932037 117.314565,0.294077364 115.738025,0.419181169 C79.3775171,3.69690087 45.3192571,23.3131775 23.7481916,53.4631946 C11.7364614,70.2271045 4.05395894,89.2428829 1.15112414,109.384595 C0.12512219,116.415429 0,118.492153 0,128.025062 C0,137.557972 0.12512219,139.634696 1.15112414,146.665529 C8.10791789,194.730411 42.3163245,235.11392 88.7116325,250.076335 C97.0197458,252.753556 105.778299,254.580072 115.738025,255.680985 C119.616813,256.106338 136.383187,256.106338 140.261975,255.680985 C157.453763,253.779407 172.017986,249.525878 186.382014,242.194795 C188.584164,241.068861 189.00958,240.768612 188.709286,240.518404 C188.509091,240.36828 179.124927,227.782837 167.86393,212.570214 L147.393939,184.922273 L121.743891,146.965779 C107.630108,126.098464 96.0187683,109.034305 95.9186706,109.034305 C95.8185728,109.009284 95.7184751,125.873277 95.6684262,146.465363 C95.5933529,182.52028 95.5683284,183.971484 95.1178886,184.82219 C94.4672532,186.048207 93.9667644,186.548623 92.915738,187.099079 C92.114956,187.499411 91.4142717,187.574474 87.6355816,187.574474 L83.3063539,187.574474 L82.1552297,186.848872 C81.4044966,186.373477 80.8539589,185.747958 80.4785924,185.022356 L79.9530792,183.896422 L80.0031281,133.729796 L80.0782014,83.5381493 L80.8539589,82.5623397 C81.25435,82.0369037 82.1051808,81.3613431 82.7057674,81.0360732 C83.7317693,80.535658 84.1321603,80.4856165 88.4613881,80.4856165 C93.5663734,80.4856165 94.4172043,80.6857826 95.7434995,82.1369867 C96.1188661,82.5373189 110.007429,103.454675 126.623656,128.650581 C143.239883,153.846488 165.962072,188.250034 177.122972,205.139048 L197.392766,235.839522 L198.418768,235.163961 C207.502639,229.259062 217.112023,220.852086 224.719453,212.09482 C240.910264,193.504394 251.345455,170.835585 254.848876,146.665529 C255.874878,139.634696 256,137.557972 256,128.025062 C256,118.492153 255.874878,116.415429 254.848876,109.384595 C247.892082,61.3197135 213.683675,20.9362052 167.288368,5.97379012 C159.105376,3.32158945 150.396872,1.49507389 140.637341,0.394160408 C138.234995,0.143952798 121.693842,-0.131275573 119.616813,0.0688905149 L119.616813,0.0688905149 Z M172.017986,77.4831252 C173.219159,78.0836234 174.195112,79.2345784 174.545455,80.435575 C174.74565,81.0861148 174.795699,94.9976579 174.74565,126.348671 L174.670577,171.336 L166.73783,159.17591 L158.780059,147.01582 L158.780059,114.313685 C158.780059,93.1711423 158.880156,81.2862808 159.030303,80.7108033 C159.430694,79.3096407 160.306549,78.2087272 161.507722,77.5581875 C162.533724,77.0327515 162.909091,76.98271 166.837928,76.98271 C170.541544,76.98271 171.19218,77.0327515 172.017986,77.4831252 Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </div>
                <Typography variant={"h2"}>Nextjs</Typography>
              </div>
            </div>
          </div>
          {/* Start for Free section */}
          <div className="pt-8 px-4 mx-auto max-w-screen-xl  lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                ⚡ 5 PowerPosts provided. No credit card required ⚡
              </p>
              <SignInButton />
            </div>
          </div>
        </div>
      </section>
      {/* exemple section */}
      <section className="bg-muted">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <div className="w-full rounded-xl border border-primary">
            <CreatePostImg />
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-foreground">
              Built for those who frequently read articles on the internet.
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              Enhancing Your Reading Experience Online. Explore More, Read More:
              Your Gateway to Online Articles
            </p>
            <SignInButton />
          </div>
        </div>
      </section>
      {/* cards options section */}
      <section className="bg-background">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-muted-foreground ">
              Designed for Avid Online Article Readers
            </h2>
            <p className="text-foreground sm:text-xl ">
              Enhancing Your Online Reading Experience: Dive Deeper into the
              World of Articles with Our Advanced Summaries. Explore More, Read
              More, and Gain Insight Faster Than Ever Before. Your Comprehensive
              Gateway to Engaging, Informative, and Diverse Online Articles
              Across All Topics.
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <Brain />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Short</h3>
              <p className="text-gray-500 dark:text-gray-400">
                This option delivers a very concise summary of the article,
                perfect for quickly capturing the key ideas in just a few
                sentences. Ideal for those who are short on time but still want
                to stay informed.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <Twitter />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Tweet</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Provides a summary that fits into a single tweet, allowing users
                to grasp the essence of the article in 280 characters or less.
                This is great for sharing quick insights on social media.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Thread</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Offers a detailed breakdown in the form of a Twitter thread.
                Each tweet in the thread explores a different aspect or detail
                of the article, providing a more comprehensive understanding.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <Star />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Top 3</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Summarizes the three most important points of the article. This
                option highlights the crucial takeaways, making it easy for
                readers to focus on the major insights.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Main Points
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {
                  " This feature extracts and presents the main points of the article in a straightforward, easy-to-understand list. It's useful for readers who want a clear outline of the article without extra details."
                }
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <LayoutList />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Bullets Points
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Creates a summary in bullet points, offering a quick and easy
                way to digest the article’s content. This format is helpful for
                those who prefer scanning through key facts and figures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment section */}
      <section className="bg-muted" id="payment-section">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-foreground">
              Pay what you use
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl">
              We use a simple token system to pay for your usage.
            </p>
          </div>

          <div className="flex max-lg:flex-col gap-10">
            {/* <!-- Pricing Card --> */}
            <div className="flex flex-col p-6 mx-auto max-w-md w-full text-center bg-card rounded-lg border border-bg-card shadow  xl:p-8 ">
              <h3 className="mb-4 text-2xl font-semibold">Free</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                5 tokens to start with, no credit card required.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$0</span>
              </div>
              {/* <!-- List --> */}
              <ul
                role="list"
                className="mb-8 space-y-4 text-left  flex flex-col flex-grow"
              >
                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>Get 5 tokens for free</span>
                </li>
                {/* <!-- List --> */}

                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>openai GPT 3.5</span>
                </li>
              </ul>
              <SignInButton />
            </div>
            {/* <!-- Pricing Card --> */}
            <div className="flex flex-col p-6 mx-auto max-w-md w-full text-center bg-card rounded-lg border border-bg-card shadow  xl:p-8 ">
              <h3 className="mb-4 text-2xl font-semibold">Free</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Add 15 Powerpost to your account
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$0</span>
              </div>
              {/* <!-- List --> */}
              <ul
                role="list"
                className="mb-8 space-y-4 text-left flex flex-col flex-grow"
              >
                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>15 Powerpost</span>
                </li>
                {/* <!-- List --> */}

                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>openai GPT 4</span>
                </li>
              </ul>
              <SignInButton />
            </div>
            {/* <!-- Pricing Card --> */}
            <div className="flex flex-col p-6 mx-auto max-w-md w-full text-center bg-card rounded-lg border border-bg-card shadow  xl:p-8 t">
              <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                get 40 powerpost every months.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$9</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              {/* <!-- List --> */}
              <ul
                role="list"
                className="mb-8 space-y-4 text-left  flex flex-col flex-grow"
              >
                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>40 powerpost</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>openai GPT 4</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>AI Chat for every post</span>
                </li>
              </ul>
              <SignInButton />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

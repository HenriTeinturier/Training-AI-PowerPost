export const getServerUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // If we are in production, we return the production URL. (FOR VERCEL DEPLOIEMENT)
  if (process.env.VERCEL_ENV === "production") {
    return "https://www.powerpost.henriteinturier.com";
  }

  return "http://localhost:3000";
};

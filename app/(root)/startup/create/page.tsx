import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="hero_container">
        <h1 className="heading">Submit Your Startup</h1>
        <p className="sub-heading">
          Share your innovative idea with the community
        </p>
      </section>

      <StartupForm />
    </>
  );
};

export default page;

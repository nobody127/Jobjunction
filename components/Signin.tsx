import { signIn } from "@/auth";

export default function SigninForm() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
      className="flex gap-4"
    >
      <input name="email" type="email" required className="border-2" />
      <br />
      <input name="username" type="text" required className="border-2" />
      <br />
      <input type="password" name="password" required className="border-2" />

      <button>Signin</button>
    </form>
  );
}

// action={async (data: FormData) => {
//     "use server";
//     console.log(data);
//   }}

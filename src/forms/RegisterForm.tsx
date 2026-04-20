import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import Select from "../components/Select";
import Textarea from "../components/Textarea";
import Button from "../components/Button";

const schema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Minimal 8 karakter"),
  event: z.string().min(1, "Pilih event"),
  bio: z.string().optional(),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    await new Promise((res) => setTimeout(res, 2000));
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          Daftar
        </h2>

        <Input
          label="Nama"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <Input
          label="Email"
          name="email"
          register={register}
          error={errors.email?.message}
        />

        <PasswordInput
          label="Password"
          name="password"
          register={register}
          error={errors.password?.message}
        />

        <Select
          label="Event"
          name="event"
          register={register}
          error={errors.event?.message}
          options={[
            { label: "Invofest", value: "invofest" },
            { label: "Workshop AI", value: "ai" },
          ]}
        />

        <Textarea
          label="Bio"
          name="bio"
          register={register}
          error={errors.bio?.message}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-black text-white py-2 rounded-md text-sm hover:opacity-90 transition"
        >
          {isSubmitting ? "Loading..." : "Daftar"}
        </button>

        <p className="text-xs text-center text-gray-400 mt-2">
          Sudah punya akun?{" "}
          <span className="underline cursor-pointer">Login</span>
        </p>
      </form>
    </div>
  );
}
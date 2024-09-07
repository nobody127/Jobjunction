"use client";

import { UpdateUserInfo } from "@/app/actions/users/updateUserInfo";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { userProfileUpdateSchema, userProfileUpdateType } from "@/schema/auth";
import { refetchAtom, universalError } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function EditUserProfileDialog({
  id,
  bio,
  linkedin_url,
  twitter_url,
  instagram_url,
}: {
  id: string;
  bio: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const setError = useSetRecoilState(universalError);
  const setRefetch = useSetRecoilState(refetchAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userProfileUpdateType>({
    resolver: zodResolver(userProfileUpdateSchema),
  });

  async function updatedUser(data: userProfileUpdateType) {
    setLoader(true);
    try {
      const res = await UpdateUserInfo(
        id,
        data.bio,
        data.instagram_url,
        data.twitter_url,
        data.linkedin_url
      );

      if (res.status !== 200) throw new Error(res.message);

      setRefetch((prev) => !prev);
    } catch (error) {
      setError({
        status: true,
        message: (error as Error).message,
      });
    } finally {
      setModalOpen(false);
      setLoader(false);
    }
  }

  return (
    <div>
      <AlertDialog open={modalOpen}>
        <AlertDialogTrigger>
          <div
            className="flex gap-2 items-center border-2 border-slate-200 p-2 rounded-full cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <PenIcon className="size-4" />
            <p className="text-sm md:text-lg">Edit</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-md max-w-[300px] sm:max-w-[400px] md:max-w-[450px]">
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogTitle className="mx-auto">
                Edit Information
              </AlertDialogTitle>
              <X
                className="size-4 cursor-pointer"
                onClick={() => setModalOpen(false)}
              />
            </div>
            <AlertDialogDescription>
              <form
                onSubmit={handleSubmit(updatedUser)}
                className="flex flex-col gap-6 mt-4"
              >
                <div>
                  <label htmlFor="bio" className="text-md font-bold text-black">
                    Bio
                  </label>
                  <input
                    type="text"
                    {...register("bio")}
                    className="px-4 py-2 border-2 border-slate-200 mt-2 p-2 rounded-md text-black w-full "
                    placeholder="Write.."
                    id="bio"
                    defaultValue={bio || undefined}
                  />
                  {errors.bio?.message && (
                    <p className="text-red-500">{errors.bio?.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="instagram_url"
                    className="text-md font-bold text-black"
                  >
                    Instagram
                  </label>
                  <input
                    type="text"
                    {...register("instagram_url")}
                    className="px-4 py-2 border-2 border-slate-200 mt-2 p-2 rounded-md text-black w-full "
                    placeholder=""
                    id="instagram_url"
                    defaultValue={instagram_url || undefined}
                  />
                  {errors.instagram_url?.message && (
                    <p className="text-red-500">
                      {errors.instagram_url?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="twitter_url"
                    className="text-md font-bold text-black"
                  >
                    Twitter
                  </label>
                  <input
                    type="text"
                    {...register("twitter_url")}
                    className="px-4 py-2 border-2 border-slate-200 mt-2 p-2 rounded-md text-black w-full "
                    placeholder=""
                    id="twitter_url"
                    defaultValue={twitter_url || undefined}
                  />
                  {errors.twitter_url?.message && (
                    <p className="text-red-500">
                      {errors.twitter_url?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="linkedin_url"
                    className="text-md font-bold text-black"
                  >
                    Linkedin
                  </label>
                  <input
                    type="text"
                    {...register("linkedin_url")}
                    className="px-4 py-2 border-2 border-slate-200 mt-2 p-2 rounded-md text-black w-full "
                    placeholder=""
                    id="linkedin_url"
                    defaultValue={linkedin_url || undefined}
                  />
                  {errors.linkedin_url?.message && (
                    <p className="text-red-500">
                      {errors.linkedin_url?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-row-reverse">
                  <Button
                    className="p-2 bg-white w-fit font-bold font-kanit text-black rounded-sm mb-6 border-2 border-b-4 border-r-4 border-black hover:bg-white "
                    disabled={loader}
                  >
                    {loader ? <FaSpinner className="animate-spin" /> : "Save"}
                  </Button>
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

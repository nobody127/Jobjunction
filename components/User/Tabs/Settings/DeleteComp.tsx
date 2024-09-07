"use client";

import { Button } from "@/components/ui/button";
import { isProfileVisitorUser } from "@/store/store";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOut, useSession } from "next-auth/react";
import { DeleteUser } from "@/app/actions/users/updateUserInfo";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

export default function DeleteComp() {
  const session = useSession();
  const { userId }: { userId: string } = useParams();
  const isVisitorUser = useRecoilValue(isProfileVisitorUser);

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isVisitorUser) redirect(`/user/${userId}/profile`);
  }, []);

  if (!session.data?.user || session.data.user === undefined) {
    return <div>Error Found</div>;
  }
  async function handleDeleteAccount() {
    setLoading(true);
    try {
      if (!session.data?.user?.id) throw new Error("No user loggedin");
      const response = await DeleteUser(session.data?.user.id);
      if (response.status !== 201) throw new Error(response.message);
      setModalOpen(false);
      signOut();
    } catch (error) {
      setError(true),
        setTimeout(() => {
          setError(false);
        }, 1500);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {error ? toast("Error Occured") : ""}
      <p className="text-xl text-red-500 font-kanit">Delete Account</p>

      <div className="mt-8">
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <AlertDialog open={modalOpen}>
          <AlertDialogTrigger className="mt-8">
            <Button className="bg-red-600" onClick={() => setModalOpen(true)}>
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[300px] rounded-md md:max-w-[450px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex  gap-2 ">
              <Button onClick={() => handleDeleteAccount()} disabled={loading}>
                {loading ? <FaSpinner className="animate-spin" /> : "Yes"}
              </Button>
              <Button
                onClick={() => setModalOpen(false)}
                className="bg-transparent text-black hover:bg-transparent border-2 border-slate-500"
              >
                No
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

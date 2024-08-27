"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import HorizonatlRule from "@tiptap/extension-horizontal-rule";
import Highlight from "@tiptap/extension-highlight";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import History from "@tiptap/extension-history";
import {
  Highlighter,
  Link2,
  LucideHeading1,
  LucideRuler,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatUnderlined,
} from "react-icons/md";
import { IoCodeSlash } from "react-icons/io5";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MouseEventHandler, useState } from "react";

const limit = 5000;

const Tiptap = ({ className, name, setValue }: any) => {
  const [link, setLink] = useState<string | undefined>();

  function handleLinkInsert(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const link = formData.get("link");
    setLink(link as string);
  }

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "outline-none mt-4",
      },
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      BulletList.configure({
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true,
        HTMLAttributes: {
          class: "list-disc p-2",
        },
      }),
      ListItem,
      Heading.configure({
        levels: [1, 2, 3, 4],
        HTMLAttributes: {
          class: "text-2xl",
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-black text-white",
        },
      }),
      HorizonatlRule.configure({
        HTMLAttributes: {
          class: "border-t-2 border-slate-300",
        },
      }),
      Bold,
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-lime-300",
        },
      }),
      Italic,
      Underline,
      Link.configure({
        defaultProtocol: "https",
        HTMLAttributes: {
          rel: "noopener noreferrer",
          class: "underline-offset-1 text-blue-600",
        },
        validate: (href) => /^https?:\/\//.test(href),
      }),
      Strike,
      CharacterCount.configure({
        limit,
      }),
      History,
    ],
    autofocus: true,
    onUpdate: ({ editor }) => {
      if (editor) {
        const value = editor.getHTML();
        setValue(name, value, { shouldValidate: true });
      }
    },
  });

  if (!editor) return null;

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;
  return (
    <div className={className}>
      <div className="flex gap-8 mt-2 border-b-2 pb-2 border-black overflow-x-scroll no-scrollbar items-center relative sticky top-0 left-0 px-4 z-50 bg-gray-200">
        <div
          onClick={() =>
            editor.commands.toggleHeading({
              level: 2,
            })
          }
        >
          <LucideHeading1 />
        </div>
        <div onClick={() => editor.commands.toggleBulletList()}>
          <MdFormatListBulleted />
        </div>

        <div onClick={() => editor.commands.toggleCodeBlock()}>
          <IoCodeSlash />
        </div>

        <div onClick={() => editor.commands.setHorizontalRule()}>
          <LucideRuler className="size-4" />
        </div>

        <div onClick={() => editor.commands.toggleBold()}>
          <MdFormatBold />
        </div>
        <div onClick={() => editor.commands.toggleItalic()}>
          <MdFormatItalic />
        </div>
        <div onClick={() => editor.commands.toggleUnderline()}>
          <MdFormatUnderlined />
        </div>
        <div onClick={() => editor.commands.toggleHighlight()}>
          <Highlighter className="size-4" />
        </div>

        <div
          onClick={() =>
            editor.commands.toggleLink({
              href: link || "",
            })
          }
        >
          <Dialog>
            <DialogTrigger>
              <Link2 className="size-4" />
            </DialogTrigger>
            <DialogContent className="bg-slate-200">
              <DialogHeader>
                <DialogTitle>Redirecting link</DialogTitle>
                <DialogDescription>
                  <form onSubmit={handleLinkInsert}>
                    <input
                      className="p-2 px-4 outline-2 w-full mt-4 outline-black rounded-md border-2 border-slate-500"
                      placeholder="https://google.com"
                      name="link"
                    />
                    <div className="w-full flex justify-end ">
                      <button
                        type="submit"
                        className="bg-green-600 mt-4 p-2 rounded-md text-white font-bold font-kanit cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div onClick={() => editor.commands.toggleStrike()}>
          <Strikethrough className="size-4" />
        </div>
        <div onClick={() => editor.commands.undo()}>
          <Undo className="size-4" />
        </div>
        <div onClick={() => editor.commands.redo()}>
          <Redo className="size-4" />
        </div>
      </div>

      <EditorContent editor={editor} />

      <div
        className={`character-count mt-8 ${
          editor.storage.characterCount.characters() === limit
            ? "character-count--warning"
            : ""
        }`}
      >
        <svg height="20" width="20" viewBox="0 0 20 20">
          <circle r="10" cx="10" cy="10" fill="#e9ecef" />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="red"
            stroke="red"
            strokeWidth="10"
            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
            transform="rotate(-90) translate(-20)"
          />
          <circle r="6" cx="10" cy="10" fill="white" />
        </svg>
        {editor.storage.characterCount.characters()} / {limit} characters
      </div>
    </div>
  );
};

export default Tiptap;

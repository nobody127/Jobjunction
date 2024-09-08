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
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import History from "@tiptap/extension-history";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

import {
  Highlighter,
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

const limit = 5000;

const Tiptap = ({ className, name, setValue }: any) => {
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
      Strike,
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
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

  function handleColor(e: any) {
    editor?.commands.setColor(e.target.value);
  }
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

        <div onClick={() => editor.commands.toggleStrike()}>
          <Strikethrough className="size-4" />
        </div>

        <div onClick={() => editor.commands.setColor("red")}>
          <input
            type="color"
            className="w-6 h-6  rounded-full border-none outline-none"
            onChange={(e) => handleColor(e)}
          />
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

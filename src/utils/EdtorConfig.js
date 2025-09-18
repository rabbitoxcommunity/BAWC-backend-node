import { useEditor } from "@tiptap/react";
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from "@tiptap/starter-kit";

export const useCustomEditor = (placeholder = 'Type here...') => {
  return useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
        bulletList: {},
        orderedList: {},
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
  });
};

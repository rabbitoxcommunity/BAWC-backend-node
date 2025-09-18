import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Heading1, Heading2, Italic, List, Pilcrow } from 'lucide-react';
import './editor.scss'
export const EditButtons = ({ editor }) => {
    if (!editor) {
        return null;
    }
    return (
        <div className='editor__tools'>
            <div
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'editBtn active' : 'editBtn'}
            >
                <Pilcrow/>
            </div>
            {/* Headings */}
            <div
                onClick={() => {
                    console.log('Toggling H1');
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
                className={editor.isActive('heading', { level: 1 }) ? 'active editBtn' : 'editBtn'}
            >
                <Heading1/>
            </div>
            <div
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'active editBtn' : 'editBtn'}
            >
                <Heading2/>
            </div>
            {/* Lists */}
            <div
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'active editBtn' : 'editBtn'}
            >
               <List/>
            </div>
            {/* Formatting */}
            <div
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'active editBtn' : 'editBtn'}
            >
                <Bold/>
            </div>
            <div
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'active editBtn' : 'editBtn'}
            >
                <Italic/>
            </div>
            {/* Text Direction */}
            {/* <button
                onClick={() => editor.chain().focus().setTextDirection('rtl').run()}
                className={editor.isActive({ dir: 'rtl' }) ? 'active' : ''}
            >
                RTL
            </button>
            <button
                onClick={() => editor.chain().focus().setTextDirection('ltr').run()}
                className={editor.isActive({ dir: 'ltr' }) ? 'active' : ''}
            >
                LTR
            </button> */}
            {/* Text Alignment */}
            <div
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={editor.isActive({ textAlign: 'left' }) ? 'active editBtn' : 'editBtn'}
            >
                <AlignLeft/>
            </div>
            <div
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={editor.isActive({ textAlign: 'center' }) ? 'active editBtn' : 'editBtn'}
            >
                <AlignCenter/>
            </div>
            <div
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={editor.isActive({ textAlign: 'right' }) ? 'active editBtn' : 'editBtn'}
            >
                <AlignRight/>
            </div>
            <div
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={editor.isActive({ textAlign: 'justify' }) ? 'active editBtn' : 'editBtn'}
            >
                <AlignJustify/>
            </div>
        </div>
    );
};

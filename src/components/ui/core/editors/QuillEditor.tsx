/* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-unused-vars */


// import React, { useEffect, useRef, useState } from "react";
// import Quill from "quill";

// // Declare Quill types
// declare global {
//   interface Window {
//     Quill?: typeof Quill;
//   }
// }

// interface QuillInstance {
//   root: HTMLElement & { innerHTML: string };
//   clipboard: {
//     dangerouslyPasteHTML: (html: string) => void;
//   };
//   getText: () => string;
//   on: (event: string, handler: () => void) => void;
//   getSelection: () => { index: number; length: number } | null;
//   setSelection: (selection: { index: number; length: number }) => void;
// }

// interface QuillConstructor {
//   new (element: HTMLElement, options: QuillOptions): QuillInstance;
// }

// interface QuillModule {
//   toolbar?: any;
//   [key: string]: any;
// }

// interface QuillOptions {
//   theme?: string;
//   modules?: QuillModule;
//   formats?: string[];
//   placeholder?: string;
//   readOnly?: boolean;
// }

// interface QuillEditorProps {
//   value?: string;
//   onChange?: (value: string) => void;
//   placeholder?: string;
//   height?: string;
//   readOnly?: boolean;
//   theme?: "snow" | "bubble" | string;
//   modules?: QuillModule;
//   formats?: string[];
// }

// const QuillEditor: React.FC<QuillEditorProps> = ({
//   value = "",
//   onChange,
//   placeholder = "Write something...",
//   height = "300px",
//   readOnly = false,
//   theme = "snow",
//   modules: customModules,
//   formats: customFormats,
// }) => {
//   const editorRef = useRef<HTMLDivElement | null>(null);
//   const quillRef = useRef<QuillInstance | null>(null);

//   const [isLoaded, setIsLoaded] = useState(false);
//   const [loadError, setLoadError] = useState(false);

//   // Default modules
//   const defaultModules: QuillModule = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       [{ font: [] }],
//       [{ size: ["small", false, "large", "huge"] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }],
//       [{ script: "sub" }, { script: "super" }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       [{ direction: "rtl" }],
//       [{ align: [] }],
//       ["blockquote", "code-block"],
//       ["link", "image", "video"],
//       ["clean"],
//     ],
//   };

//   const defaultFormats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "color",
//     "background",
//     "script",
//     "list",
//     "bullet",
//     "indent",
//     "direction",
//     "align",
//     "blockquote",
//     "code-block",
//     "link",
//     "image",
//     "video",
//   ];

//   const modules = customModules || defaultModules;
//   const formats = customFormats || defaultFormats;

//   // Load Quill
//   useEffect(() => {
//     let mounted = true;

//     const loadQuill = () => {
//       if (window.Quill) {
//         if (mounted) setIsLoaded(true);
//         return;
//       }

//       if (!document.querySelector('link[href*="quill.snow.css"]')) {
//         const link = document.createElement("link");
//         link.rel = "stylesheet";
//         link.href =
//           "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css";
//         document.head.appendChild(link);
//       }

//       if (!document.querySelector("script[src*='quill']")) {
//         const script = document.createElement("script");
//         script.src = "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js";
//         script.async = true;

//         script.onload = () => {
//           if (mounted) setIsLoaded(true);
//         };

//         script.onerror = () => {
//           if (mounted) setLoadError(true);
//         };

//         document.body.appendChild(script);
//       }
//     };

//     loadQuill();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // Initialize Quill
//   useEffect(() => {
//     if (!isLoaded || !editorRef.current || quillRef.current) return;

//     try {
//       const Quill = window.Quill as unknown as QuillConstructor;

//       const quill = new Quill(editorRef.current, {
//         theme,
//         modules,
//         formats,
//         placeholder,
//         readOnly,
//       });

//       if (value) {
//         quill.clipboard.dangerouslyPasteHTML(value);
//       }

//       quill.on("text-change", () => {
//         const html = quill.root.innerHTML;
//         const isEmpty = quill.getText().trim().length === 0;
//         onChange?.(isEmpty ? "" : html);
//       });

//       quillRef.current = quill;
//     } catch (err) {
//       setLoadError(true);
//     }

//     return () => {
//       quillRef.current = null;
//     };
//   }, [isLoaded, placeholder, readOnly, theme, modules, formats, value, onChange]);

//   // External value update
//   useEffect(() => {
//     if (quillRef.current && value !== quillRef.current.root.innerHTML) {
//       const quill = quillRef.current;
//       const selection = quill.getSelection();
//       quill.clipboard.dangerouslyPasteHTML(value || "");
//       if (selection) quill.setSelection(selection);
//     }
//   }, [value]);

//   if (loadError) {
//     return (
//       <div
//         style={{
//           height,
//           border: "1px solid #f44336",
//           background: "#ffebee",
//           borderRadius: 4,
//           padding: 20,
//         }}
//       >
//         Failed to load editor
//       </div>
//     );
//   }

//   if (!isLoaded) {
//     return (
//       <div
//         style={{
//           height,
//           border: "1px solid #ccc",
//           background: "#f9f9f9",
//           borderRadius: 4,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         Loading editor...
//       </div>
//     );
//   }

//   return (
//     <div style={{ height }}>
//       <div ref={editorRef} style={{ height: "100%" }} />
//     </div>
//   );
// };

// export default QuillEditor;

import React, { forwardRef, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { Undo2, Redo2 } from "lucide-react"; // Using lucide-react for icons
import { Button } from "antd";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const QuillEditor = forwardRef<ReactQuill, QuillEditorProps>(
  ({ value, onChange, placeholder, className }, ref) => {
    const quillRef = useRef<ReactQuill>(null);

    const modules = {
      toolbar: [
        [{ font: [] }, { size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link"],
        // ["blockquote", "clean"],
        // [{ direction: "rtl" }],
      ],
      clipboard: {
        matchVisual: false,
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    };

    const formats = [
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "script",
      "header",
      "align",
      "list",
      "indent",
      "link",
      // "code-block",
      // "blockquote",
      // "direction",
    ];

    const handleUndo = () => {
      const editor = quillRef.current?.getEditor();
      if (editor) {
        const history = editor.getModule("history") as {
          undo: () => void;
          redo: () => void;
        };
        history.undo();
      }
    };

    const handleRedo = () => {
      const editor = quillRef.current?.getEditor();
      if (editor) {
        const history = editor.getModule("history") as {
          undo: () => void;
          redo: () => void;
        };
        history.redo();
      }
    };

    return (
      <div className="rounded-quill-container">
        <div className="flex justify-end gap-2 mb-2">
          <Button onClick={handleUndo} className="h-8">
            <Undo2 className="h-4 w-4 mr-1" />
            Undo
          </Button>
          <Button onClick={handleRedo} className="h-8">
            <Redo2 className="h-4 w-4 mr-1" />
            Redo
          </Button>
        </div>
        <ReactQuill
          ref={(node) => {
            if (node) {
              quillRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }
          }}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{ marginBottom: "40px" }}
          className={`[&_.ql-toolbar]:rounded-t-xl [&_.ql-container]:rounded-b-xl ${className} sm:h-[500px] h-[350px]`}
        />
      </div>
    );
  }
);

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;
"use client";

import {
    RichTextEditor,
    Link,
    useRichTextEditorContext,
} from "@mantine/tiptap";
import { useEditor, BubbleMenu, FloatingMenu } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Collor from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Document from "@tiptap/extension-document";
import SubScript from "@tiptap/extension-subscript";
import Image from "@tiptap/extension-image";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { useCallback } from "react";
import { Image as ImageLucide } from "lucide-react";
import { YoutubeIcon } from "./icons/Icons";

const content =
    '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

function InsertStarControl() {
    const { editor } = useRichTextEditorContext();

    const addImage = useCallback(() => {
        const url = window.prompt("URL");

        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <RichTextEditor.Control
            onClick={addImage}
            aria-label="Inserir Imagem"
            title="Inserir Imagem"
        >
            <ImageLucide stroke="currentColor" size="1rem" strokeWidth={1} />
        </RichTextEditor.Control>
    );
}

function YoutubeEmbbed() {
    const { editor } = useRichTextEditorContext();

    const addImage = useCallback(() => {
        const url = window.prompt("Enter YouTube URL");

        if (url && editor) {
            editor.commands.setYoutubeVideo({
                width: 700,
                height: 393,
                src: url,
            });
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <RichTextEditor.Control
            onClick={addImage}
            aria-label="Insert youtube video"
            title="Insert youtube video"
        >
            <YoutubeIcon size={14} />
        </RichTextEditor.Control>
    );
}

interface RichTextProps {
    onUpdate: (value: string) => void;
}

export function RichText({ onUpdate }: RichTextProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Document,
            Underline,
            Placeholder.configure({
                placeholder: "Crie o conteúdo de sua página",
            }),
            TextStyle,
            Collor,
            Image,
            Youtube.configure({
                inline: true,
            }),
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content: "",
        onUpdate({ editor }) {
            const html = editor.getHTML();
            onUpdate(html);
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <MantineProvider>
            <RichTextEditor
                editor={editor}
                style={{
                    minHeight: 200,
                }}
                onChange={(value) => console.log(`valor do editor`, value)}
            >
                {editor && (
                    <FloatingMenu editor={editor}>
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.H1 />
                            <RichTextEditor.H2 />
                            <RichTextEditor.BulletList />
                        </RichTextEditor.ControlsGroup>
                    </FloatingMenu>
                )}
                {editor && (
                    <BubbleMenu editor={editor}>
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold />
                            <RichTextEditor.Italic />
                            <RichTextEditor.Link />
                            <RichTextEditor.ColorPicker
                                colors={[
                                    "#FFFFFF",
                                    "#000000",
                                    "yellow",
                                    "orange",
                                    "purple",
                                    "blue",
                                    "gray",
                                    "pink",
                                    "red",
                                    "slate",
                                ]}
                            />
                        </RichTextEditor.ControlsGroup>
                    </BubbleMenu>
                )}
                <RichTextEditor.Toolbar stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <InsertStarControl />
                        <YoutubeEmbbed />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.ColorPicker
                            colors={[
                                "#FFFFFF",
                                "#000000",
                                "yellow",
                                "orange",
                                "purple",
                                "blue",
                                "gray",
                                "pink",
                                "red",
                                "slate",
                            ]}
                        />
                        <RichTextEditor.Color color="purple" />
                        <RichTextEditor.UnsetColor />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>
        </MantineProvider>
    );
}

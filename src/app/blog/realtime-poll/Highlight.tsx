"use client";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import Prismjs from "prismjs";
import { Highlight, themes } from "prism-react-renderer";
import { ClipboardPasteIcon, CopyIcon } from "lucide-react";

export default function Code({
  fileName,
  children,
}: {
  fileName?: string;
  children: string;
}) {
  return (
    <Highlight prism={Prismjs} code={children} language="js">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="border-2 border-neutral-700 rounded overflow-clip  copy-to-clipboard flex flex-col relative">
          <div className={`${fileName && "flex p-2"} `}>
            {fileName && (
              <p className="p-1  rounded border-neutral-600 ">{fileName}</p>
            )}
            <button
              //   className="ml-auto"
              className={`${fileName ? "ml-auto" : "absolute top-2 right-2"}`}
              onClick={() => {
                const content = tokens.reduce(
                  (acc, curr) =>
                    (acc += curr.reduce(
                      (acc2, curr2) => (acc2 += curr2.content),
                      ""
                    )) + "\n",
                  ""
                );
                navigator.clipboard.writeText(content);
              }}
            >
              <CopyIcon size={14} />
            </button>
          </div>
          <pre style={style} className="p-2">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  );
}

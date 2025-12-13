import React, { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { BotIcon, EyeIcon, SendIcon, UserIcon } from "lucide-react";
import { Message, SiderbarProps, Version } from "@/types";
import { timeStamp } from "console";
import { Button } from "../ui/button";
import Link from "next/link";
import { Spinner } from "../ui/spinner";

const Sidebar = ({
  isMenuOpen,
  project,
  setProject,
  isGenerating,
  setIsGenerating,
}: SiderbarProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  const handleRoleBack = async (versionId: string) => {};

  React.useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [project.conversation.length, isGenerating]);

  return (
    <>
      <div className="flex items-end w-120 h-[85vh] bg-slate-900">
        <div className="w-full h-full">
          {/* message container */}
          <div className="flex flex-col h-full overflow-auto custom-scrollbar px-3 gap-4">
            {[...project.conversation, ...project.versions]
              .sort(
                (a, b) =>
                  new Date(a.timestamp).getTime() -
                  new Date(b.timestamp).getTime()
              )
              .map((message) => {
                const isMessage = "content" in message;
                if (isMessage) {
                  const msg = message as Message;
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-3 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isUser && (
                        <div>
                          <BotIcon />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-2 py-1.5 rounded-md ${
                          isUser ? "bg-indigo-600" : "bg-gray-700"
                        }`}
                      >
                        {msg.content}
                      </div>
                      {isUser && (
                        <div>
                          <UserIcon />
                        </div>
                      )}
                    </div>
                  );
                } else {
                  const ver = message as Version;
                  return (
                    <div key={ver.id} className="">
                      <div>
                        code updated <br />
                        <span>{new Date(ver.timestamp).toLocaleString()}</span>
                      </div>
                      <div>
                        {project.current_version_index === ver.id ? (
                          <Button>Current Version</Button>
                        ) : (
                          <Button onClick={() => handleRoleBack(ver.id)}>
                            Roll back to this version
                          </Button>
                        )}
                        <Link
                          href={`/preview/${project.id}/${ver.id}`}
                          target="blank"
                        >
                          <EyeIcon className="size-6" />
                        </Link>
                      </div>
                    </div>
                  );
                }
              })}
            {isGenerating && (
              <div>
                <div>
                  <BotIcon />
                </div>
                <div className="flex gap-1.5 h-full items-end">
                  <span
                    className="size-2 rounded-full animate-bounce bg-gray-600"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="size-2 rounded-full animate-bounce bg-gray-600"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="size-2 rounded-full animate-bounce bg-gray-600"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            )}
            <div ref={messageRef} />
          </div>

          {/* textarea , sendbtn */}
          <div className="border-white border w-full flex items-center gap-1.5">
            <Textarea
              placeholder="Type your message here."
              className="resize-none w-full"
            />
            <div className="border p-4 rounded-lg">
              <SendIcon className="size-8" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

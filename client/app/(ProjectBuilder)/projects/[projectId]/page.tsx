"use client";

import {
  dummyConversations,
  dummyProjects,
  dummyVersion,
} from "@/assets/assets";
import { Project } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import favicon from "@/app/favicon.ico";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowBigLeft,
  Laptop,
  SendIcon,
  Smartphone,
  Tablet,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from "@/components/mycompo/Sidebar";
import ProjectPreview, {
  ProjectPreviewRef,
} from "@/components/mycompo/ProjectPreview";

const ProjectBuilderPage = () => {
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = React.useState<Project | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(true);
  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">(
    "desktop"
  );
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const previewRef = useRef<ProjectPreviewRef>(null);

  React.useEffect(() => {
    const fetchProject = () => {
      const foundProject = dummyProjects.find(
        (project) => project.id === projectId
      );
      if (foundProject) {
        setProject({
          ...foundProject,
          conversation: dummyConversations,
          versions: dummyVersion,
        });
        setIsGenerating(!foundProject.current_code);
      } else {
        setProject(null);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) {
    return <p>Unable to load project!</p>;
  }

  if (isGenerating) {
    return <p>Generating project...</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center py-2.5 px-6 bg-[#141414]">
        <div className="flex items-center">
          <div className="">
            <Image src={favicon} alt="logo" width={40} height={40} />
          </div>
          <h5>{project.name}</h5>
        </div>
        <div className="flex items-center">
          {/* mobile  laptop computer */}
          <div className="flex gap-1">
            <div
              onClick={() => setDevice("phone")}
              className="p-2 rounded-md hover:bg-muted  cursor-pointer"
            >
              <Smartphone className="size-8 text-muted-foreground hover:text-white" />
            </div>
            <div
              onClick={() => setDevice("tablet")}
              className="p-2 rounded-md hover:bg-muted  cursor-pointer"
            >
              <Tablet className="size-8 text-muted-foreground hover:text-white" />
            </div>
            <div
              onClick={() => setDevice("desktop")}
              className="p-2 rounded-md hover:bg-muted  cursor-pointer"
            >
              <Laptop className="size-8 text-muted-foreground hover:text-white" />
            </div>
          </div>

          {/* button */}
          <div className="flex gap-1">
            <Link href="">
              <Button variant="outline">Save</Button>
            </Link>
            <Link href="">
              <Button variant="outline">Preview</Button>
            </Link>
            <Link href="">
              <Button variant="outline">Download</Button>
            </Link>
            <Link href="">
              <Button variant="outline">Unpublish</Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="flex h-[calc(100vh-67px)]">
        {/* sidebar */}
        <div className="">
          <Sidebar
            isMenuOpen={isMenuOpen}
            project={project}
            setProject={(p) => {
              setProject(p);
            }}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        </div>

        {/* preview - area */}
        <div className="w-full h-full ">
          <ProjectPreview
            ref={previewRef}
            project={project}
            isGenerating={isGenerating}
            device={device}
            isMenuOpen={false}
          />
        </div>
      </main>
    </>
  );
};

export default ProjectBuilderPage;

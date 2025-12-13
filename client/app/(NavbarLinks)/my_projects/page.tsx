"use client";
import { dummyProjects } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Project } from "@/types";
import { FolderOpen, Monitor, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const My_ProjectPage = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    setProjects(dummyProjects);
    setLoading(false);
  };

  const deleteProject = async (projectId: String) => {};

  React.useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <div className=" px-10">
        {loading ? (
          <div>
            <Spinner className="size-8" />
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <h2>My Projects</h2>
              <div>
                <Link href="/">
                  <Button variant={"indigo"}>
                    <PlusIcon /> New Branch
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-3.5">
              {projects.map((project) => (
                <div
                  onClick={() => {
                    `/projects/${project.id}`;
                  }}
                  key={project.id}
                  className="border rounded-lg relative w-125 "
                >
                  <div className="relative w-full h-40 bg-gray-900 rounded-t-lg overflow-hidden border-b border-gray-800">
                    {project.current_code ? (
                      <iframe
                        srcDoc={project.current_code}
                        className="absolute top-0 left-0 w-[2000px] h-[800px]  origin-top-left pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.25)" }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <p>No Preview</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between py-2">
                      <h4>{project.name}</h4>
                      <Button variant={"indigo"}>Website</Button>
                    </div>
                    <p>{project.initial_prompt}</p>
                    <div onClick={(e) => e.stopPropagation()}>
                      <span>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <div>
                        <Link href={`/preview/${project.id}`}>
                          <Button variant={"outline"}>
                            <Monitor /> Preview
                          </Button>
                        </Link>
                        <Link href={`/projects/${project.id}`}>
                          <Button variant={"outline"}>
                            <FolderOpen /> Open
                          </Button>
                        </Link>
                        <Button
                          onClick={() => {
                            `deleteProject(${project.id})`;
                          }}
                          variant={"red"}
                        >
                          <TrashIcon /> Delete
                        </Button>
                        <Link href={`/`}>
                          <Button variant={"outline"}>
                            <FolderOpen /> home
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div>Not have any project yet !</div>
            <div>
              <Link href="/">
                <Button variant={"indigo"} size="sm">
                  <PlusIcon /> New Branch
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default My_ProjectPage;

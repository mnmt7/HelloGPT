"use client";
import React from "react";
import Image from "next/image";
import { pressStart2P, sourceCodePro, instrumentSans } from "./styles/fonts";

export default function Home() {
  return (
    <div className="w-11/12 m-auto flex-col my-6">
      <div className="rounded-3xl px-12 py-4 shadow-2xl">
        <ul className="grid grid-cols-3 gap-4 uppercase place-items-center">
          <li className="flex flex-col border-solid">
            <a href="/pdf">
              <div className="rounded-xl overflow-hidden h-[300px] w-[300px] drop-shadow">
                <div className="absolute inset-0">
                  <Image
                    src="/assets/images/pdf.png"
                    alt="robot reading newspaper"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    className="transform transition-transform hover:scale-105"
                  />
                </div>
              </div>
              <p
                className={`text-2xl font-bold text-black ${sourceCodePro.className}`}
              >
                PDF-GPT
              </p>
            </a>
          </li>
          <li className="flex flex-col gap-4">
            <a href="/memory">
              <div className="rounded-xl overflow-hidden h-[300px] w-[300px] drop-shadow">
                <div className="absolute inset-0">
                  <Image
                    src="/assets/images/brain.png"
                    alt="robot reading newspaper"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    className="transform transition-transform hover:scale-105"
                  />
                </div>
              </div>
              <p
                className={`text-2xl font-bold text-black ${sourceCodePro.className}`}
              >
                Memory
              </p>
            </a>
          </li>
          <li className="flex flex-col gap-4">
            <a href="streaming">
              <div className="rounded-xl overflow-hidden h-[300px] w-[300px] drop-shadow">
                <div className="absolute inset-0">
                  <Image
                    src="/assets/images/stream.png"
                    alt="robot reading newspaper"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    className="transform transition-transform hover:scale-105"
                  />
                </div>
              </div>
              <p
                className={`text-2xl font-bold text-black ${sourceCodePro.className}`}
              >
                Streaming
              </p>
            </a>
          </li>
          <li className="flex flex-col gap-4">
            <a href="video-chat">
              <div className="rounded-xl overflow-hidden h-[300px] w-[300px] drop-shadow">
                <div className="absolute inset-0">
                  <Image
                    src="/assets/images/youtube.png"
                    alt="robot reading newspaper"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    className="transform transition-transform hover:scale-105"
                  />
                </div>
              </div>
              <p
                className={`text-2xl font-bold text-black ${sourceCodePro.className}`}
              >
                YT Vid Chat
              </p>
            </a>
          </li>
          <li className="flex flex-col gap-4">
            <a href="content-generator">
              <div className="rounded-xl overflow-hidden h-[300px] w-[300px] drop-shadow">
                <div className="absolute inset-0">
                  <Image
                    src="/assets/images/wizard.png"
                    alt="robot reading newspaper"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    className="transform transition-transform hover:scale-105"
                  />
                </div>
              </div>
              <p
                className={`text-2xl font-bold text-black ${sourceCodePro.className}`}
              >
                Content Wiz
              </p>
            </a>
          </li>
          <li className="flex flex-col gap-4">
            <a href="resume-reader">
              <div className="rounded-xl overflow-hidden h-[300px] w-[300px] drop-shadow">
                <div className="absolute inset-0">
                  <Image
                    src="/assets/images/robohr.png"
                    alt="robot reading newspaper"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    className="transform transition-transform hover:scale-105"
                  />
                </div>
              </div>
              <p
                className={`text-2xl font-bold text-black ${sourceCodePro.className}`}
              >
                RoboHR
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Image from "next/image";
import { pressStart2P, sourceCodePro, instrumentSans } from "./styles/fonts";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-11/12 m-auto my-6">
      <div className="rounded-3xl px-8 py-4 shadow-2xl">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 uppercase place-content-center">
          <li>
            <Link href="/pdf">
              <div className="rounded-xl overflow-hidden drop-shadow h-72 max-w-xs mx-auto">
                <Image
                  src="/assets/images/pdf.png"
                  alt="robot reading newspaper"
                  fill
                  style={{ objectFit: "cover" }}
                  className="transform transition-transform hover:scale-105"
                />
              </div>
              <p
                className={`text-2xl text-center font-bold text-black ${sourceCodePro.className}`}
              >
                PDF-GPT
              </p>
            </Link>
          </li>
          <li>
            <Link href="video-chat">
              <div className="rounded-xl overflow-hidden drop-shadow h-72 max-w-xs mx-auto">
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
                className={`text-2xl text-center font-bold text-black ${sourceCodePro.className}`}
              >
                YT Vid Chat
              </p>
            </Link>
          </li>
          <li>
            <Link href="resume-reader">
              <div className="rounded-xl overflow-hidden drop-shadow h-72 max-w-xs mx-auto">
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
                className={`text-2xl text-center font-bold text-black ${sourceCodePro.className}`}
              >
                RoboHR
              </p>
            </Link>
          </li>
          <li>
            <Link href="content-generator">
              <div className="rounded-xl overflow-hidden drop-shadow h-72 max-w-xs mx-auto">
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
                className={`text-2xl text-center font-bold text-black ${sourceCodePro.className}`}
              >
                Content Wiz
              </p>
            </Link>
          </li>
          <li>
            <Link href="/memory">
              <div className="rounded-xl overflow-hidden drop-shadow h-72 max-w-xs mx-auto">
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
                className={`text-2xl text-center font-bold text-black ${sourceCodePro.className}`}
              >
                Memory
              </p>
            </Link>
          </li>
          <li className="hidden">
            <Link href="streaming">
              <div className="rounded-xl overflow-hidden drop-shadow h-72 max-w-xs mx-auto">
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
                className={`text-2xl text-center font-bold text-black ${sourceCodePro.className}`}
              >
                Streaming
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

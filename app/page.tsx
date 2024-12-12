"use client"
import { useState, useEffect } from "react";
import { DiscordSDK } from "@discord/embedded-app-sdk";

export default function Home() {
  const [ready, setReady] = useState<string>("Not ready");
  const [discordSdk, setDiscordSdk] = useState<DiscordSDK | null>(null);

  useEffect(() => {
    async function initDiscordSdk() {
      try {
        // Initialize Discord SDK with error handling
        const sdk = new DiscordSDK(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);
        await sdk.ready();
        setDiscordSdk(sdk);
        setReady("Ready");
        console.log("Discord SDK is ready");
      } catch (error) {
        console.error("Failed to initialize Discord SDK:", error);
        setReady("Failed to initialize");
      }
    }

   
      initDiscordSdk();
    
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Discord SDK Integration</h1>
        <p className="mt-4">Status: {ready}</p>
        {discordSdk && (
          <div className="mt-6 p-4 bg-gray-900 rounded">
            <p>Discord SDK successfully initialized</p>
          </div>
        )}
      </div>
    </div>
  );
}
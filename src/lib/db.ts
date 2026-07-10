import mongoose from "mongoose";
import dns from "dns";
//
const MONGODB_URI = process.env.MONGODB_URI;
const GOOGLE_DNS_SERVERS = ["8.8.8.8", "8.8.4.4"];
const LOCAL_DNS_PREFIXES = ["127.0.0.1", "::1"];

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

function isLocalDnsServer(server: string) {
  return LOCAL_DNS_PREFIXES.some(
    (local) => server === local || server.startsWith(`${local}:`),
  );
}

function shouldUseFallbackDns() {
  return dns.getServers().some(isLocalDnsServer);
}

function setFallbackDns() {
  dns.setServers(GOOGLE_DNS_SERVERS);
  console.warn(
    "Node is using local DNS. Switched to Google DNS servers:",
    GOOGLE_DNS_SERVERS.join(", "),
  );
}



type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

let cached: MongooseCache = globalWithMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

globalWithMongoose.mongoose = cached;

async function connectWithFallback(uri: string) {
  if (shouldUseFallbackDns()) {
    setFallbackDns();
  }

  try {
    return await mongoose.connect(uri, {
      autoIndex: true,
    });
  } catch (error) {
    const anyError = error as any;

    if (anyError?.code === "ECONNREFUSED" && anyError?.syscall === "querySrv") {
      console.warn(
        "MongoDB SRV query failed with ECONNREFUSED. Retrying after fallback DNS.",
      );
      setFallbackDns();
      return mongoose.connect(uri, {
        autoIndex: true,
      });
    }

    throw error;
  }
}

export default async function db() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connectWithFallback(MONGODB_URI).catch((error) => {
      cached.promise = null;
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

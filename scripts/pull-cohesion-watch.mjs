#!/usr/bin/env node
/**
 * Reads the local Grok Bot cache for Swarajya Scout's latest
 * "**Cohesion watch**" block and prints it. Does not write site files.
 *
 * Usage: node scripts/pull-cohesion-watch.mjs
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = path.join(
  os.homedir(),
  "Library/Application Support/Grok Bot/sand-client-persistence",
);
const SCOUT_ID = "5433eebf-e40c-4d6d-a202-23c92195cbf8";

function walk(node, acc = []) {
  if (Array.isArray(node)) {
    for (const item of node) walk(item, acc);
    return acc;
  }
  if (!node || typeof node !== "object") return acc;
  if (node.kind === "send-message") {
    const content = node.message?.content;
    if (typeof content === "string") {
      acc.push({
        id: node.id,
        content,
        ts: Number(node.timestampMs ?? node.updatedAt ?? 0),
      });
    }
  }
  if (node.lastEntry?.text) {
    acc.push({
      id: "lastEntry",
      content: node.lastEntry.text,
      ts: Number(node.updatedAt ?? 0),
    });
  }
  for (const value of Object.values(node)) walk(value, acc);
  return acc;
}

function extractWatch(text) {
  const marker = "**Cohesion watch**";
  const start = text.indexOf(marker);
  if (start < 0) return null;
  let body = text.slice(start + marker.length).trim();
  const nextHead = body.search(/\n\*\*[A-Z]/);
  if (nextHead > 0) body = body.slice(0, nextHead).trim();
  return body;
}

if (!fs.existsSync(DIR)) {
  console.error("Grok Bot cache not found at", DIR);
  process.exit(1);
}

let best = null;
for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith(".blob")) continue;
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  if (!raw.includes(SCOUT_ID) && !raw.includes("Cohesion watch")) continue;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    continue;
  }
  for (const msg of walk(parsed)) {
    const watch = extractWatch(msg.content);
    if (!watch) continue;
    const ts = Number(msg.ts ?? 0);
    if (!best || ts > best.ts || (ts === best.ts && watch.length > best.watch.length)) {
      best = { watch, id: msg.id, ts };
    }
  }
}

if (!best) {
  console.error("No cohesion watch found in Grok Bot cache.");
  process.exit(2);
}

process.stdout.write(best.watch + "\n");
